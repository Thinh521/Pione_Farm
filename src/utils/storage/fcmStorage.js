import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

const FCM_TOKEN_KEY = 'fcmToken';

export const saveFcmTokenLocally = token => {
  storage.set(FCM_TOKEN_KEY, token);
};

export const getSavedFcmToken = () => {
  return storage.getString(FCM_TOKEN_KEY);
};

export const deleteFcmToken = () => {
  storage.delete(FCM_TOKEN_KEY);
};
