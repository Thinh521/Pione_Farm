import api from './baseApi';

export const getStatisticalApi = async productTypeId => {
  try {
    const payload = productTypeId ? {productTypeId} : {};
    const res = await api.post('/api/order-stats', payload);

    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || 'Không thể tải thống kê đơn hàng';
    console.log('Lỗi getStatisticalApi:', message);
    throw new Error(message);
  }
};

export const fetchProductTypeList = async () => {
  try {
    const res = await api.get('/api/product-type');

    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || 'Không thể tải các loại trái cây';
    console.log('Lỗi fetchProductTypeList :', message);
    throw new Error(message);
  }
};
