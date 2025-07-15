import axios from 'axios';
import {API_BASE_URL} from '@env';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

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