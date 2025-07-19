import api from './baseApi';

export const saveFcmToken = async ({userId, fcmToken}) => {
  try {
    const response = await api.post('/api/user/save-fcm', {
      userId,
      fcmToken,
    });

    console.log('fcm', response.data);

    return response.data;
  } catch (error) {
    console.log('Lỗi khi lưu FCM token:', error);
    throw error?.response?.data || {success: false, message: 'Đã xảy ra lỗi'};
  }
};
