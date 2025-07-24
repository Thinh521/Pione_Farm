import React, {useEffect, useMemo, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styles from './Trend.styles';
import SearchAndFilterBar from '~/components/SearchAndFilterBar/SearchAndFilterBar';
import WalletList from '../Home/components/WalletList';
import WalletListSkeleton from '~/components/Skeleton/WalletListSkeleton';
import {scale} from '~/utils/scaling';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {Flame} from 'lucide-react-native';
import {useQuery} from '@tanstack/react-query';
import {getTrendAll} from '~/api/trendApi';
import {getAllProvinceApii} from '~/api/provinceApi';
import {useSearchAndFilter} from '~/hook/useSearch';

const TrendScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [date, setDate] = useState(null);
  const [provinceOptions, setProvinceOptions] = useState([]);

  // Get dữ liệu xu hướng từ API
  const {data, isLoading, isFetched, isError} = useQuery({
    queryKey: ['trend-data', date],
    queryFn: () => getTrendAll(date),
    select: res => res.data,
    enabled: true,
    staleTime: 10 * 60 * 1000,
  });

  // Get danh sách tỉnh
  const {data: provinceList = []} = useQuery({
    queryKey: ['provinces'],
    queryFn: getAllProvinceApii,
    select: res => res.data,
    staleTime: 10 * 60 * 1000,
  });

  const trendList = data || [];

  // Áp dụng hook lọc
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

  useEffect(() => {
    if (provinceList.length) {
      setProvinceOptions(['Tất cả', ...provinceList.map(p => p.name)]);
    }
  }, [provinceList]);

  const filterOptions = useMemo(
    () => [
      {label: 'Ngày', options: []},
      {label: 'Tỉnh', options: provinceOptions},
      {label: 'Giá', options: ['Tất cả', 'Tăng dần', 'Giảm dần']},
    ],
    [provinceOptions],
  );

  const handleFilterSelect = (type, value) => {
    const newFilters = {...selectedFilters, [type]: value};
    setSelectedFilters(newFilters);

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
  };

  const navigateToWalletAll = () => {
    navigation.navigate('NoBottomTab', {
      screen: 'WalletAll',
      params: {
        title: 'Xu hướng',
        data: trendList,
      },
    });
  };

  const renderTrendSection = () => (
    <Animatable.View animation="fadeInUp" duration={500} style={styles.section}>
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
      ) : (
        <WalletList data={filteredTrendList} />
      )}
    </Animatable.View>
  );

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
        contentContainerStyle={{paddingBottom: scale(80)}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.main}>{renderTrendSection()}</View>
      </ScrollView>
    </View>
  );
};

export default TrendScreen;
