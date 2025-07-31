import axios from 'axios';
import {API_BASE_URL} from '@env';
import {
  getRefreshToken,
  saveTokens,
  removeTokens,
} from '../utils/storage/tokenStorage';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const loginUser = async ({email, phone, password}) => {
  try {
    const payload = {
      password,
      id: true,
      ...(email ? {email} : {}),
      ...(phone ? {phone} : {}),
    };

    const response = await api.post('/api/authentication/login', payload);
    const {accessToken, refreshToken} = response.data?.data || {};

    if (!accessToken || !refreshToken) {
      throw new Error('Không nhận được token sau khi đăng nhập');
    }

    await saveTokens(accessToken, refreshToken);

    console.log('login', response.data);

    return response.data;
  } catch (error) {
    const message = error?.response?.data?.message || 'Đăng nhập thất bại';
    console.log('Lỗi đăng nhập:', message);
    throw new Error(message);
  }
};

export const logoutUser = async () => {
  try {
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
      console.warn('Không có refresh token - xóa local');
      await removeTokens();
      return {success: true, message: 'Đã xóa token local'};
    }

    const response = await api.post('/api/authentication/log-out', {
      refreshToken,
    });

    if (response.data?.success) {
      await removeTokens();
      return response.data;
    }

    throw new Error(response.data?.message || 'Đăng xuất thất bại');
  } catch (error) {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || 'Đăng xuất thất bại';

    if (status === 401 || status === 403) {
      await removeTokens();
      return {success: true, message: 'Token hết hạn - xóa local'};
    }

    console.error('Lỗi đăng xuất:', message);
    throw new Error(message);
  }
};

export const registerUser = async ({
  fullName,
  email,
  phone,
  password,
  userName,
  yearOfBirth,
}) => {
  try {
    const payload = {
      fullName,
      password,
      userName,
      userType: 'statistical',
      ...(email ? {email} : {}),
      ...(phone ? {phone} : {}),
      ...(yearOfBirth ? {yearOfBirth: Number(yearOfBirth)} : {}),
    };

    const response = await api.post('/api/authentication/register', payload);
    const {success, data, message} = response.data;

    if (!success) {
      throw new Error(message || 'Đăng ký không thành công');
    }

    const {otp, userId, type} = data || {};
    if (otp && userId) {
      return {
        requiresOtp: true,
        otp,
        userId,
        type: type || 'verify-phone',
      };
    }

    return {
      requiresOtp: false,
      message: message || 'Đăng ký thành công',
    };
  } catch (error) {
    const message =
      error?.response?.data?.message || error.message || 'Đăng ký thất bại';
    console.error('Lỗi đăng ký:', message);
    throw new Error(message);
  }
};
