import React, {useEffect, useMemo, useState, useCallback} from 'react';
import {FlatList, Text, View, TouchableOpacity} from 'react-native';
import styles from './Trend.styles';
import SearchAndFilterBar from '~/components/SearchAndFilterBar/SearchAndFilterBar';
import WalletList from '../Home/components/WalletList';
import WalletListSkeleton from '~/components/Skeleton/WalletListSkeleton';
import {scale} from '~/utils/scaling';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {useSearchAndFilter} from '~/hook/useSearch';
import useProvince from '~/hook/useProvince';
import {getTrendAll} from '~/api/trendApi';
import ErrorView from '~/components/ErrorView/ErrorView';
import SearchEmpty from '~/components/SearchLoading/SearchEmpty';
import useDebouncedSearching from '~/hook/useDebouncedSearching';
import SearchLoading from '~/components/SearchLoading/SearchLoading';

const INITIAL_COUNT = 7;
const LOAD_MORE_COUNT = 7;

const TrendScreen = () => {
  const navigation = useNavigation();
  const [selectedFilters, setSelectedFilters] = useState({});
  const [date, setDate] = useState(null);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const {provinceList} = useProvince();

  const {
    data: trendList = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['trend-data', date],
    queryFn: () => getTrendAll(date),
    staleTime: 10 * 60 * 1000,
    select: res => res.data,
    onSuccess: () => {
      setVisibleCount(INITIAL_COUNT);
    },
  });

  useEffect(() => {
    if (provinceList.length) {
      setProvinceOptions(['Tất cả', ...provinceList.map(p => p.name)]);
    }
  }, [provinceList]);

  const {
    filteredData: filteredTrendList,
    searchKeyword,
    setSearchKeyword,
  } = useSearchAndFilter({
    data: trendList,
    searchableFields: ['productName', 'provinceName'],
    filters: selectedFilters,
  });

  const isSearching = useDebouncedSearching(searchKeyword);

  const visibleItems = useMemo(() => {
    return filteredTrendList.slice(0, visibleCount);
  }, [filteredTrendList, visibleCount]);

  const handleFilterSelect = useCallback((type, value) => {
    setSelectedFilters(prev => ({...prev, [type]: value}));

    if (type === 'Ngày') {
      if (value) {
        const [day, month, year] = value.split('/');
        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(
          2,
          '0',
        )}`;
        setDate(formattedDate);
      } else {
        setDate(null);
      }
    }
  }, []);

  const handleLoadMore = () => {
    if (visibleCount < filteredTrendList.length && !isLoadingMore) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setVisibleCount(prev => prev + LOAD_MORE_COUNT);
        setIsLoadingMore(false);
      }, 500);
    }
  };

  const navigateToWalletAll = useCallback(() => {
    navigation.navigate('NoBottomTab', {
      screen: 'WalletAll',
      params: {
        title: 'Xu hướng',
        data: trendList,
      },
    });
  }, [navigation, trendList]);

  const filterOptions = useMemo(() => {
    return [
      {label: 'Ngày', options: []},
      {label: 'Tỉnh', options: provinceOptions},
      {label: 'Giá', options: ['Tất cả', 'Tăng dần', 'Giảm dần']},
    ];
  }, [provinceOptions]);

  const renderHeader = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.headerTitle}>
          <Text style={styles.title}>Xu hướng</Text>
        </View>
        <TouchableOpacity
          onPress={navigateToWalletAll}
          style={styles.seeMoreButton}>
          <Text style={styles.seeMoreText}>Xem Tất cả</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFooter = () => {
    if (isLoading) return <WalletListSkeleton itemCount={7} />;
    if (isError) return <ErrorView />;
    if (visibleItems.length === 0) return <SearchEmpty />;
    if (isLoadingMore) return <WalletListSkeleton itemCount={3} />;
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchAndFilterBar
          searchText={searchKeyword}
          setSearchText={setSearchKeyword}
          filterOptions={filterOptions}
          selectedFilters={selectedFilters}
          showProductButton={false}
          placeholder="Tìm kiếm thông tin"
          onFilterSelect={handleFilterSelect}
        />
      </View>

      {isSearching ? (
        <SearchLoading />
      ) : (
        <FlatList
          data={visibleItems}
          keyExtractor={(item, index) => item._id || index.toString()}
          renderItem={({item}) => <WalletList data={[item]} />}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: scale(80)}}
        />
      )}
    </View>
  );
};

export default React.memo(TrendScreen);
