import React, {useEffect, useMemo, useState, useCallback} from 'react';
import {ScrollView, Text, View, TouchableOpacity} from 'react-native';
import styles from './Trend.styles';
import SearchAndFilterBar from '~/components/SearchAndFilterBar/SearchAndFilterBar';
import WalletList from '../Home/components/WalletList';
import WalletListSkeleton from '~/components/Skeleton/WalletListSkeleton';
import {scale} from '~/utils/scaling';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {Flame} from 'lucide-react-native';
import {useQuery} from '@tanstack/react-query';
import {useSearchAndFilter} from '~/hook/useSearch';
import useProvince from '~/hook/useProvince';
import {getTrendAll} from '~/api/trendApi';

const INITIAL_COUNT = 7;
const LOAD_MORE_COUNT = 7;

const TrendScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [date, setDate] = useState(null);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  console.log('date', date);

  const {data: trendList = [], isLoading} = useQuery({
    queryKey: ['trend-data', date],
    queryFn: () => getTrendAll(date),
    staleTime: 10 * 60 * 1000,
    select: res => res.data,
    onSuccess: () => {
      setVisibleCount(INITIAL_COUNT);
    },
  });

  const {provinceList} = useProvince();

  const {
    filteredData: filteredTrendList,
    searchKeyword,
    setSearchKeyword,
  } = useSearchAndFilter({
    data: trendList,
    searchableFields: ['productName', 'provinceName'],
    searchKeyword: searchText,
    filters: selectedFilters,
  });

  const visibleItems = useMemo(() => {
    return filteredTrendList.slice(0, visibleCount);
  }, [filteredTrendList, visibleCount]);

  const handleScroll = event => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isCloseToBottom && visibleCount < filteredTrendList.length) {
      setVisibleCount(prev => prev + LOAD_MORE_COUNT);
    }
  };

  useEffect(() => {
    if (provinceList.length) {
      setProvinceOptions(['Tất cả', ...provinceList.map(p => p.name)]);
    }
  }, [provinceList]);

  const filterOptions = useMemo(() => {
    return [
      {label: 'Ngày', options: []},
      {label: 'Tỉnh', options: provinceOptions},
      {label: 'Giá', options: ['Tất cả', 'Tăng dần', 'Giảm dần']},
    ];
  }, [provinceOptions]);

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

  const navigateToWalletAll = useCallback(() => {
    navigation.navigate('NoBottomTab', {
      screen: 'WalletAll',
      params: {
        title: 'Xu hướng',
        data: trendList,
      },
    });
  }, [navigation, trendList]);

  const renderTrendSection = useMemo(() => {
    return (
      <Animatable.View
        animation="fadeInUp"
        duration={400}
        style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.headerTitle}>
            <Flame size={20} color="orange" style={{marginRight: 8}} />
            <Text style={[styles.title, {color: 'orange'}]}>Xu hướng</Text>
          </View>
          <TouchableOpacity
            onPress={navigateToWalletAll}
            style={styles.seeMoreButton}>
            <Text style={styles.seeMoreText}>Xem Tất cả</Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <WalletListSkeleton itemCount={7} />
        ) : visibleItems.length === 0 ? (
          <Text style={styles.emptyText}>Không có dữ liệu</Text>
        ) : (
          <WalletList data={visibleItems} />
        )}
      </Animatable.View>
    );
  }, [isLoading, visibleItems, navigateToWalletAll]);

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

      <ScrollView
        contentContainerStyle={{paddingBottom: scale(150)}}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        <View style={styles.main}>{renderTrendSection}</View>
      </ScrollView>
    </View>
  );
};

export default React.memo(TrendScreen);
