import {useQuery} from '@tanstack/react-query';
import {getProductPriceStats, getProvinceProducts} from '~/api/homeApi';

const useWalletData = () => {
  return useQuery({
    queryKey: ['walletData'],
    queryFn: async () => {
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

      return {merged, products};
    },
    staleTime: 1000 * 60 * 5,
  });
};

export default useWalletData;
