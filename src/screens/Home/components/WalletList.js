import {API_BASE_URL} from '@env';
import FastImage from 'react-native-fast-image';
import React, {memo, useMemo, useCallback} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import LineChartWrapper from '~/components/LineChart/LineChartWrapper';
import WalletListSkeleton from '~/components/Skeleton/WalletListSkeleton';
import ErrorView from '~/components/ErrorView/ErrorView';
import {scale} from '~/utils/scaling';
import {formatCurrencyVND} from '~/utils/format';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import SearchEmpty from '../../../components/SearchLoading/SearchEmpty';

const WalletItem = memo(
  ({
    images,
    productName,
    provinceName,
    price,
    marketPrice = 0,
    priceChange = 0,
    priceTrend = [],
  }) => {
    const color = useMemo(() => {
      if (priceChange > 0) return '#34C759';
      if (priceChange < 0) return '#FF9B9B';
      return '#FFB229';
    }, [priceChange]);

    return (
      <View style={styles.itemContainer}>
        <View style={styles.columnLeft}>
          <FastImage
            source={{uri: `${API_BASE_URL}/api/upload/${images}`}}
            style={styles.image}
          />
          <View style={styles.assetInfo}>
            <Text style={styles.assetName} numberOfLines={1}>
              {provinceName}
            </Text>
            <Text style={styles.assetSymbol} numberOfLines={1}>
              {productName}
            </Text>
          </View>
        </View>

        <View style={styles.columnCenter}>
          <LineChartWrapper
            data={priceTrend}
            mode="animated"
            height={50}
            width={80}
            lineColor={color}
            gradientColor={color}
            strokeWidth={2}
            showGradient
          />
        </View>

        <View style={styles.columnRight}>
          <Text style={styles.price}>
            {formatCurrencyVND(
              marketPrice && marketPrice > 0 ? marketPrice : price ?? 0,
            )}
          </Text>
          <Text style={[styles.change, {color}]}>
            {priceChange > 0 ? '+' : ''}
            {formatCurrencyVND(priceChange)}
          </Text>
        </View>
      </View>
    );
  },
);

const WalletList = ({data = [], loading, error}) => {
  const renderItem = useCallback(({item}) => <WalletItem {...item} />, []);

  if (loading) {
    return <WalletListSkeleton itemCount={5} />;
  }

  if (error) {
    return <ErrorView />;
  }

  return (
    <FlatList
      data={data}
      keyExtractor={item => `${item.productId || item._productId}`}
      renderItem={renderItem}
      scrollEnabled={false}
      initialNumToRender={5}
      removeClippedSubviews
      ListEmptyComponent={() => <SearchEmpty />}
      contentContainerStyle={
        data.length === 0 ? styles.emptyContainer : undefined
      }
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#E7E7E7',
    paddingBottom: scale(14),
  },
  columnLeft: {
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  columnCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  columnRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  image: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(999),
    marginRight: scale(8),
  },
  assetInfo: {
    flexShrink: 1,
  },
  assetName: {
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
    color: Colors.title,
    maxWidth: scale(100),
  },
  assetSymbol: {
    fontSize: FontSizes.xsmall,
    color: Colors.gray,
    marginTop: scale(4),
  },
  price: {
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
    color: Colors.title,
    marginBottom: scale(4),
  },
  change: {
    fontSize: FontSizes.xsmall,
  },
});

export default WalletList;
