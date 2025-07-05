import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {Controller, useForm} from 'react-hook-form';
import styles from './ForgotPassword.styles';
import Button from '../../../components/ui/Button/ButtonComponent';
import Input from '../../../components/ui/Input/InputComponents';
import {
  forgotPassword,
  stopUpdatePassword,
} from '../../../api/forgotPasswordApi';
import {VALIDATION_RULES} from '../../../validations/authValidations';
import {verifyOtp} from '../../../api/verifyOtpApi';

const {width, height} = Dimensions.get('window');

const ForgotPasswordScreen = ({navigation}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [blockTime, setBlockTime] = useState(0);
  const [userId, setUserId] = useState(null);
  const [contactType, setContactType] = useState(null);

  const otpInputs = useRef([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm({
    defaultValues: {contact: ''},
  });

  const contactValue = watch('contact');

  // Animation khi load màn hình
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  // Quản lý timer gửi lại OTP
  useEffect(() => {
    let interval;
    if (showOtpModal && timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [showOtpModal, timer, canResend]);

  // Quản lý thời gian bị khóa
  useEffect(() => {
    let timerId;
    if (blockTime > 0) {
      timerId = setInterval(() => {
        setBlockTime(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [blockTime]);

  // Gửi yêu cầu OTP
  const onSendOTP = async ({contact}) => {
    const trimmed = contact.trim();
    if (blockTime > 0) {
      showMessage({
        message: 'Thông báo',
        description: `Vui lòng chờ ${blockTime}s trước khi thử lại.`,
        type: 'warning',
        floating: true,
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    try {
      const isEmail = VALIDATION_RULES.EMAIL_REGEX.test(trimmed);
      const payload = {
        phone:
          !isEmail && VALIDATION_RULES.PHONE_REGEX.test(trimmed)
            ? trimmed
            : undefined,
        email: isEmail ? trimmed : undefined,
      };
      const response = await forgotPassword(payload);

      if (response.success) {
        setShowOtpModal(true);
        setTimer(60);
        setCanResend(false);
        setResendCount(0);
        setUserId(response.data?.userId || null); // Lưu userId từ phản hồi
        setContactType(isEmail ? 'email' : 'phone');
        showMessage({
          message: 'Thành công',
          description: `Mã OTP đã được gửi đến ${
            isEmail ? 'email' : 'số điện thoại'
          }`,
          type: 'success',
          floating: true,
          duration: 3000,
        });
      } else {
        showMessage({
          message: 'Lỗi',
          description: response.message || 'Không thể gửi mã xác thực.',
          type: 'danger',
          floating: true,
          duration: 3000,
        });
      }
    } catch (error) {
      showMessage({
        message: 'Lỗi',
        description:
          error.message || 'Không thể gửi mã xác thực. Vui lòng thử lại.',
        type: 'danger',
        floating: true,
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý thay đổi OTP
  const handleOTPChange = (value, index) => {
    if (value.length > 1 || isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  // Xử lý phím Backspace trong OTP
  const handleOTPKeyPress = (key, index) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  // Xác thực OTP
  const handleVerifyOTP = async () => {
    const otpCode = otp.join('');
    const trimmed = contactValue.trim();

    if (otpCode.length !== 6 || isNaN(otpCode)) {
      showMessage({
        message: 'Mã OTP không hợp lệ',
        description: 'Vui lòng nhập chính xác 6 chữ số để xác thực.',
        type: 'danger',
        duration: 3000,
        floating: true,
      });
      return;
    }

    if (!userId) {
      showMessage({
        message: 'Lỗi xác thực',
        description: 'Không tìm thấy thông tin người dùng.',
        type: 'danger',
        duration: 3000,
        floating: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        otp: otpCode,
        userId,
        type: 'forgot-password',
      };
      const response = await verifyOtp(payload);

      if (response.success) {
        showMessage({
          message: 'Xác thực thành công',
          description: 'Hệ thống sẽ chuyển bạn đến trang đặt lại mật khẩu.',
          type: 'success',
          duration: 3000,
          floating: true,
        });
        setShowOtpModal(false);
        navigation.navigate('NoBottomTab', {
          screen: 'ResetPassword',
          params: {userId, contact: trimmed},
        });
      } else {
        showMessage({
          message: 'Mã OTP không chính xác',
          description:
            response.message || 'Vui lòng kiểm tra lại mã và thử lại.',
          type: 'danger',
          duration: 3000,
          floating: true,
        });
        setOtp(['', '', '', '', '', '']);
        otpInputs.current[0]?.focus();
      }
    } catch (error) {
      showMessage({
        message: 'Lỗi xác thực',
        description: error.message || 'Đã xảy ra lỗi. Vui lòng thử lại.',
        type: 'danger',
        duration: 3000,
        floating: true,
      });
      setOtp(['', '', '', '', '', '']);
      otpInputs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  // Gửi lại OTP
  const handleResendOTP = async () => {
    const trimmed = contactValue.trim();
    if (resendCount >= 3) {
      setBlockTime(15);
      setCanResend(false);
      setTimer(15); // Đặt lại timer khi bị khóa
      showMessage({
        message: 'Thông báo',
        description: 'Bạn đã gửi lại mã quá nhiều lần. Vui lòng chờ 15 giây.',
        type: 'warning',
        duration: 3000,
        floating: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const isEmail = VALIDATION_RULES.EMAIL_REGEX.test(trimmed);
      const payload = {
        phone:
          !isEmail && VALIDATION_RULES.PHONE_REGEX.test(trimmed)
            ? trimmed
            : undefined,
        email: isEmail ? trimmed : undefined,
      };
      const response = await forgotPassword(payload);

      if (response.success) {
        setOtp(['', '', '', '', '', '']);
        setTimer(60);
        setCanResend(false);
        setResendCount(prev => prev + 1);
        setUserId(response.data?.userId || userId); // Cập nhật userId nếu có
        showMessage({
          message: 'Thành công',
          description: `Mã OTP mới đã được gửi đến ${
            isEmail ? 'email' : 'số điện thoại'
          }`,
          type: 'success',
          duration: 3000,
          floating: true,
        });
      } else {
        showMessage({
          message: 'Lỗi',
          description: response.message || 'Không thể gửi lại mã.',
          type: 'danger',
          duration: 3000,
          floating: true,
        });
      }
    } catch (error) {
      showMessage({
        message: 'Lỗi',
        description: error.message || 'Không thể gửi lại mã. Vui lòng thử lại.',
        type: 'danger',
        duration: 3000,
        floating: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Hủy quá trình xác thực
  const handleCancel = async () => {
    if (userId && contactType) {
      try {
        const response = await stopUpdatePassword({
          userId,
          type: contactType,
        });
        if (response.success) {
          showMessage({
            message: 'Hủy thành công',
            description: 'Quá trình xác thực đã được hủy.',
            type: 'info',
            duration: 3000,
            floating: true,
          });
        }
      } catch (error) {
        showMessage({
          message: 'Lỗi',
          description: error.message || 'Không thể hủy xác thực.',
          type: 'danger',
          duration: 3000,
          floating: true,
        });
      }
    }
    setShowOtpModal(false);
    setOtp(['', '', '', '', '', '']);
    setUserId(null);
    setContactType(null);
  };

  // Định dạng thời gian
  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Animated.View
          style={[
            styles.content,
            {opacity: fadeAnim, transform: [{translateY: slideAnim}]},
          ]}>
          <View style={styles.header}>
            <Text style={styles.title}>Quên Mật Khẩu</Text>
            <Text style={styles.subtitle}>
              Nhập email hoặc số điện thoại để nhận mã xác thực
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="contact"
                rules={VALIDATION_RULES.contact}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    placeholder="Email hoặc số điện thoại"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="done"
                    containerStyle={[
                      styles.input,
                      errors.contact && styles.inputError,
                    ]}
                  />
                )}
              />
              {errors.contact && (
                <Text style={styles.errorText}>{errors.contact.message}</Text>
              )}
            </View>

            <Button.Main
              title={isLoading ? 'Đang gửi...' : 'Gửi mã xác thực'}
              onPress={handleSubmit(onSendOTP)}
              disabled={isLoading || blockTime > 0}
              style={[
                styles.button,
                (isLoading || blockTime > 0) && styles.buttonDisabled,
              ]}
            />

            <Button.Text
              title="Quay lại đăng nhập"
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            />
          </View>
        </Animated.View>

        <Modal
          visible={showOtpModal}
          transparent={true}
          animationType="fade"
          onRequestClose={handleCancel}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Nhập mã xác thực</Text>
                <Text style={styles.modalSubtitle}>
                  Mã OTP đã được gửi đến {contactValue}
                </Text>

                <View style={styles.otpContainer}>
                  {otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      ref={ref => (otpInputs.current[index] = ref)}
                      style={styles.otpInput}
                      value={digit}
                      onChangeText={value => handleOTPChange(value, index)}
                      onKeyPress={({nativeEvent}) =>
                        handleOTPKeyPress(nativeEvent.key, index)
                      }
                      keyboardType="numeric"
                      maxLength={1}
                      textAlign="center"
                      autoFocus={index === 0}
                    />
                  ))}
                </View>

                <View style={styles.timerContainer}>
                  {!canResend ? (
                    <Text style={styles.timerText}>
                      Gửi lại mã sau {formatTime(timer)}
                    </Text>
                  ) : (
                    <Button.Text title="Gửi lại mã" onPress={handleResendOTP} />
                  )}
                </View>

                <View style={styles.modalButtons}>
                  <Button.Main
                    title="Xác thực"
                    onPress={handleVerifyOTP}
                    style={styles.modalButton}
                  />
                  <Button.Main
                    title="Hủy"
                    onPress={handleCancel}
                    style={[styles.modalButton, styles.modalButtonSecondary]}
                    textStyle={styles.modalButtonTextSecondary}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPasswordScreen;
