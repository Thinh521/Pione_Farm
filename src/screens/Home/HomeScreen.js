import React, {useCallback, useMemo, useState} from 'react';
import {View, Text, StatusBar, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import WalletList from './components/WalletList';
import FruitPriceList from './components/FruitPriceList';
import SearchAndFilterBar from '~/components/SearchAndFilterBar/SearchAndFilterBar';
import ChatBot from '~/components/ChatBot/ChatBot';
import useWalletData from '~/hook/useWalletData';
import useProvince from '~/hook/useProvince';
import {useSearchAndFilter} from '~/hook/useSearch';
import styles from './Home.styles';
import {Colors} from '~/theme/theme';
import {scale} from '~/utils/scaling';
import Button from '../../components/ui/Button/ButtonComponent';
import ProposeScreen from '../Propose/ProposeScreen';

const HomeScreen = () => {
  const navigation = useNavigation();

  const [selectedFilters, setSelectedFilters] = useState({
    Giá: 'Tất cả',
    Tỉnh: 'Tất cả',
    'Số lượng': 'Tất cả',
  });

  const {data, isLoading, error} = useWalletData();
  const {provinceOptions} = useProvince();

  const walletData = useMemo(() => data?.merged || [], [data]);
  const productList = useMemo(() => data?.products || [], [data]);

  const {
    filteredData: filteredWalletData,
    searchKeyword,
    setSearchKeyword,
  } = useSearchAndFilter({
    data: walletData,
    searchableFields: ['productName', 'provinceName', 'typeName'],
    filters: selectedFilters,
  });

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
            setSearchText={setSearchKeyword}
            filterOptions={filterOptions}
            selectedFilters={selectedFilters}
            placeholder="Tìm kiếm trái cây"
            showProductButton={false}
            onFilterSelect={(type, value) =>
              setSelectedFilters(prev => ({...prev, [type]: value}))
            }
          />
        </View>

        <FlatList
          data={[1]}
          keyExtractor={(_, index) => index.toString()}
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          renderItem={() => (
            <>
              <View style={styles.box}>
                <Text style={styles.title}>Danh sách</Text>
                <TouchableOpacity onPress={navigateToWalletAll}>
                  <Text>Xem tất cả</Text>
                </TouchableOpacity>
              </View>

              <WalletList
                loading={isLoading}
                error={error}
                data={filteredWalletData.slice(0, 5)}
              />

              <ProposeScreen />

              <FruitPriceList
                loading={isLoading}
                error={error}
                products={productList}
              />
            </>
          )}
        />

        <ChatBot style={{bottom: scale(100)}} />
      </View>
    </>
  );
};

export default HomeScreen;
