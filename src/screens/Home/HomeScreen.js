import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, StatusBar, FlatList, TouchableOpacity} from 'react-native';

import WalletList from './components/WalletList';
import FruitPriceList from './components/FruitPriceList';
import SearchAndFilterBar from '~/components/SearchAndFilterBar/SearchAndFilterBar';

import styles from './Home.styles';
import {Colors} from '../../theme/theme';
import {useNavigation} from '@react-navigation/core';
import useWalletStore from '~/store/useWalletStore';
import WalletListSkeleton from '../../components/Skeleton/WalletListSkeleton';
import ChatBot from '../../components/ChatBot/ChatBot';
import {scale} from '../../utils/scaling';
import {removeVietnameseTones} from '../../utils/normalize';

const FILTER_OPTIONS = [
  {label: 'Giá', options: ['Tất cả', 'Tăng dần', 'Giảm dần']},
  {
    label: 'Tỉnh',
    options: ['Tất cả', 'Long An', 'Tiền Giang', 'HCM', 'Hà Nội', 'An Giang'],
  },
  {label: 'Số lượng', options: ['Tất cả', 'Dưới 100', '100 - 500', 'Trên 500']},
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    Giá: 'Tất cả',
    Tỉnh: 'Tất cả',
    'Số lượng': 'Tất cả',
  });

  const {walletData, productList, loading, fetchWalletData, hasFetched} =
    useWalletStore();

  console.log('walletData', walletData);

  useEffect(() => {
    if (!hasFetched) {
      fetchWalletData();
    }
  }, []);

  const filteredWalletData = useMemo(() => {
    let data = [...walletData];

    if (searchText.trim()) {
      const keyword = removeVietnameseTones(searchText);
      data = data.filter(item => {
        const productName = removeVietnameseTones(item.productName) || '';
        const provinceName = removeVietnameseTones(item.provinceName) || '';
        const typeName = removeVietnameseTones(item.typeName) || '';

        return (
          productName.includes(keyword) ||
          provinceName.includes(keyword) ||
          typeName.includes(keyword)
        );
      });
    }

    const priceFilter = selectedFilters['Giá'];
    if (priceFilter === 'Tăng dần' || priceFilter === 'Giảm dần') {
      data.sort((a, b) => {
        const priceA = parseFloat(
          (a.marketPrice || '0').toString().replace(/,/g, ''),
        );
        const priceB = parseFloat(
          (b.marketPrice || '0').toString().replace(/,/g, ''),
        );
        return priceFilter === 'Tăng dần' ? priceA - priceB : priceB - priceA;
      });
    }

    const province = selectedFilters['Tỉnh'];
    if (province !== 'Tất cả') {
      data = data.filter(item => item.provinceName === province);
    }

    const quantity = selectedFilters['Số lượng'];
    if (quantity !== 'Tất cả') {
      data = data.filter(item => {
        const qty = parseFloat(item.quantity || 0);
        if (quantity === 'Dưới 100') return qty < 100;
        if (quantity === '100 - 500') return qty >= 100 && qty <= 500;
        return qty > 500;
      });
    }

    return data;
  }, [searchText, selectedFilters, walletData]);

  const navigateToWalletAll = () => {
    navigation.navigate('NoBottomTab', {
      screen: 'WalletAll',
      params: {
        title: 'Danh sách',
        data: filteredWalletData,
      },
    });
  };

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
            selectedFilters={selectedFilters}
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
              <View style={styles.box}>
                <Text style={styles.title}>Danh sách</Text>
                <TouchableOpacity
                  style={styles.buttonMore}
                  onPress={navigateToWalletAll}>
                  <Text>Xem tất cả</Text>
                </TouchableOpacity>
              </View>

              <WalletList
                loading={loading}
                data={filteredWalletData.slice(0, 5)}
              />

              <FruitPriceList loading={loading} products={productList} />
            </>
          )}
        />

        <ChatBot style={{bottom: scale(100)}} />
      </View>
    </>
  );
};

export default HomeScreen;
