import {useQuery} from '@tanstack/react-query';
import {getProductPriceStats, getProvinceProducts} from '~/api/homeApi';

const useWalletData = () => {
  return useQuery({
    queryKey: ['walletData'],
    queryFn: async () => {
      const res = await getProvinceProducts();
      const products = res?.data || [];

      const topProducts = products.slice(0, 5);

      const productIds = topProducts.map(p => p.productId || p._id);
      const provinceIds = topProducts.map(p => p.provinceId || p._id);

      const priceRes = await getProductPriceStats(productIds, provinceIds);

      const stats = priceRes?.data || [];

      const merged = topProducts.map(p => {
        const match = stats.find(
          s => s.productId === p.productId || s.productId === p._id,
        );
        return {...p, ...match};
      });

      return {merged, products: topProducts};
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export default useWalletData;
