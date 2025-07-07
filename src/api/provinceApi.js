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
