import React from 'react';
import {API_BASE_URL} from '@env';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import LineChartWrapper from '~/components/LineChart/LineChartWrapper';
import {scale} from '~/utils/scaling';
import {formatCurrencyVND} from '~/utils/format';
import WalletListSkeleton from '~/components/Skeleton/WalletListSkeleton';
import {Colors, FontSizes} from '../../../theme/theme';

const WalletItem = ({
  images,
  productName,
  provinceName,
  price,
  marketPrice = 0,
  priceChange = 0,
  priceTrend = [],
}) => {
  const isIncrease = priceChange > 0;
  const isDecrease = priceChange < 0;

  console.log('price', price);

  const color = isIncrease ? '#34C759' : isDecrease ? '#FF9B9B' : '#FFB229';

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
          {isIncrease ? '+' : ''}
          {formatCurrencyVND(priceChange)}
        </Text>
      </View>
    </View>
  );
};

const WalletList = ({data = [], loading}) => {
  if (loading) {
    return <WalletListSkeleton itemCount={5} />;
  }

  if (data.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyIcon}>🔍</Text>
        <Text style={styles.emptyText}>Không tìm thấy trái cây nào</Text>
        <Text style={styles.emptySub}>Thử từ khóa khác</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => `${item.productId || item._productId}`}
        renderItem={({item}) => <WalletItem {...item} />}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyIcon: {
    fontSize: 28,
    color: '#9ca3af',
  },
  emptyText: {
    color: '#6b7280',
    fontWeight: '500',
    marginTop: 4,
  },
  emptySub: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 2,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#E7E7E7',
    paddingBottom: 12,
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
    fontWeight: '600',
    color: '#1f2937',
    maxWidth: scale(100),
  },
  assetSymbol: {
    fontSize: FontSizes.xsmall,
    color: Colors.gray,
    marginTop: 2,
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  change: {
    fontSize: FontSizes.xsmall,
  },
});

export default WalletList;
