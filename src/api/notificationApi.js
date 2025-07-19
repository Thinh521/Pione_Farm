import api from './baseApi';

export const getNotification = async accessToken => {
  try {
    const res = await api.get('/api/notification', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || 'Không thể tải danh sách danh mục';
    console.log('Lỗi khi lấy danh mục:', message);
    throw new Error(message);
  }
};

export const getFilterNotification = async ({accessToken, filter = {}}) => {
  try {
    const res = await api.post('/api/notification', filter, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('no', res.data);

    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || 'Không thể tải danh sách danh mục';
    console.log('Lỗi khi lấy danh mục:', message);
    throw new Error(message);
  }
};

export const getNotificationDeleteOne = async accessToken => {
  try {
    const res = await api.post('/api/notification/get-note', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || 'Không thể tải danh sách danh mục';
    console.log('Lỗi khi lấy danh mục:', message);
    throw new Error(message);
  }
};

export const getNotificationPendingNote = async accessToken => {
  try {
    const res = await api.get('/api/notification/get-pending-note', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || 'Không thể tải danh sách danh mục';
    console.log('Lỗi khi lấy danh mục:', message);
    throw new Error(message);
  }
};
