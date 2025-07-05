import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Images from '~/assets/images/Images';
import Button from '~/components/ui/Button/ButtonComponent';
import {useNavigation} from '@react-navigation/core';

const LoginRequiredScreen = () => {
  const navigation = useNavigation();

  const NavigationToLogin = () => {
    navigation.navigate('NoBottomTab', {
      screen: 'Login',
    });
  };

  const NavigationToRegister = () => {
    navigation.navigate('NoBottomTab', {
      screen: 'Register',
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={Images.splash_screen}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.description}>
        🌾 Quản lý thị trường nông sản dễ dàng, chính xác và thông minh hơn bao
        giờ hết.
      </Text>
      <Image
        source={Images.Login_Required}
        style={styles.illustration}
        resizeMode="contain"
      />
      <Button.Main
        title="Create an account"
        style={styles.createButton}
        onPress={NavigationToLogin}
      />
      <Button.Main
        title="Sign In"
        style={styles.signInButton}
        textStyle={styles.signInButtonText}
        onPress={NavigationToRegister}
      />
    </View>
  );
};

export default LoginRequiredScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  logo: {
    width: 117,
    height: 99,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  illustration: {
    width: 250,
    height: 200,
    marginBottom: 30,
  },
  createButton: {
    width: '100%',
    backgroundColor: '#FF5722',
    borderRadius: 999,
    marginBottom: 10,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInButton: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#FF5722',
  },
  signInButtonText: {
    color: '#FF5722',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
