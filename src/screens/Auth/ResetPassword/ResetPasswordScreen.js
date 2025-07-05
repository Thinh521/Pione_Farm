import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import styles from './ResetPassword.styles';
import Button from '../../../components/ui/Button/ButtonComponent';
import Input from '../../../components/ui/Input/InputComponents';
import {getUserData} from '../../../utils/storage/userStorage';
import {newPassword} from '../../../api/forgotPasswordApi';
import {showMessage} from 'react-native-flash-message';
import {Controller, useForm} from 'react-hook-form';
import {VALIDATION_RULES} from '../../../validations/authValidations';

const ResetPasswordScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
    reset,
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

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
  }, []);

  useEffect(() => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  }, [password]);

  const getStrengthColor = () => {
    if (passwordStrength < 25) return '#ff4757';
    if (passwordStrength < 50) return '#ffa502';
    if (passwordStrength < 75) return '#ff6348';
    return '#2ed573';
  };

  const getStrengthText = () => {
    if (passwordStrength < 25) return 'Yếu';
    if (passwordStrength < 50) return 'Trung bình';
    if (passwordStrength < 75) return 'Khá';
    return 'Mạnh';
  };

  const onSubmit = async ({password}) => {
    setIsLoading(true);

    try {
      const user = getUserData();
      const userId = user?.id || user?._id;

      if (!userId) {
        throw new Error('Không tìm thấy userId. Vui lòng đăng nhập lại.');
      }

      const res = await newPassword({userId, newPassword: password});

      if (res.success) {
        showMessage({
          message: 'Thành công',
          description: 'Mật khẩu đã được đặt lại thành công',
          type: 'success',
          floating: true,
          duration: 2000,
        });

        navigation.navigate('NoBottomTab', {
          screen: 'Login',
        });
      } else {
        showMessage({
          message: 'Thất bại',
          description: res.message || 'Đặt lại mật khẩu thất bại',
          type: 'danger',
          floating: true,
          duration: 2000,
        });
      }
    } catch (error) {
      showMessage({
        message: 'Lỗi',
        description: err.message || 'Có lỗi xảy ra, vui lòng thử lại.',
        type: 'danger',
        floating: true,
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{translateY: slideAnim}],
            },
          ]}>
          <View style={styles.header}>
            <Text style={styles.title}>Đặt Lại Mật Khẩu</Text>
            <Text style={styles.subtitle}>
              Tạo mật khẩu mới cho tài khoản của bạn
            </Text>
          </View>

          <View style={styles.form}>
            {/* MẬT KHẨU MỚI */}
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="password"
                rules={VALIDATION_RULES.password}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    containerStyle={[
                      styles.input,
                      errors.password && styles.inputError,
                    ]}
                    placeholder="Mật khẩu mới"
                    placeholderTextColor="#a0a0a0"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                    isPassword
                    value={value}
                    onBlur={onBlur}
                    onChangeText={text => onChange(text.trim())}
                  />
                )}
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </View>

            {password.length > 0 && (
              <View style={styles.strengthContainer}>
                <View style={styles.strengthBar}>
                  <View
                    style={[
                      styles.strengthFill,
                      {
                        width: `${passwordStrength}%`,
                        backgroundColor: getStrengthColor(),
                      },
                    ]}
                  />
                </View>
                <Text
                  style={[styles.strengthText, {color: getStrengthColor()}]}>
                  Độ mạnh: {getStrengthText()}
                </Text>
              </View>
            )}

            {/* XÁC NHẬN MẬT KHẨU */}
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="confirmPassword"
                rules={{
                  required: 'Vui lòng xác nhận mật khẩu',
                  validate: VALIDATION_RULES.confirmPassword(password),
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    containerStyle={[
                      styles.input,
                      errors.confirmPassword && styles.inputError,
                    ]}
                    placeholder="Xác nhận mật khẩu"
                    placeholderTextColor="#a0a0a0"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                    isPassword
                    value={value}
                    onBlur={onBlur}
                    onChangeText={text => onChange(text.trim())}
                  />
                )}
              />
              {errors.confirmPassword && (
                <Text style={styles.errorText}>
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>

            <View style={styles.requirements}>
              <Text style={styles.requirementsTitle}>Yêu cầu mật khẩu:</Text>
              <Text style={styles.requirementText}>• Ít nhất 8 ký tự</Text>
              <Text style={styles.requirementText}>
                • Bao gồm chữ hoa và chữ thường
              </Text>
              <Text style={styles.requirementText}>• Có ít nhất 1 số</Text>
            </View>

            <Button.Main
              title={isLoading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}
            />

            <Button.Text
              title="Quay lại"
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            />
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ResetPasswordScreen;
