import axios from 'axios';
import {API_BASE_URL} from '@env';
import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
  saveTokens,
} from '../utils/storage/tokenStorage';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Hàm gọi API để refresh accessToken
const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken || typeof refreshToken !== 'string') {
    throw new Error('Không có refreshToken hợp lệ');
  }

  const res = await axios.post(
    `${API_BASE_URL}/api/authentication/refresh-token`,
    {
      refreshToken,
    },
  );

  const newAccessToken = res.data.accessToken;
  console.log('newAccessToken', newAccessToken);
  saveTokens(newAccessToken, refreshToken);
  return newAccessToken;
};

// Interceptor để tự động attach token và xử lý token hết hạn
api.interceptors.request.use(
  async config => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

let isRefreshing = false;
let failedQueue = [];

// Xử lý queue các request chờ token mới
const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Interceptor để xử lý response lỗi 401 (token hết hạn)
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({resolve, reject});
        })
          .then(token => {
            originalRequest.headers.Authorization = 'Bearer ' + token;
            return axios(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = 'Bearer ' + newAccessToken;
        processQueue(null, newAccessToken);
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        removeTokens();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
