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

export const getProductTypesByProvince = async (provinceId, dateRange = {}) => {
  try {
    const payload = {
      provinceId,
    };

    if (dateRange?.start && dateRange?.end) {
      payload.data = {
        start: dateRange.start,
        end: dateRange.end,
      };
    }

    const res = await api.post('/api/product-type/get-all', payload);

    console.log('res.data', res.data);

    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || 'Không thể tải type sản phẩm';
    console.error('Lỗi khi lấy type sản phẩm:', message);
    throw new Error(message);
  }
};
