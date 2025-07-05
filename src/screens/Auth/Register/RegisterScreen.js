import React, {useCallback, useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  Platform,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useForm, Controller} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import {showMessage} from 'react-native-flash-message';

import styles from './Register.styles';
import Input from '~/components/ui/Input/InputComponents';
import Button from '~/components/ui/Button/ButtonComponent';
import {MailIcon, LockIcon} from '~/assets/icons/Icons';
import {registerUser} from '~/api/authApi';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../../../theme/theme';
import FastImage from 'react-native-fast-image';
import Images from '../../../assets/images/Images';
import {
  showErrorMessage,
  showSuccessMessage,
} from '../../../components/ToastMessage/ToastMessage';
import LoadingOverlay from '../../../components/Loading/LoadingOverlay';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [isRegistering, setIsRegistering] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    watch,
    reset,
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      userName: '',
      yearOfBirth: '',
    },
    mode: 'onChange',
  });

  const watchPassword = watch('password');

  const mutation = useMutation({
    mutationFn: registerUser,
    onMutate: () => setIsRegistering(true),
    onSuccess: result => {
      if (result.requiresOtp) {
        navigation.navigate('NoBottomTab', {
          screen: 'OtpInput',
          params: {
            userId: result.userId,
            otp: result.otp,
            contact:
              result.type === 'verify-email' ? watch('email') : watch('phone'),
          },
        });
      } else {
        showSuccessMessage({
          icon: false,
          message: 'Đăng ký thành công',
          description: 'Vui lòng kiểm tra email để xác thực tài khoản',
        });
        reset();
        navigation.navigate('NoBottomTab', {screen: 'Login'});
      }
    },
    onError: error => {
      showErrorMessage({
        icon: false,
        message: 'Đăng ký thất bại',
        description: getTranslatedError(error),
      });
    },
    onSettled: () => setIsRegistering(false),
  });

  const onSubmit = useCallback(
    async formData => {
      mutation.mutate({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        userName: formData.userName,
        yearOfBirth: formData.yearOfBirth,
      });
    },
    [mutation],
  );

  const navigateToLogin = () => {
    navigation.navigate('NoBottomTab', {screen: 'Login'});
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <SafeAreaView
        style={{flex: 1, backgroundColor: Colors.white}}
        edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}>
            <View style={styles.container}>
              <View style={styles.headerContainer}>
                <View style={styles.logoContainer}>
                  <FastImage
                    source={Images.splash_screen}
                    style={styles.logo}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </View>

                <Text style={styles.title}>Đăng ký</Text>
                <Text style={styles.subtitle}>
                  Tạo tài khoản mới để bắt đầu sử dụng ứng dụng
                </Text>
              </View>

              <View>
                {/* Full Name Input */}
                <View style={styles.inputContainer}>
                  <Controller
                    control={control}
                    name="fullName"
                    rules={{required: 'Vui lòng nhập họ và tên'}}
                    render={({field: {onChange, onBlur, value}}) => (
                      <Input
                        label="Họ và tên"
                        placeholder="Nhập họ và tên"
                        keyboardType="default"
                        autoCapitalize="words"
                        value={value}
                        leftIcon={MailIcon}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        error={!!errors.fullName}
                        containerStyle={[errors.fullName && styles.inputError]}
                      />
                    )}
                  />
                  {errors.fullName && (
                    <Text style={styles.errorText}>
                      {errors.fullName.message}
                    </Text>
                  )}
                </View>

                {/* Email Input */}
                <View style={styles.inputContainer}>
                  <Controller
                    control={control}
                    name="email"
                    rules={{
                      required: 'Vui lòng nhập email',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Vui lòng nhập đúng định dạng email',
                      },
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <Input
                        label="Email"
                        placeholder="Nhập email (tùy chọn)"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={value}
                        leftIcon={MailIcon}
                        onBlur={onBlur}
                        onChangeText={text => onChange(text.trim())}
                        error={!!errors.email}
                        containerStyle={[errors.email && styles.inputError]}
                      />
                    )}
                  />
                  {errors.email && (
                    <Text style={styles.errorText}>{errors.email.message}</Text>
                  )}
                </View>

                {/* Phone Input */}
                <View style={styles.inputContainer}>
                  <Controller
                    control={control}
                    name="phone"
                    rules={{
                      required: 'Vui lòng nhập Số điện thoại',
                      pattern: {
                        value: /^(0|\+84)[0-9]{9}$/,
                        message:
                          'Vui lòng nhập đúng định dạng số điện thoại (10 số)',
                      },
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <Input
                        label="Số điện thoại"
                        placeholder="Nhập số điện thoại (tùy chọn)"
                        keyboardType="phone-pad"
                        autoCapitalize="none"
                        value={value}
                        leftIcon={MailIcon}
                        onBlur={onBlur}
                        onChangeText={text => onChange(text.trim())}
                        error={!!errors.phone}
                        containerStyle={[errors.phone && styles.inputError]}
                      />
                    )}
                  />
                  {errors.phone && (
                    <Text style={styles.errorText}>{errors.phone.message}</Text>
                  )}
                </View>

                {/* User Name Input */}
                <View style={styles.inputContainer}>
                  <Controller
                    control={control}
                    name="userName"
                    rules={{required: 'Vui lòng nhập tên đăng nhập'}}
                    render={({field: {onChange, onBlur, value}}) => (
                      <Input
                        label="Tên đăng nhập"
                        placeholder="Nhập tên đăng nhập"
                        keyboardType="default"
                        autoCapitalize="none"
                        value={value}
                        leftIcon={MailIcon}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        error={!!errors.userName}
                        containerStyle={[errors.userName && styles.inputError]}
                      />
                    )}
                  />
                  {errors.userName && (
                    <Text style={styles.errorText}>
                      {errors.userName.message}
                    </Text>
                  )}
                </View>

                {/* Year of Birth Input */}
                <View style={styles.inputContainer}>
                  <Controller
                    control={control}
                    name="yearOfBirth"
                    rules={{
                      required: 'Vui lòng nhập năm sinh',
                      pattern: {
                        value: /^(19|20)\d{2}$/,
                        message: 'Vui lòng nhập năm sinh hợp lệ (1900-2099)',
                      },
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <Input
                        label="Năm sinh"
                        placeholder="Nhập năm sinh (YYYY)"
                        keyboardType="numeric"
                        value={value}
                        leftIcon={MailIcon}
                        onBlur={onBlur}
                        onChangeText={text => onChange(text.trim())}
                        error={!!errors.yearOfBirth}
                        containerStyle={[
                          errors.yearOfBirth && styles.inputError,
                        ]}
                      />
                    )}
                  />
                  {errors.yearOfBirth && (
                    <Text style={styles.errorText}>
                      {errors.yearOfBirth.message}
                    </Text>
                  )}
                </View>

                {/* Password Input */}
                <View style={styles.inputContainer}>
                  <Controller
                    control={control}
                    name="password"
                    rules={{
                      required: 'Vui lòng nhập mật khẩu',
                      minLength: {
                        value: 6,
                        message: 'Mật khẩu phải có ít nhất 6 ký tự',
                      },
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <Input
                        label="Mật khẩu"
                        placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
                        leftIcon={LockIcon}
                        isPassword
                        value={value}
                        onBlur={onBlur}
                        onChangeText={text => onChange(text.trim())}
                        error={!!errors.password}
                        containerStyle={[errors.password && styles.inputError]}
                      />
                    )}
                  />
                  {errors.password && (
                    <Text style={styles.errorText}>
                      {errors.password.message}
                    </Text>
                  )}
                </View>

                {/* Confirm Password */}
                <View style={styles.inputContainer}>
                  <Controller
                    control={control}
                    name="confirmPassword"
                    rules={{
                      required: 'Vui lòng xác nhận mật khẩu',
                      validate: value =>
                        value === watchPassword ||
                        'Mật khẩu xác nhận không khớp',
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <Input
                        label="Xác nhận mật khẩu"
                        placeholder="Nhập lại mật khẩu"
                        leftIcon={LockIcon}
                        isPassword
                        value={value}
                        onBlur={onBlur}
                        onChangeText={text => onChange(text.trim())}
                        error={!!errors.confirmPassword}
                        containerStyle={[
                          errors.confirmPassword && styles.inputError,
                        ]}
                      />
                    )}
                  />
                  {errors.confirmPassword && (
                    <Text style={styles.errorText}>
                      {errors.confirmPassword.message}
                    </Text>
                  )}
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <Button.Main
                  title={isRegistering ? 'Đang đăng ký...' : 'Đăng ký'}
                  onPress={handleSubmit(onSubmit)}
                  disabled={isRegistering}
                  loading={isRegistering}
                />

                <View style={styles.loginContainer}>
                  <Text style={styles.loginText}>Đã có tài khoản? </Text>
                  <Button.Text
                    title="Đăng nhập"
                    onPress={navigateToLogin}
                    disabled={isRegistering}
                    textStyle={styles.loginbuttonText}
                  />
                </View>

                <View style={styles.farmInfoContainer}>
                  <View style={styles.farmInfoItem}>
                    <Text style={styles.farmInfoIcon}>🌱</Text>
                    <Text style={styles.farmInfoText}>Hữu cơ</Text>
                  </View>
                  <View style={styles.farmInfoItem}>
                    <Text style={styles.farmInfoIcon}>♻️</Text>
                    <Text style={styles.farmInfoText}>Bền vững</Text>
                  </View>
                  <View style={styles.farmInfoItem}>
                    <Text style={styles.farmInfoIcon}>🌿</Text>
                    <Text style={styles.farmInfoText}>Tự nhiên</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {isRegistering && <LoadingOverlay />}
    </>
  );
};

export default RegisterScreen;
