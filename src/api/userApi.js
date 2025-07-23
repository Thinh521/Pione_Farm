import api from './api';

export const getCurrentUser = async () => {
  try {
    const res = await api.get('/api/user/get-user');

    if (res.data?.success) {
      return res.data.data;
    } else {
      throw new Error(res.data.message || 'Không thể lấy thông tin người dùng');
    }
  } catch (error) {
    const errMessage =
      error?.response?.data?.message || 'Lỗi khi lấy thông tin người dùng';
    throw new Error(errMessage);
  }
};
  
export const updateUser = async formData => {
  try {
    const res = await api.put('/api/user/user', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('updateUser:', res.data);

    return res.data;
  } catch (error) {
    const errMessage =
      error?.response?.data?.message || 'Cập nhật thông tin thất bại';
    throw new Error(errMessage);
  }
};
