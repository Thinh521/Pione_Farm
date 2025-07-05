import {MMKV} from 'react-native-mmkv';

const storage = new MMKV({id: 'auth_storage'});

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

// Lưu accessToken và refreshToken
export const saveTokens = (accessToken, refreshToken) => {
  if (!accessToken || !refreshToken) {
    console.warn('AccessToken hoặc RefreshToken bị thiếu.');
    return false;
  }

  try {
    storage.set(ACCESS_TOKEN_KEY, accessToken);
    storage.set(REFRESH_TOKEN_KEY, refreshToken);
    return true;
  } catch (error) {
    console.error('Lỗi khi lưu token:', error);
    return false;
  }
};

// Lấy accessToken
export const getAccessToken = () => {
  try {
    return storage.getString(ACCESS_TOKEN_KEY) || null;
  } catch (error) {
    console.error('Lỗi khi lấy accessToken:', error);
    return null;
  }
};

// Lấy refreshToken
export const getRefreshToken = () => {
  try {
    return storage.getString(REFRESH_TOKEN_KEY) || null;
  } catch (error) {
    console.error('Lỗi khi lấy refreshToken:', error);
    return null;
  }
};

// Xóa token
export const removeTokens = () => {
  try {
    storage.delete(ACCESS_TOKEN_KEY);
    storage.delete(REFRESH_TOKEN_KEY);
    return true;
  } catch (error) {
    console.error('Lỗi khi xóa token:', error);
    return false;
  }
};

// Kiểm tra token có tồn tại không
export const hasValidTokens = () => {
  try {
    const accessToken = storage.getString(ACCESS_TOKEN_KEY);
    const refreshToken = storage.getString(REFRESH_TOKEN_KEY);
    return !!accessToken && !!refreshToken;
  } catch (error) {
    console.error('Lỗi khi kiểm tra token:', error);
    return false;
  }
};
