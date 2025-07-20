import React, {useState, useRef, useEffect, useCallback} from 'react';
import {View, Text, TextInput, TouchableOpacity, StatusBar} from 'react-native';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import Button from '~/components/ui/Button/ButtonComponent';
import styles from './OtpInput.styles';
import {verifyOtp, resendOtp, topVerifyOtp} from '~/api/verifyOtpApi';
import {showMessage} from 'react-native-flash-message';
import {Colors} from '~/theme/theme';
import Background_2 from '~/components/Background/Background_2';

const OTPInputScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [cooldown, setCooldown] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = useRef([]);
  const navigation = useNavigation();
  const {userId, contact, phone, otp: otpFromRoute} = useRoute().params || {};

  const isEmail = contact?.includes('@');
  const type = isEmail ? 'verify-email' : 'verify-phone';

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (userId && !isVerified) {
          console.log('Top verify otp gọi với:', {userId, type});

          topVerifyOtp({userId: String(userId), type})
            .then(() => {
              console.log(
                'Tự động xóa OTP & tài khoản do người dùng rời khỏi màn hình',
              );
            })
            .catch(err => {
              console.log('Lỗi gọi topVerifyOtp:', err.message);
            });
        }
      };
    }, [userId, type, isVerified]),
  );

  useEffect(() => {
    if (otpFromRoute && otpFromRoute.length === 6) {
      setOtp(otpFromRoute.split(''));
      inputRefs.current[5]?.focus();
    }
    setCooldown(30);
  }, [otpFromRoute]);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown(prev => {
          if (prev <= 1) {
            setResendCount(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleChangeText = (text, index) => {
    const numericText = text.replace(/[^0-9]/g, '');
    if (numericText.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = numericText;
      setOtp(newOtp);
      if (numericText && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleInputPress = index => {
    inputRefs.current[index]?.focus();
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join('');

    if (otpString.length !== 6) {
      showMessage({
        message: 'Mã OTP không hợp lệ',
        description: 'Vui lòng nhập đầy đủ 6 số để tiếp tục',
        type: 'danger',
        duration: 3000,
        floating: true,
      });
      return;
    }

    if (!userId) {
      showMessage({
        message: 'Thiếu thông tin người dùng',
        description: 'Vui lòng quay lại và thử lại quá trình đăng ký',
        type: 'danger',
        duration: 3000,
        floating: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await verifyOtp({
        userId: String(userId),
        otp: otpString,
        type,
      });

      if (res.success) {
        setIsVerified(true);
        showMessage({
          message: 'Xác thực thành công',
          description: 'Bạn sẽ được chuyển đến màn hình đăng nhập',
          type: 'success',
          duration: 2000,
          floating: true,
        });
        navigation.replace('NoBottomTab', {screen: 'Login'});
      } else {
        showMessage({
          message: 'Xác thực thất bại',
          description: res.message || 'Mã OTP không chính xác hoặc đã hết hạn',
          type: 'danger',
          duration: 3000,
          floating: true,
        });
        setCooldown(30);
      }
    } catch (err) {
      showMessage({
        message: 'Lỗi hệ thống',
        description: err.message || 'Không thể xác thực OTP. Vui lòng thử lại.',
        type: 'danger',
        duration: 3000,
        floating: true,
      });
      setCooldown(30);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!userId || (!contact && !phone)) {
      showMessage({
        message: 'Thiếu thông tin',
        description: 'Không thể gửi lại mã OTP do thiếu thông tin liên lạc',
        type: 'danger',
        duration: 3000,
        floating: true,
      });
      return;
    }

    if (cooldown > 0) return;

    setIsLoading(true);

    try {
      const res = await resendOtp({
        userId: String(userId),
        contact,
        phone,
        type,
      });

      if (res.success) {
        setResendCount(prev => prev + 1);
        setCooldown(30);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();

        showMessage({
          message: 'Mã OTP mới đã được gửi',
          description: 'Vui lòng kiểm tra điện thoại hoặc email',
          type: 'success',
          duration: 2500,
          floating: true,
        });

        if (res.data?.otp?.length === 6) {
          setOtp(res.data.otp.split(''));
          inputRefs.current[5]?.focus();
        }
      } else {
        const isExceeded = res.message?.includes(
          'You have exceeded the maximum number',
        );
        if (isExceeded) {
          showMessage({
            message: 'Tài khoản đã bị xóa',
            description: 'Bạn đã gửi lại mã quá 3 lần. Vui lòng đăng ký lại.',
            type: 'danger',
            duration: 4000,
            floating: true,
          });
          navigation.replace('Register');
        } else {
          showMessage({
            message: 'Không thể gửi lại mã',
            description: res.message || 'Vui lòng thử lại sau',
            type: 'danger',
            duration: 3000,
            floating: true,
          });
        }
      }
    } catch (err) {
      const isExceeded = err.message?.includes(
        'You have exceeded the maximum number',
      );
      if (isExceeded) {
        showMessage({
          message: 'Tài khoản đã bị xóa',
          description: 'Bạn đã gửi lại mã quá 3 lần. Vui lòng đăng ký lại.',
          type: 'danger',
          duration: 4000,
          floating: true,
        });
        navigation.replace('Register');
      } else {
        showMessage({
          message: 'Lỗi hệ thống',
          description: err.message || 'Gửi lại OTP thất bại',
          type: 'danger',
          duration: 3000,
          floating: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.headerBack} barStyle="light-content" />

      <Background_2 />

      <View style={styles.header}>
        <Text style={styles.title}>Xác thực OTP</Text>
        <Text style={styles.subtitle}>
          Chúng tôi đã gửi mã xác thực 6 số đến{'\n'}
          <Text style={styles.phoneNumber}>
            {contact || phone || 'Thông tin liên lạc không xác định'}
          </Text>
        </Text>
      </View>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleInputPress(index)}
            activeOpacity={0.7}>
            <TextInput
              ref={ref => (inputRefs.current[index] = ref)}
              style={[styles.otpInput, digit && styles.otpInputFilled]}
              value={digit}
              onChangeText={text => handleChangeText(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              keyboardType="numeric"
              maxLength={1}
              selectTextOnFocus
            />
          </TouchableOpacity>
        ))}
      </View>

      <Button.Main
        title={isLoading ? 'Đang xác thực...' : 'Xác thực'}
        onPress={handleVerifyOTP}
        disabled={isLoading}
        style={[styles.verifyButton, isLoading && styles.verifyButtonDisabled]}
      />

      <View style={styles.resendContainer}>
        {cooldown > 0 ? (
          <Text style={styles.resendText}>
            Vui lòng chờ {formatTime(cooldown)} để gửi lại mã
          </Text>
        ) : resendCount >= 3 ? (
          <Text style={styles.resendText}>
            Bạn đã vượt quá số lần gửi lại mã
          </Text>
        ) : (
          <>
            <Text style={styles.resendText}>Không nhận được mã?</Text>
            <Button.Text
              title="Gửi lại"
              textStyle={styles.buttontext}
              onPress={handleResendCode}
              style={styles.resendButton}
              disabled={isLoading}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default OTPInputScreen;
