import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export const setToken = (token: string) => {
  storage.set('token', token);
};

export const getToken = () => {
  return storage.getString('token');
};

export const clearToken = () => {
  storage.delete('token');
};
