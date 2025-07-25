import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Background_2 from '~/components/Background/Background_2';
import WalletList from '../components/WalletList';
import WalletListSkeleton from '~/components/Skeleton/WalletListSkeleton';
import {FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';
import {useRoute} from '@react-navigation/core';
import useWalletData from '~/hook/useWalletData';

const WalletAllScreen = () => {
  const {data: routeData, title: routeTitle} = useRoute().params || {};

  const {data, isLoading} = useWalletData();
  const mergedData = data?.merged || [];

  const displayData = routeData || mergedData;
  const displayTitle = routeTitle || 'Danh sách';

  return (
    <>
      <Background_2 />
      <View style={styles.container}>
        <FlatList
          data={[{}]}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          renderItem={() => (
            <>
              <Text style={styles.title}>{displayTitle}</Text>
              {isLoading && !routeData ? (
                <WalletListSkeleton itemCount={10} />
              ) : (
                <WalletList data={displayData} />
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
    paddingBottom: scale(40),
  },
  title: {
    marginBottom: scale(16),
    fontSize: FontSizes.xlarge,
    fontWeight: FontWeights.semiBold,
  },
});
