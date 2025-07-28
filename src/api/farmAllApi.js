import api from './baseApi';

export const getFarmALl = async () => {
  try {
    const res = await api.get('/api/cultivation/farm');
    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || 'Không thể tải danh sách danh mục';
    console.log('Lỗi khi lấy danh mục:', message);
    throw new Error(message);
  }
};
