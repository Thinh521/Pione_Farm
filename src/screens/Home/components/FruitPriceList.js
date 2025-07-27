import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {SearchIcon} from '~/assets/icons/Icons';
import Input from '~/components/ui/Input/InputComponents';
import FruitPriceListSkeleton from '~/components/Skeleton/FruitPriceListSkeleton';
import ErrorView from '~/components/ErrorView/ErrorView';
import {removeVietnameseTones} from '~/utils/normalize';
import {scale} from '~/utils/scaling';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';

const FruitPriceList = ({products = [], loading, error}) => {
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const filteredFruits = useMemo(() => {
    const keyword = removeVietnameseTones(searchText);

    return products.filter(item =>
      removeVietnameseTones(item.productName || '').includes(keyword),
    );
  }, [searchText, products]);

  useEffect(() => {
    if (!searchText) return setIsSearching(false);
    setIsSearching(true);
    const timer = setTimeout(() => setIsSearching(false), 500);
    return () => clearTimeout(timer);
  }, [searchText]);

  const renderItem = ({item}) => (
    <View style={styles.row}>
      <View style={styles.nameCol}>
        <Text style={styles.itemName} numberOfLines={1}>
          {item.productName}
        </Text>
      </View>
      <View style={styles.unitCol}>
        <Text style={styles.unit}>VNĐ/kg</Text>
      </View>
      <View style={styles.priceCol}>
        <Text style={styles.price}>
          {(item.marketPrice || 0).toLocaleString('vi-VN')}
        </Text>
        <Text style={styles.currency}>VNĐ</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bảng Giá Mặt Hàng Trái Cây</Text>
        <Text style={styles.subtitle}>Cập nhật giá cả mới nhất tại chợ</Text>
      </View>

      <View style={styles.searchContainer}>
        <Input
          placeholder="Tìm kiếm tên trái cây..."
          value={searchText}
          rightIcon={SearchIcon}
          onChangeText={setSearchText}
          placeholderTextColor="#888"
          inputStyle={styles.searchInput}
          containerStyle={styles.search}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.dot} />
        <Text style={styles.footerText}>
          Tổng cộng:{' '}
          <Text style={styles.footerCount}>{filteredFruits.length}</Text> mặt
          hàng
        </Text>
      </View>

      <View style={styles.tableHeader}>
        <Text style={[styles.headerText, {flex: 6}]}>Tên Mặt Hàng</Text>
        <Text style={[styles.headerText, {flex: 3, textAlign: 'center'}]}>
          Đơn Vị Tính
        </Text>
        <Text style={[styles.headerText, {flex: 3, textAlign: 'right'}]}>
          Giá Tại Chợ
        </Text>
      </View>

      {loading ? (
        <FruitPriceListSkeleton itemCount={10} />
      ) : error ? (
        <ErrorView />
      ) : isSearching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={Colors.green} />
        </View>
      ) : (
        <FlatList
          data={filteredFruits}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.productId}_${index}`}
          initialNumToRender={6}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyText}>Không tìm thấy trái cây nào</Text>
              <Text style={styles.emptySub}>Thử từ khóa khác</Text>
            </View>
          }
          style={styles.list}
        />
      )}
    </View>
  );
};

export default FruitPriceList;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.green,
    borderRadius: scale(16),
    padding: scale(16),
    marginBottom: scale(16),
  },
  title: {
    color: Colors.white,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
    textAlign: 'center',
  },
  subtitle: {
    color: '#dcfce7',
    fontSize: FontSizes.small,
    textAlign: 'center',
    marginTop: scale(4),
  },
  search: {
    backgroundColor: '#f0fdf4',
    borderRadius: 999,
    borderColor: '#d1fae5',
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    color: '#111827',
    fontSize: FontSizes.medium,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: scale(8),
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 2,
    marginBottom: scale(4),
  },
  headerText: {
    color: Colors.title,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: scale(10),
    borderBottomColor: '#f3f4f6',
    borderBottomWidth: 1,
  },
  nameCol: {
    flex: 6,
  },
  unitCol: {
    flex: 3,
    alignItems: 'center',
  },
  priceCol: {
    flex: 3,
    alignItems: 'flex-end',
  },
  itemName: {
    color: Colors.title,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.regular,
  },
  unit: {
    fontWeight: FontWeights.semiBold,
    fontSize: FontSizes.xsmall,
    backgroundColor: '#dbeafe',
    color: '#1e3a8a',
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: 9999,
    overflow: 'hidden',
  },
  price: {
    color: Colors.green,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
  },
  currency: {
    color: '#6b7280',
    fontSize: FontSizes.xsmall,
  },
  list: {
    marginTop: scale(4),
  },
  empty: {
    alignItems: 'center',
    paddingVertical: scale(50),
  },
  emptyText: {
    color: Colors.title,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.medium,
  },
  emptySub: {
    color: Colors.grayText_3,
    fontSize: FontSizes.small,
    marginTop: scale(2),
  },
  footer: {
    marginBlock: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: Colors.white,
    paddingHorizontal: scale(16),
    paddingVertical: scale(6),
    borderRadius: 99999,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dot: {
    width: scale(8),
    height: scale(8),
    backgroundColor: Colors.green,
    borderRadius: 9999,
    marginRight: scale(8),
  },
  footerText: {
    fontSize: FontSizes.small,
  },
  footerCount: {
    color: Colors.green,
    fontWeight: FontWeights.bold,
  },
  loadingContainer: {
    marginTop: scale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
