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
    console.log('❌ Lỗi khi gọi getCurrentUser');
    console.log('Message:', error.message);
    console.log('Response:', error.response?.data);
    console.log('Status:', error.response?.status);
    console.log('Headers:', error.response?.headers);
    console.log('Config:', error.config);

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

    console.log('✅ updateUser thành công:', res.data);

    return res.data;
  } catch (error) {
    console.log('❌ Lỗi khi gọi updateUser');
    console.log('Message:', error.message);
    console.log('Response:', error.response?.data);
    console.log('Status:', error.response?.status);
    console.log('Headers:', error.response?.headers);
    console.log('Config:', error.config);

    const errMessage =
      error?.response?.data?.message || 'Cập nhật thông tin thất bại';
    throw new Error(errMessage);
  }
};
