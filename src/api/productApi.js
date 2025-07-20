import api from './baseApi';

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
    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || 'Không thể tải type sản phẩm';
    console.log('Lỗi khi lấy type sản phẩm:', message);
    throw new Error(message);
  }
};

export const getFarmMarketPrices = async ({
  categoryId,
  provinceId,
  date,
  typeId,
  scope,
} = {}) => {
  try {
    const payload = {};

    if (categoryId) payload.categoryId = categoryId;
    if (provinceId) payload.provinceId = provinceId;
    if (date?.start && date?.end) payload.date = date;
    if (typeId) payload.typeId = typeId;
    if (scope) payload.scope = scope;

    const res = await api.post('/api/statistical/farm-market-price', payload);

    return res.data;
  } catch (error) {
    console.log('[Lỗi đầy đủ]', error?.response?.data);
    const message =
      error?.response?.data?.message || 'Không thể tải giá vườn và giá chợ';
    throw new Error(message);
  }
};

export const getTodayHarvestSummary = async () => {
  try {
    const res = await api.get('/api/statistical/today-harvest-sum');

    return res.data;
  } catch (error) {
    console.log(
      'Lỗi khi lấy sản lượng hôm nay:',
      error?.response?.data || error.message,
    );
    const message =
      error?.response?.data?.message ||
      'Không thể tải dữ liệu sản lượng hôm nay';
    throw new Error(message);
  }
};
