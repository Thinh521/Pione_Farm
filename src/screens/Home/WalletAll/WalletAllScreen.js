import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Background_2 from '../../../components/Background/Background_2';
import WalletList from '../components/WalletList';
import WalletListSkeleton from '../../../components/Skeleton/WalletListSkeleton';
import {FontSizes, FontWeights} from '../../../theme/theme';
import {scale} from '../../../utils/scaling';
import useWalletStore from '~/store/useWalletStore';

const WalletAllScreen = () => {
  const {walletData, loading, fetchWalletData, hasFetched} = useWalletStore();

  useEffect(() => {
    if (!hasFetched) {
      fetchWalletData();
    }
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
              {loading ? (
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
