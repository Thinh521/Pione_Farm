import api from './baseApi';

export const getNewsList = async (page = 1, type = null, accessToken) => {
  try {
    const response = await api.get('/api/news/get-all', {
      params: {
        page,
        ...(type && {type}),
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || 'Không thể tải danh sách tin tức';
    console.log('Lỗi getNewsList:', message);
    throw new Error(message);
  }
};

export const getNewsPaginated = async ({pageParam = 1, type, token}) => {
  try {
    const res = await api.get('/api/news/get-all', {
      params: {
        page: pageParam,
        ...(type && {type}),
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || 'Không thể tải danh sách tin tức';
    console.log('Lỗi getNewsPaginated:', message);
    throw new Error(message);
  }
};

export const getNewsById = async (id, accessToken) => {
  try {
    const response = await api.get(`/api/news/get-one/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || 'Không thể tải chi tiết tin tức';
    console.log('Lỗi getNewsById:', message);
    throw new Error(message);
  }
};

export const getIntroNews = async accessToken => {
  try {
    const res = await api.get('/api/news/intro', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('new', res.data.data);

    return res.data.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || 'Không thể tải tin tức giới thiệu';
    console.log('Lỗi getIntroNews:', message);
    throw new Error(message);
  }
};
