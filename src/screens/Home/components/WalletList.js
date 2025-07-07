import React from 'react';
import {API_BASE_URL} from '@env';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import LineChartWrapper from '../../../components/LineChart/LineChartWrapper';
import {scale} from '../../../utils/scaling';

const WalletItem = ({
  images,
  productName,
  provinceName,
  marketPrice = '0.00',
  priceChange = 0,
  priceTrend = [],
  chartColor = '#10b981',
  gradientId = '#10b981',
}) => {
  const isUp = priceChange > 0;

  return (
    <View style={styles.itemContainer}>
      {/* Left Column */}
      <View style={styles.columnLeft}>
        <FastImage
          source={{uri: `${API_BASE_URL}/api/upload/${images}`}}
          style={styles.image}
        />
        <View style={styles.assetInfo}>
          <Text style={styles.assetName} numberOfLines={1} ellipsizeMode="tail">
            {provinceName}
          </Text>
          <Text
            style={styles.assetSymbol}
            numberOfLines={1}
            ellipsizeMode="tail">
            {productName}
          </Text>
        </View>
      </View>

      {/* Center Column - Chart */}
      <View style={styles.columnCenter}>
        <LineChartWrapper
          data={priceTrend}
          mode="animated"
          height={50}
          width={80}
          lineColor={chartColor}
          gradientColor={gradientId}
          strokeWidth={2}
          showGradient
        />
      </View>

      {/* Right Column - Price */}
      <View style={styles.columnRight}>
        <Text style={styles.price}>${marketPrice}</Text>
        <Text style={[styles.change, {color: isUp ? '#10b981' : '#ef4444'}]}>
          {isUp ? '+' : ''}
          {priceChange}
        </Text>
      </View>
    </View>
  );
};

const WalletList = ({data}) => {
  console.log('data', data);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => `${item.productId || item._productId}`}
        renderItem={({item}) => <WalletItem {...item} />}
        scrollEnabled={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>Không tìm thấy trái cây nào</Text>
            <Text style={styles.emptySub}>Thử từ khóa khác</Text>
          </View>
        }
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
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  assetInfo: {
    flexShrink: 1,
  },
  assetName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    maxWidth: 100,
  },
  assetSymbol: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  change: {
    fontSize: 12,
  },
});

export default WalletList;
