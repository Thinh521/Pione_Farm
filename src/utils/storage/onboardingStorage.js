import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export const setBool = (key, value) => {
  storage.set(key, value);
};

export const getBool = key => {
  return storage.getBoolean(key);
};
