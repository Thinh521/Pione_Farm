import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, StatusBar, ActivityIndicator, FlatList} from 'react-native';

import WalletList from './components/WalletList';
import FruitPriceList from './components/FruitPriceList';
import SearchAndFilterBar from '../../components/SearchAndFilterBar/SearchAndFilterBar';

import styles from './Home.styles';
import {Colors} from '../../theme/theme';
import {getProductPriceStats, getProvinceProducts} from '~/api/homeApi';

const FILTER_OPTIONS = [
  {
    label: 'Giá',
    options: ['Tất cả', 'Tăng dần', 'Giảm dần'],
  },
  {
    label: 'Tỉnh',
    options: ['Tất cả', 'Long An', 'Tiền Giang', 'HCM', 'Hà Nội', 'An Giang'],
  },
  {
    label: 'Số lượng',
    options: ['Tất cả', 'Dưới 100', '100 - 500', 'Trên 500'],
  },
];

const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    Giá: 'Tất cả',
    Tỉnh: 'Tất cả',
    'Số lượng': 'Tất cả',
  });
  const [walletData, setWalletData] = useState([]);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getProvinceProducts();
        const products = res?.data || [];
        setProductList(products);

        const productIds = products.map(p => p.productId || p._id);

        const provinceId = products.map(p => p.provinceId || p._id);

        const priceRes = await getProductPriceStats(productIds, provinceId);
        const stats = priceRes?.data || [];

        const merged = products.map(p => {
          const match = stats.find(
            s => s.productId === p.productId || s.productId === p._id,
          );
          return {...p, ...match};
        });

        setWalletData(merged);
      } catch (err) {
        console.log('Lỗi khi tải dữ liệu:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredWalletData = useMemo(() => {
    let data = [...walletData];

    // Search
    if (searchText.trim()) {
      const keyword = searchText.toLowerCase();
      data = data.filter(
        item =>
          item.name?.toLowerCase().includes(keyword) ||
          item.symbol?.toLowerCase().includes(keyword),
      );
    }

    // Sort by price
    const priceFilter = selectedFilters['Giá'];
    if (priceFilter === 'Tăng dần' || priceFilter === 'Giảm dần') {
      data.sort((a, b) => {
        const priceA = parseFloat((a.price || '0').replace(/,/g, ''));
        const priceB = parseFloat((b.price || '0').replace(/,/g, ''));
        return priceFilter === 'Tăng dần' ? priceA - priceB : priceB - priceA;
      });
    }

    // Filter by province
    const province = selectedFilters['Tỉnh'];
    if (province !== 'Tất cả') {
      data = data.filter(
        item => item.province === province || item.name === province,
      );
    }

    // Filter by quantity
    const quantity = selectedFilters['Số lượng'];
    if (quantity !== 'Tất cả') {
      data = data.filter(item => {
        const qty = item.quantity || 0;
        if (quantity === 'Dưới 100') return qty < 100;
        if (quantity === '100 - 500') return qty >= 100 && qty <= 500;
        return qty > 500;
      });
    }

    return data;
  }, [searchText, selectedFilters, walletData]);

  if (loading) {
    return <ActivityIndicator size="large" style={{marginTop: 50}} />;
  }

  return (
    <>
      <StatusBar backgroundColor={Colors.headerBack} barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <SearchAndFilterBar
            searchText={searchText}
            setSearchText={setSearchText}
            filterOptions={FILTER_OPTIONS}
            showProductButton={false}
            placeholder="Tìm kiếm trái cây"
            onFilterSelect={(type, value) =>
              setSelectedFilters(prev => ({...prev, [type]: value}))
            }
          />
        </View>

        <FlatList
          data={[{}]}
          keyExtractor={(_, index) => index.toString()}
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          renderItem={() => (
            <>
              <Text style={styles.title}>Danh sách</Text>
              <WalletList data={filteredWalletData} />
              <FruitPriceList products={productList} />
            </>
          )}
        />
      </View>
    </>
  );
};

export default HomeScreen;
