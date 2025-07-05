import React, {memo, useMemo} from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import styles from './ForgotPasswordScreen.styles';
import Input from '~/components/ui/Input/InputComponents';
import {forgotPasswordProfile} from '~/api/forgotPasswordProfileApi';
import Background_2 from '~/components/Background/Background_2';
import {Colors} from '~/theme/theme';
import Button from '~/components/ui/Button/ButtonComponent';
import {VALIDATION_RULES} from '~/validations/authValidations';
import {removeTokens} from '~/utils/storage/tokenStorage';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoadingOverlay from '~/components/Loading/LoadingOverlay';

const getPasswordStrength = password => {
  if (!password) return {strength: 0, label: '', color: '#E0E0E0'};

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

  if (score <= 2) return {strength: score, label: 'Yếu', color: '#FF6B6B'};
  if (score <= 3)
    return {strength: score, label: 'Trung bình', color: '#FFD93D'};
  if (score <= 4) return {strength: score, label: 'Mạnh', color: '#6BCF7F'};
  return {strength: score, label: 'Rất mạnh', color: '#4ECDC4'};
};

const PasswordStrength = memo(({password}) => {
  const strength = useMemo(() => getPasswordStrength(password), [password]);
  return password ? (
    <View style={styles.passwordStrengthContainer}>
      <View style={styles.strengthBar}>
        <View
          style={[
            styles.strengthFill,
            {
              width: `${(strength.strength / 5) * 100}%`,
              backgroundColor: strength.color,
            },
          ]}
        />
      </View>
      <Text style={[styles.strengthText, {color: strength.color}]}>
        {strength.label}
      </Text>
    </View>
  ) : null;
});

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: {errors, isSubmitting},
  } = useForm({
    defaultValues: {oldPassword: '', newPassword: '', confirmPassword: ''},
    mode: 'onChange',
  });

  const newPassword = watch('newPassword');

  const onSubmit = async values => {
    if (values.oldPassword === values.newPassword) {
      setError('newPassword', {
        message: 'Mật khẩu mới phải khác mật khẩu cũ',
      });
      return;
    }

    try {
      await forgotPasswordProfile({
        currentPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });

      Alert.alert(
        'Thành công!',
        'Mật khẩu đã được thay đổi. Vui lòng đăng nhập lại để tiếp tục.',
        [
          {
            text: 'Đăng nhập lại',
            onPress: async () => {
              try {
                await removeTokens();
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Login'}],
                });
              } catch (e) {
                Alert.alert('Lỗi', 'Không thể đăng xuất. Vui lòng thử lại.');
                console.log('Lỗi khi logout:', e);
              }
            },
          },
        ],
      );
    } catch (error) {
      Alert.alert(
        'Lỗi',
        error?.response?.data?.message || 'Có lỗi xảy ra khi đổi mật khẩu',
      );
    }
  };

  return (
    <>
      <Background_2 />

      <StatusBar backgroundColor={Colors.headerBack} barStyle="light-content" />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Đổi Mật Khẩu</Text>
              <Text style={styles.subtitle}>
                Bảo vệ tài khoản nông nghiệp của bạn với mật khẩu mạnh
              </Text>
            </View>

            <View style={styles.formCard}>
              {/* Mật khẩu hiện tại */}
              <View style={styles.inputGroup}>
                <Controller
                  control={control}
                  name="oldPassword"
                  rules={{required: 'Vui lòng nhập mật khẩu cũ'}}
                  render={({field: {onChange, value}}) => (
                    <Input
                      label="Mật khẩu hiện tại"
                      placeholder="Nhập mật khẩu hiện tại"
                      isPassword
                      keyboardType="default"
                      autoCapitalize="none"
                      value={value || ''}
                      onChangeText={onChange}
                      required
                      accessibilityLabel="Nhập mật khẩu hiện tại"
                      containerStyle={
                        errors.oldPassword ? styles.inputError : null
                      }
                    />
                  )}
                />
                {errors.oldPassword && (
                  <Text style={styles.errorText}>
                    {errors.oldPassword.message}
                  </Text>
                )}
              </View>

              {/* Mật khẩu mới */}
              <View style={styles.inputGroup}>
                <Controller
                  control={control}
                  name="newPassword"
                  rules={VALIDATION_RULES.newPassword}
                  render={({field: {onChange, value}}) => (
                    <Input
                      label="Mật khẩu mới"
                      placeholder="Nhập mật khẩu mới"
                      isPassword
                      keyboardType="default"
                      autoCapitalize="none"
                      value={value || ''}
                      onChangeText={onChange}
                      required
                      accessibilityLabel="Nhập mật khẩu mới"
                      containerStyle={
                        errors.newPassword ? styles.inputError : null
                      }
                    />
                  )}
                />
                {errors.newPassword && (
                  <Text style={styles.errorText}>
                    {errors.newPassword.message}
                  </Text>
                )}
                <PasswordStrength password={newPassword} />
              </View>

              {/* Xác nhận mật khẩu */}
              <View style={styles.inputGroup}>
                <Controller
                  control={control}
                  name="confirmPassword"
                  rules={{
                    required: 'Vui lòng xác nhận mật khẩu mới',
                    validate: value =>
                      value === watch('newPassword') || 'Mật khẩu không khớp',
                  }}
                  render={({field: {onChange, value}}) => (
                    <Input
                      label="Xác nhận mật khẩu"
                      placeholder="Nhập lại mật khẩu mới"
                      isPassword
                      keyboardType="default"
                      autoCapitalize="none"
                      value={value || ''}
                      onChangeText={onChange}
                      required
                      accessibilityLabel="Xác nhận mật khẩu mới"
                      containerStyle={
                        errors.confirmPassword ? styles.inputError : null
                      }
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </View>

              {/* Yêu cầu */}
              <View style={styles.requirementsContainer}>
                <Text style={styles.requirementsTitle}>Yêu cầu mật khẩu:</Text>
                <View style={styles.requirementsList}>
                  <Text style={styles.requirementItem}>• Ít nhất 8 ký tự</Text>
                  <Text style={styles.requirementItem}>
                    • Có cả chữ hoa và chữ thường
                  </Text>
                  <Text style={styles.requirementItem}>• Ít nhất 1 chữ số</Text>
                  <Text style={styles.requirementItem}>
                    • Ít nhất 1 ký tự đặc biệt (!@#$%^&*)
                  </Text>
                </View>
              </View>

              <Button.Main
                title={isSubmitting ? 'Đang xử lý...' : 'Đổi Mật Khẩu'}
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                accessibilityLabel="Nút đổi mật khẩu"
                style={[
                  styles.changePasswordButton,
                  isSubmitting && styles.buttonDisabled,
                ]}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {isSubmitting && <LoadingOverlay />}
    </>
  );
};

export default memo(ForgotPasswordScreen);
