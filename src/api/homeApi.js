import api from './baseApi';

export const getProvinceProducts = async (payload = {}) => {
  try {
    const res = await api.post('/api/statistical/province-product', payload);
    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || 'Không thể tải sản phẩm theo tỉnh';
    console.log('Lỗi khi lấy sản phẩm theo tỉnh:', error);
    throw new Error(message);
  }
};

export const getProductPriceStats = async (
  productIds = [],
  provinceId = '',
) => {
  try {
    const res = await api.post('/api/statistical/product-price', {
      productIds,
      provinceId,
    });
    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      'Không thể tải dữ liệu biểu đồ sản phẩm';
    console.log('Lỗi khi lấy sản phẩm theo tỉnh:', error);
    throw new Error(message);
  }
};
