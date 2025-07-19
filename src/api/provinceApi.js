import api from './baseApi';

export const getAllProvinceApii = async () => {
  try {
    const res = await api.get('/api/province');
    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || 'Không thể tải danh sách tỉnh';
    console.log('Lỗi khi lấy tỉnh:', message);
    throw new Error(message);
  }
};
