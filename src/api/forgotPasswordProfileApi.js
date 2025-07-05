import api from './api';

export const forgotPasswordProfile = async ({
  newPassword,
  confirmPassword,
  currentPassword,
}) => {
  try {
    const res = await api.put('/api/user/change-password', {
      currentPassword,
      newPassword,
      confirmPassword,
    });

    if (res.data?.success) {
      return res.data;
    } else {
      throw new Error(res.data.message || 'Đổi mật khẩu thất bại');
    }
  } catch (error) {
    const message =
      error?.response?.data?.message || error.message || 'Đã có lỗi xảy ra';
    throw new Error(message);
  }
};
