import api from './api';
import {saveTokens} from '../utils/storage/tokenStorage';

export const verifyOtp = async ({otp, userId, type}) => {
  try {
    if (!otp || !userId || !type) {
      throw new Error('Thiếu thông tin xác thực OTP');
    }

    const res = await api.post('/api/authentication/verify-otp', {
      userId: String(userId),
      otp,
      type,
    });

    const response = res.data;

    console.log('Verify OTP response:', response);

    if (response?.data?.accessToken && response?.data?.refreshToken) {
      await saveTokens(response.data.accessToken, response.data.refreshToken);
    }

    return response;
  } catch (error) {
    const errMessage =
      error?.response?.data?.message || 'Xác thực OTP thất bại';
    console.log('Error in verifyOtp:', errMessage);
    throw new Error(errMessage);
  }
};

export const resendOtp = async ({userId, contact, type}) => {
  try {
    if (!userId || !contact || !type) {
      throw new Error('Thiếu thông tin gửi lại OTP');
    }

    const payload =
      type === 'verify-phone'
        ? {userId: String(userId), type, phone: contact}
        : {userId: String(userId), type, email: contact};

    const res = await api.post('/api/authentication/again-otp', payload);

    console.log('Resend OTP response:', res.data);

    return res.data;
  } catch (error) {
    const errMessage = error?.response?.data?.message || 'Gửi lại OTP thất bại';
    console.log('Error in resendOtp:', errMessage);
    throw new Error(errMessage);
  }
};

export const topVerifyOtp = async ({userId, type}) => {
  try {
    if (!userId || !type) {
      throw new Error('Thiếu thông tin để hủy xác minh OTP');
    }

    const res = await api.post('/api/authentication/top-verify-otp', {
      userId: String(userId),
      type,
    });

    console.log('Top verify OTP response:', res.data);

    return res.data;
  } catch (error) {
    const errMessage =
      error?.response?.data?.message || 'Xác thực OTP thất bại';
    console.log('Error in topVerifyOtp:', errMessage);
    throw new Error(errMessage);
  }
};
