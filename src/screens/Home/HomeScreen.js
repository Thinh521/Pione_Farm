import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar, FlatList, TouchableOpacity} from 'react-native';

import WalletList from './components/WalletList';
import FruitPriceList from './components/FruitPriceList';
import SearchAndFilterBar from '~/components/SearchAndFilterBar/SearchAndFilterBar';

import styles from './Home.styles';
import {Colors} from '~/theme/theme';
import {useNavigation} from '@react-navigation/core';
import useWalletStore from '~/store/useWalletStore';
import ChatBot from '~/components/ChatBot/ChatBot';
import {scale} from '~/utils/scaling';
import {useSearchAndFilter} from '~/hook/useSearch';

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

  const {
    filteredData: filteredWalletData,
    searchKeyword,
    setSearchKeyword,
  } = useSearchAndFilter({
    data: walletData,
    searchableFields: ['productName', 'provinceName', 'typeName'],
    searchKeyword: searchText,
    filters: selectedFilters,
  });

  useEffect(() => {
    if (!hasFetched) {
      fetchWalletData();
    }
  }, []);

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
            searchText={searchKeyword}
            setSearchText={text => {
              setSearchText(text);
              setSearchKeyword(text);
            }}
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
