import React, {useMemo, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './Statistical.styles';
import SearchAndFilterBar from '~/components/SearchAndFilterBar/SearchAndFilterBar';
import {scale} from '~/utils/scaling';
import {DownIcon} from '~/assets/icons/Icons';
import TrendAnalyticsCard from './components/TrendAnalyticsCard';
import PriceMovementSummary from './components/PriceMovementSummary';
import TopTrend from './components/TopTrend';
import {Colors} from '~/theme/theme';
import {useQuery} from '@tanstack/react-query';
import {getStatisticalApi, fetchProductTypeList} from '~/api/statisticalApi';
import dayjs from 'dayjs';
import CustomBottomSheet from '~/components/CustomBottomSheet/CustomBottomSheet';

const TIME_OPTIONS = ['Tháng', 'Năm'];

const filterDataByTimeRange = (labels, onlineOrders, offlineOrders, range) => {
  const now = dayjs();
  let filteredIndexes = [];

  switch (range) {
    case 'Tháng':
      filteredIndexes = labels
        .map((label, i) => ({label, i}))
        .filter(({label}) => dayjs(label).isAfter(now.subtract(1, 'month')))
        .map(({i}) => i);
      break;
    case 'Năm':
    default:
      filteredIndexes = labels.map((_, i) => i);
  }

  return {
    labels: filteredIndexes.map(i => labels[i]),
    onlineOrders: filteredIndexes.map(i => onlineOrders[i]),
    offlineOrders: filteredIndexes.map(i => offlineOrders[i]),
  };
};

const StatisticalScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedTimeRange, setSelectedTimeRange] = useState('Năm');
  const [selectedOrderType, setSelectedOrderType] = useState(null);
  const [selectedProductType, setSelectedProductType] = useState(null);

  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showProductBottomSheet, setShowProductBottomSheet] = useState(false);

  const {data: productTypes = []} = useQuery({
    queryKey: ['product-types'],
    queryFn: fetchProductTypeList,
    select: res => res.data,
    staleTime: 10 * 60 * 1000,
  });

  const {data, isLoading, isError, error, isRefetching, refetch} = useQuery({
    queryKey: ['order-stats', selectedProductType?._id],
    queryFn: () => getStatisticalApi(selectedProductType?._id),
    select: res => res.data,
    enabled: true,
    staleTime: 10 * 60 * 1000,
  });

  const filteredChartData = useMemo(() => {
    if (!data) return null;
    return filterDataByTimeRange(
      data.labels,
      data.onlineOrders,
      data.offlineOrders,
      selectedTimeRange,
    );
  }, [data, selectedTimeRange]);

  const toggleOrderType = type => {
    setSelectedOrderType(prev => (prev === type ? null : type));
  };

  const handleProductSelect = product => {
    setSelectedProductType(product);
  };

  return (
    <>
      <StatusBar backgroundColor={Colors.headerBack} barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <SearchAndFilterBar
            searchText={searchText}
            setSearchText={setSearchText}
            filterOptions={[]}
            showProductButton={false}
            placeholder="Tìm kiếm thông tin"
            containerStyle={{marginBottom: 0}}
            wrapperStyle={{marginBottom: 0}}
          />

          <View style={styles.headerBottom}>
            <Text style={styles.headerBottomTitle}>Statistical</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => toggleOrderType('offline')}>
                <View style={[styles.dot, {backgroundColor: '#347AE2'}]} />
                <Text style={styles.buttonText}>Offline orders</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => toggleOrderType('online')}>
                <View style={[styles.dot, {backgroundColor: '#FF9500'}]} />
                <Text style={styles.buttonText}>Online orders</Text>
              </TouchableOpacity>
            </View>

            <View style={{position: 'relative'}}>
              <TouchableOpacity
                style={[styles.headerdropdown, styles.dropdown]}
                onPress={() => setShowTimeDropdown(prev => !prev)}>
                <Text style={styles.dropdownHeaderText}>
                  {selectedTimeRange}
                </Text>
                <DownIcon />
              </TouchableOpacity>

              {showTimeDropdown && (
                <View style={styles.dropdownList}>
                  {TIME_OPTIONS.map(option => (
                    <TouchableOpacity
                      key={option}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedTimeRange(option);
                        setShowTimeDropdown(false);
                      }}>
                      <Text style={styles.dropdownHeaderText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>

        <FlatList
          data={[{}]}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: scale(90)}}
          renderItem={() => (
            <View style={styles.main}>
              <TouchableOpacity
                style={[styles.dropdown, styles.dropdownProduct]}
                onPress={() => setShowProductBottomSheet(true)}>
                <Text style={styles.dropdownText}>
                  {selectedProductType?.name || 'Chọn loại sản phẩm'}
                </Text>
                <DownIcon />
              </TouchableOpacity>

              <TrendAnalyticsCard
                selectedOrderType={selectedOrderType}
                data={{
                  ...data,
                  ...filteredChartData,
                }}
                isLoading={isLoading}
                isError={isError}
                error={error}
                selectedProductType={selectedProductType}
              />
              <PriceMovementSummary
                data={data?.productChange}
                isLoading={isLoading}
                isError={isError}
              />
              <TopTrend />
            </View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              colors={['#4CAF50']}
              tintColor="#4CAF50"
              title="Đang cập nhật dữ liệu..."
              titleColor="#666"
            />
          }
        />

        <CustomBottomSheet
          visible={showProductBottomSheet}
          onClose={() => setShowProductBottomSheet(false)}
          title="Chọn loại sản phẩm"
          data={productTypes}
          selectedItem={selectedProductType}
          onSelectItem={handleProductSelect}
          keyExtractor={item => item._id}
          labelExtractor={item => item.name}
        />
      </View>
    </>
  );
};

export default StatisticalScreen;
