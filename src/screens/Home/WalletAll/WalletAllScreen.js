import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Background_2 from '../../../components/Background/Background_2';
import {FontSizes, FontWeights} from '../../../theme/theme';
import {scale} from '../../../utils/scaling';
import WalletList from '../components/WalletList';
import {getProductPriceStats, getProvinceProducts} from '../../../api/homeApi';
import WalletListSkeleton from '../../../components/Skeleton/WalletListSkeleton';

const WalletAllScreen = () => {
  const [walletData, setWalletData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log('walletData', walletData);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

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
          return {
            ...p,
            ...match,
          };
        });

        setWalletData(merged);
      } catch (err) {
        console.log('Lỗi khi tải dữ liệu:', err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Background_2 />

      <View style={styles.container}>
        <FlatList
          data={[{}]}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.scrollContainer}
          renderItem={() => (
            <>
              <Text style={styles.title}>Danh sách</Text>

              {isLoading ? (
                <WalletListSkeleton itemCount={10} />
              ) : (
                <WalletList data={walletData} />
              )}
            </>
          )}
        />
      </View>
    </>
  );
};

export default WalletAllScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
  },
  scrollContainer: {
    marginTop: scale(20),
  },
  title: {
    marginBottom: scale(16),
    fontSize: FontSizes.xlarge,
    fontWeight: FontWeights.semiBold,
  },
});
