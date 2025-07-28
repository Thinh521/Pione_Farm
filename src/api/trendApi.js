import api from './baseApi';

export const getAnalysisAi = async () => {
  try {
    const res = await api.get('/api/ai-analysis/get-responses');

    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || 'Không thể tải danh sách danh mục';
    console.log('Lỗi khi lấy danh mục:', message);
    throw new Error(message);
  }
};

export const getTrendAll = async date => {
  try {
    const body = date ? {date} : {};

    console.log('getTrendAll body:', body);

    const res = await api.post('/api/statistical/get-trend', body);

    return res.data || [];
  } catch (error) {
    const message =
      error?.response?.data?.message || 'Không thể tải dữ liệu xu hướng';
    console.log('Lỗi khi lấy xu hướng:', message);
    throw new Error(message);
  }
};
