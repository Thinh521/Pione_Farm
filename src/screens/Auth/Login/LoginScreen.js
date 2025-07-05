import React, {useCallback, useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  Platform,
  StatusBar,
} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import {Controller, useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/core';
import styles from './Login.styles';

import Button from '~/components/ui/Button/ButtonComponent';
import Input from '~/components/ui/Input/InputComponents';
import {MailIcon, LockIcon} from '~/assets/icons/Icons';
import {loginUser} from '~/api/authApi';
import {saveUserData} from '~/utils/storage/userStorage';
import {VALIDATION_RULES} from '~/validations/authValidations';
import FastImage from 'react-native-fast-image';
import Images from '~/assets/images/Images';
import LoadingOverlay from '~/components/Loading/LoadingOverlay';
import {Colors} from '~/theme/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  showErrorMessage,
  showSuccessMessage,
} from '~/components/ToastMessage/ToastMessage';
import {getTranslatedError} from '~/utils/error/getTranslatedError';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    reset,
  } = useForm({
    defaultValues: {
      emailOrPhone: '',
      password: '',
    },
    mode: 'onChange',
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onMutate: () => setIsLoggingIn(true),
    onSuccess: data => {
      const user = data?.data;

      saveUserData(user);

      showSuccessMessage({
        icon: false,
        message: 'Đăng nhập thành công',
        description: 'Chào mừng bạn đến với Pione Farm!',
      });

      reset();

      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'BottomTab',
            params: {
              screen: 'Home',
            },
          },
        ],
      });
    },
    onError: error => {
      showErrorMessage({
        icon: false,
        message: 'Đăng nhập thất bại',
        description: getTranslatedError(error),
      });
    },
    onSettled: () => setIsLoggingIn(false),
  });

  const onSubmit = useCallback(
    data => {
      if (!isValid) {
        showErrorMessage({
          icon: false,
          message: 'Thông tin không hợp lệ',
          description: 'Vui lòng kiểm tra lại thông tin đã nhập',
        });
        return;
      }

      const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        data.emailOrPhone,
      );
      const isPhone = /^\d{10}$/.test(data.emailOrPhone);

      mutation.mutate({
        email: isEmail ? data.emailOrPhone : undefined,
        phone: isPhone ? data.emailOrPhone : undefined,
        password: data.password,
      });
    },
    [mutation, isValid],
  );

  const NavigationToRegister = useCallback(() => {
    navigation.navigate('NoBottomTab', {screen: 'Register'});
  }, [navigation]);

  const NavigationToForgotPassword = useCallback(() => {
    navigation.navigate('NoBottomTab', {screen: 'ForgotPassword'});
  }, [navigation]);

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
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}>
            <View style={styles.container}>
              <View>
                <View style={styles.headerContainer}>
                  <View style={styles.logoContainer}>
                    <FastImage
                      source={Images.splash_screen}
                      style={styles.logo}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </View>

                  <Text style={styles.title}>Đăng nhập</Text>
                  <Text style={styles.subtitle}>
                    Chào mừng trở lại với nông trại của bạn!
                  </Text>
                </View>

                <View>
                  {/* Email or phone input */}
                  <View style={styles.inputContainer}>
                    <Controller
                      control={control}
                      name="emailOrPhone"
                      rules={VALIDATION_RULES.emailOrPhone}
                      render={({field: {onChange, onBlur, value}}) => (
                        <View style={styles.inputWrapper}>
                          <View>
                            <Input
                              label="Email hoặc Số điện thoại"
                              placeholder="Nhập email hoặc số điện thoại"
                              keyboardType="default"
                              autoCapitalize="none"
                              autoCorrect={false}
                              value={value}
                              leftIcon={MailIcon}
                              onBlur={onBlur}
                              onChangeText={text => onChange(text.trim())}
                              error={!!errors.emailOrPhone}
                              editable={!isLoggingIn}
                              containerStyle={[
                                errors.emailOrPhone && styles.inputError,
                              ]}
                            />
                          </View>
                        </View>
                      )}
                    />
                    {errors.emailOrPhone && (
                      <Text style={styles.errorText}>
                        {errors.emailOrPhone.message}
                      </Text>
                    )}
                  </View>

                  {/* Password input */}
                  <View style={styles.inputContainer}>
                    <Controller
                      control={control}
                      name="password"
                      rules={VALIDATION_RULES.password}
                      render={({field: {onChange, onBlur, value}}) => (
                        <View style={styles.inputWrapper}>
                          <View>
                            <Input
                              label="Mật khẩu"
                              placeholder="Nhập mật khẩu"
                              value={value}
                              isPassword
                              leftIcon={LockIcon}
                              onBlur={onBlur}
                              onChangeText={text => onChange(text.trim())}
                              autoComplete="password"
                              textContentType="password"
                              error={!!errors.password}
                              editable={!isLoggingIn}
                              containerStyle={[
                                errors.password && styles.inputError,
                              ]}
                            />
                          </View>
                        </View>
                      )}
                    />
                    {errors.password && (
                      <Text style={styles.errorText}>
                        {errors.password.message}
                      </Text>
                    )}
                  </View>
                </View>

                <View>
                  <Button.Text
                    title="Quên mật khẩu?"
                    onPress={NavigationToForgotPassword}
                    disabled={isLoggingIn}
                    style={styles.forgotPasswordButton}
                    textStyle={styles.forgotPasswordText}
                  />

                  <Button.Main
                    title={isLoggingIn ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    onPress={handleSubmit(onSubmit)}
                    disabled={isLoggingIn}
                    loading={isLoggingIn}
                    style={styles.loginButton}
                  />

                  <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>
                      Bạn chưa có tài khoản?
                    </Text>
                    <Button.Text
                      title="Đăng ký ngay"
                      onPress={NavigationToRegister}
                      textStyle={styles.registerButtonText}
                      disabled={isLoggingIn}
                    />
                  </View>
                </View>

                {/* Farm Info Footer */}
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

      {isLoggingIn && <LoadingOverlay />}
    </>
  );
};

export default LoginScreen;
