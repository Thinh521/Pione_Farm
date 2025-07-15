import {create} from 'zustand';
import {getAccessToken} from '../utils/storage/tokenStorage';
import {getNewsList} from '../api/newsApi';

const useNewsStore = create(set => ({
  newsData: [],
  loading: false,
  error: null,
  hasFetched: false,

  fetchNewsData: async (type = null) => {
    set({loading: true, error: null});

    try {
      const accessToken = await getAccessToken();
      let allNews = [];
      let page = 1;
      let totalPages = 1;

      do {
        const res = await getNewsList(page, type, accessToken);
        const items = res?.data?.items || [];
        totalPages = res?.data?.totalPages || 1;

        allNews = [...allNews, ...items];
        page++;
      } while (page <= totalPages);

      set({
        newsData: allNews,
        loading: false,
        hasFetched: true,
      });
    } catch (err) {
      set({
        error: err.message || 'Đã xảy ra lỗi khi tải dữ liệu.',
        loading: false,
        hasFetched: false,
      });
      console.log('Lỗi fetchNewsData:', err.message);
    }
  },
}));

export default useNewsStore;
