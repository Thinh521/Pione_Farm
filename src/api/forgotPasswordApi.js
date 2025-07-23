import api from './baseApi';

export const forgotPassword = async ({phone, email, otp} = {}) => {
  try {
    const payload = {};
    if (phone) payload.phone = phone;
    if (email) payload.email = email;
    if (otp) payload.otp = otp;

    const response = await api.post('/api/user/forgot-password', payload);
    console.log('Mã OTP quên mk: ', response.data);

    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};

export const newPassword = async ({userId, newPassword}) => {
  try {
    const response = await api.post('/api/user/new-password', {
      userId: String(userId),
      newPassword: String(newPassword),
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message || 'Đã xảy ra lỗi khi cập nhật mật khẩu');
  }
};

export const stopUpdatePassword = async ({userId, type}) => {
  try {
    const response = await api.post('/api/user/stop-update-password', {
      userId: String(userId),
      type,
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message || 'Đã xảy ra lỗi khi hủy xác thực');
  }
};
