import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

const USER_KEY = 'userData';

export const saveUserData = user => {
  storage.set(USER_KEY, JSON.stringify(user));
};

export const getUserData = () => {
  const raw = storage.getString(USER_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const clearUserData = () => {
  storage.delete(USER_KEY);
};
