import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text, StatusBar, FlatList, TouchableOpacity} from 'react-native';
import WalletList from './components/WalletList';
import FruitPriceList from './components/FruitPriceList';
import SearchAndFilterBar from '~/components/SearchAndFilterBar/SearchAndFilterBar';
import styles from './Home.styles';
import {Colors} from '~/theme/theme';
import {useNavigation} from '@react-navigation/core';
import ChatBot from '~/components/ChatBot/ChatBot';
import {scale} from '~/utils/scaling';
import {useSearchAndFilter} from '~/hook/useSearch';
import useWalletData from '~/hook/useWalletData';
import {useQuery} from '@tanstack/react-query';
import {getAllProvinceApii} from '~/api/provinceApi';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    Giá: 'Tất cả',
    Tỉnh: 'Tất cả',
    'Số lượng': 'Tất cả',
  });

  const {data, isLoading} = useWalletData();
  const walletData = useMemo(() => data?.merged || [], [data]);
  const productList = useMemo(() => data?.products || [], [data]);

  console.log('productList', productList);

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

  console.log('filteredWalletData', filteredWalletData);

  const {data: provinceList = []} = useQuery({
    queryKey: ['provinces'],
    queryFn: getAllProvinceApii,
    select: res => res.data,
    staleTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    if (provinceList.length) {
      setProvinceOptions(['Tất cả', ...provinceList.map(p => p.name)]);
    }
  }, [provinceList]);

  const filterOptions = useMemo(
    () => [
      {label: 'Giá', options: ['Tất cả', 'Tăng dần', 'Giảm dần']},
      {label: 'Tỉnh', options: provinceOptions},
      {
        label: 'Số lượng',
        options: ['Tất cả', 'Dưới 100', '100 - 500', 'Trên 500'],
      },
    ],
    [provinceOptions],
  );

  const navigateToWalletAll = useCallback(() => {
    navigation.navigate('NoBottomTab', {
      screen: 'WalletAll',
      params: {
        title: 'Danh sách',
        data: filteredWalletData,
      },
    });
  }, [navigation, filteredWalletData]);

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
            filterOptions={filterOptions}
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
                loading={isLoading}
                data={filteredWalletData.slice(0, 5)}
              />

              <FruitPriceList loading={isLoading} products={productList} />
            </>
          )}
        />

        <ChatBot style={{bottom: scale(100)}} />
      </View>
    </>
  );
};

export default HomeScreen;
