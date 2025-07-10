import {create} from 'zustand';
import {getProductPriceStats, getProvinceProducts} from '~/api/homeApi';

const useWalletStore = create(set => ({
  walletData: [],
  productList: [],
  loading: false,
  hasFetched: false,

  fetchWalletData: async () => {
    set({loading: true});
    try {
      const res = await getProvinceProducts();
      const products = res?.data || [];

      const productIds = products.map(p => p.productId || p._id);
      const provinceIds = products.map(p => p.provinceId || p._id);

      const priceRes = await getProductPriceStats(productIds, provinceIds);
      const stats = priceRes?.data || [];

      const merged = products.map(p => {
        const match = stats.find(
          s => s.productId === p.productId || s.productId === p._id,
        );
        return {...p, ...match};
      });

      set({
        walletData: merged,
        productList: products,
        hasFetched: true,
      });
    } catch (err) {
      console.log('Lỗi khi fetch:', err.message);
    } finally {
      set({loading: false});
    }
  },
}));

export default useWalletStore;
