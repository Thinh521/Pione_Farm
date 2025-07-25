import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {getUserData} from './storage/userStorage';
import {saveFcmToken} from '../api/fcmApi';
import { saveFcmTokenLocally } from './storage/fcmStorage';

const requestAndroidNotificationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Thông báo',
          message: 'Ứng dụng cần quyền gửi thông báo đến bạn.',
          buttonPositive: 'Cho phép',
          buttonNegative: 'Từ chối',
        },
      );

      console.log(
        granted === PermissionsAndroid.RESULTS.GRANTED
          ? 'Android notification permission granted'
          : 'Android notification permission denied',
      );
    } catch (error) {
      console.warn('Lỗi khi xin quyền thông báo Android:', error);
    }
  }
};

export const requestUserPermission = async () => {
  await requestAndroidNotificationPermission();

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  console.log('Notification permission:', enabled ? 'granted' : 'denied');
};

export const getFcmToken = async () => {
  try {
    const token = await messaging().getToken();
    return token;
  } catch (error) {
    console.log('Lỗi khi lấy FCM Token:', error);
    return null;
  }
};

export const uploadFcmTokenIfNeeded = async () => {
  try {
    const user = await getUserData();
    if (!user?.id) return;

    const newToken = await getFcmToken();

    if (newToken) {
      const res = await saveFcmToken({
        userId: user.id,
        fcmToken: newToken,
      });
      console.log('Đã gửi FCM token mới lên server:', res);
      saveFcmTokenLocally(newToken);
    } else {
      console.log('FCM token không thay đổi, không cần gửi lại.');
    }
  } catch (error) {
    console.log('Lỗi khi xử lý gửi FCM token:', error);
  }
};

export const setupFCMListeners = () => {
  PushNotification.createChannel(
    {
      channelId: 'default-channel-id',
      channelName: 'Kênh thông báo mặc định',
      importance: 4,
    },
    created => console.log('Notification channel created:', created),
  );

  messaging().onMessage(async remoteMessage => {
    console.log('Foreground message:', remoteMessage);
    PushNotification.localNotification({
      channelId: 'default-channel-id',
      title: remoteMessage.notification?.title || 'Thông báo',
      message: remoteMessage.notification?.body || 'Bạn có thông báo mới',
      playSound: true,
      soundName: 'default',
    });
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notification tapped from background:', remoteMessage);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('App opened from quit by notification:', remoteMessage);
      }
    });
};
