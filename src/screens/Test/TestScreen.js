import React, {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';
import {
  Platform,
  PermissionsAndroid,
  View,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {LightIcon} from '../../assets/icons/Icons';
import styles from './Test.styles';
import {logoutUser} from '../../api/authApi';

const TestScreen = () => {
  const navigation = useNavigation();

  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission granted');
        } else {
          console.log('Notification permission denied');
        }
      } catch (err) {
        console.warn('Permission error:', err);
      }
    }
  };

  const configurePush = () => {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        notification.finish(PushNotification.FetchResult.NoData);
      },
      requestPermissions: Platform.OS === 'ios',
    });

    PushNotification.createChannel({
      channelId: 'default-channel-id',
      channelName: 'Default Channel',
    });
  };

  useEffect(() => {
    requestNotificationPermission();
    configurePush();
  }, []);

  const showNotification = () => {
    PushNotification.localNotification({
      channelId: 'default-channel-id',
      title: 'Thông báo',
      message: 'Chào bạn! Đây là notification từ React Native!',
    });
  };

  const navigateTo = screen => navigation.navigate('NoBottomTab', {screen});

  const handleLogout = async () => {
    try {
      console.log('Bắt đầu quá trình đăng xuất...');
      const result = await logoutUser();
      console.log('Đăng xuất thành công:', result.message);
      navigateTo('Home');
    } catch (error) {
      console.error('Lỗi đăng xuất:', error.message || error);
      navigateTo('Home');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'column', gap: 20}}>
        <Text style={styles.title}>Test Push Notification</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
          <Button title="Thông báo" onPress={showNotification} />
          <Button title="Đăng nhập" onPress={() => navigateTo('Login')} />
          <Button title="otp" onPress={() => navigateTo('OtpInput')} />
          <Button title="Đăng xuất" onPress={handleLogout} />
          <Button title="Onboarding" onPress={() => navigateTo('Onboarding')} />
          <Button
            title="LoginRequired"
            onPress={() => navigateTo('LoginRequired')}
          />
          <Button title="Reset" onPress={() => navigateTo('ResetPassword')} />
        </View>
        <View>
          <TouchableOpacity>
            <LightIcon style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TestScreen;
