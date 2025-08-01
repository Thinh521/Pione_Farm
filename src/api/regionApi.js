import api from './api';

export const getRegionAll = async accessToken => {
  try {
    const response = await api.get('/api/region/get-all', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      'Không thể tải danh sách thông tin vùng';
    console.log('Lỗi khi lấy thông tin vùng:', message);
    throw new Error(message);
  }
};

export const getRegionById = async ({id, accessToken}) => {
  try {
    const response = await api.get(`/api/statistical/get-one-region/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('RESPONSE REGION:', response.data);

    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      'Không thể tải danh sách thông tin vùng';
    console.log('Lỗi khi lấy thông tin vùng:', message);
    throw new Error(message);
  }
};
