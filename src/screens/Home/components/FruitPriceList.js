import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Input from '../../../components/ui/Input/InputComponents';
import {SearchIcon} from '../../../assets/icons/Icons';
import {scale} from '../../../utils/scaling';
import {Colors, FontSizes, FontWeights} from '../../../theme/theme';

const fruitData = [
  {name: 'Cam sành loại 1', price: 5000},
  {name: 'Cam sành loại 2', price: 3000},
  {name: 'Quýt đường loại 1', price: 40000},
  {name: 'Bưởi Năm Roi loại 1', price: 25000},
  {name: 'Bưởi Năm Roi loại 2', price: 15000},
  {name: 'Xoài cát Hòa Lộc loại 1', price: 25000},
  {name: 'Xoài Cát Chu loại 1', price: 20000},
  {name: 'Dưa hấu loại 1', price: 10000},
  {name: 'Thanh Long ruột trắng loại 1', price: 8000},
  {name: 'Chôm chôm Java loại 1', price: 28000},
  {name: 'Chôm chôm Thái loại 1', price: 45000},
  {name: 'Chôm chôm đường', price: 50000},
  {name: 'Nhãn tiêu da bò loại 1', price: 25000},
  {name: 'Sầu riêng cơm vàng hạt lép', price: 50000},
];

const FruitPriceList = () => {
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const filteredFruits = useMemo(
    () =>
      fruitData.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()),
      ),
    [searchText],
  );

  const limitedFruits = useMemo(
    () => filteredFruits.slice(0, 6),
    [filteredFruits],
  );

  useEffect(() => {
    setIsSearching(true);
    const delayDebounce = setTimeout(() => {
      setIsSearching(false);
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [searchText]);

  const renderItem = ({item}) => (
    <View style={styles.row}>
      <View style={styles.nameCol}>
        <Text style={styles.itemName}>{item.name}</Text>
      </View>
      <View style={styles.unitCol}>
        <Text style={styles.unit}>đ/Kg</Text>
      </View>
      <View style={styles.priceCol}>
        <Text style={styles.price}>{item.price.toLocaleString('vi-VN')}</Text>
        <Text style={styles.currency}>VNĐ</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bảng Giá Mặt Hàng Trái Cây </Text>
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

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.headerText, {flex: 6}]}>Tên Mặt Hàng</Text>
        <Text style={[styles.headerText, {flex: 3, textAlign: 'center'}]}>
          Đơn Vị Tính
        </Text>
        <Text style={[styles.headerText, {flex: 3, textAlign: 'right'}]}>
          Giá Tại Chợ
        </Text>
      </View>

      {isSearching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={Colors.green} />
        </View>
      ) : (
        <FlatList
          data={limitedFruits}
          renderItem={renderItem}
          keyExtractor={item => item.name}
          initialNumToRender={6}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>🔍</Text>
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
    color: '#374151',
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
    color: '#1f2937',
    fontSize: FontSizes.small,
    fontWeight: FontWeights.regular,
  },
  unit: {
    fontSize: FontSizes.small,
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
    paddingVertical: scale(24),
  },
  emptyIcon: {
    fontSize: 28,
  },
  emptyText: {
    color: '#6b7280',
    fontWeight: FontWeights.semiBold,
    marginTop: scale(8),
  },
  emptySub: {
    color: '#9ca3af',
    fontSize: FontSizes.xsmall,
    marginTop: scale(4),
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
