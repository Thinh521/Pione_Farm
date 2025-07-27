import React, {memo, useMemo, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import styles from './Market.styles';
import SearchAndFilterBar from '~/components/SearchAndFilterBar/SearchAndFilterBar';
import FruitPriceList from '../components/FruitPriceList';
import {scale} from '~/utils/scaling';
import ChatBot from '~/components/ChatBot/ChatBot';
import {useHarvestFilter} from '~/hook/useHarvestFilter';
import FruitPriceListSkeleton from '~/components/Skeleton/FruitPriceListSkeleton';
import ErrorView from '~/components/ErrorView/ErrorView';

const MarketScreen = () => {
  const [searchText, setSearchText] = useState('');

  const {
    fruitCategory,
    provinceOptions,
    selectedFilters,
    handleFilterSelect,
    collectionAndYieldData,
    isLoading,
    isError,
  } = useHarvestFilter();

  const FILTER_OPTIONS = useMemo(() => {
    return [
      {
        label: 'Xuất xứ',
        options: ['Tất cả', 'Trong nước', 'Ngoài nước'],
      },
      {
        label: 'Trái cây',
        options: ['Tất cả', ...fruitCategory.map(item => item.name)],
      },
      {
        label: 'Tỉnh',
        options: provinceOptions,
      },
    ];
  }, [fruitCategory, provinceOptions]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchAndFilterBar
          selectedFilters={selectedFilters}
          searchText={searchText}
          setSearchText={setSearchText}
          filterOptions={FILTER_OPTIONS}
          placeholder="Tìm kiếm thị trường"
          onFilterSelect={handleFilterSelect}
        />
      </View>

      <FlatList
        data={[{}]}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={() => (
          <View style={styles.main}>
            <Text style={styles.title}>Bảng giá Xoài</Text>

            {isError ? (
              <ErrorView />
            ) : isLoading ? (
              <FruitPriceListSkeleton itemCount={5} />
            ) : (
              <FlatList
                data={collectionAndYieldData.slice(0, 5)}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item}) => (
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
                )}
              />
            )}

            <View style={{marginTop: scale(16)}}>
              <FruitPriceList
                loading={isLoading}
                error={isError}
                products={collectionAndYieldData}
              />
            </View>
          </View>
        )}
        contentContainerStyle={{paddingBottom: scale(40)}}
      />

      <ChatBot style={{bottom: scale(40)}} />
    </View>
  );
};

export default memo(MarketScreen);
