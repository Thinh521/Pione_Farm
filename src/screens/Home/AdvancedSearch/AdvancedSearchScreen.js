import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity,
  Animated,
  StatusBar,
} from 'react-native';
import styles from './AdvancedSearch.styles';
import SearchAndFilterBar from '~/components/SearchAndFilterBar/SearchAndFilterBar';
import CustomTable from '~/components/CustomTable/CustomTable';
import {scale} from '~/utils/scaling';
import Button from '~/components/ui/Button/ButtonComponent';
import ChatBot from '~/components/ChatBot/ChatBot';
import {DownIcon} from '~/assets/icons/Icons';
import {Colors} from '~/theme/theme';
import {useHarvestFilter} from '~/hook/useHarvestFilter';
import {useSearchAndFilter} from '~/hook/useSearch';
import {useQuery} from '@tanstack/react-query';
import {getTodayHarvestSummary} from '../../../api/productApi';

const AdvancedSearchScreen = () => {
  const {
    isLoading,
    fruitCategory,
    provinceOptions,
    selectedFilters,
    handleFilterSelect,
    collectionAndYieldData,
    productTypeOptions,
    selectedTypeFilter,
    setSelectedTypeFilter,
  } = useHarvestFilter();

  const {
    data: todayHarvestData,
    loading,
    error,
  } = useQuery({
    queryKey: ['todayHarvest'],
    queryFn: getTodayHarvestSummary,
    select: res => res.data,
    staleTime: 10 * 60 * 1000,
  });

  const {filteredData, searchKeyword, setSearchKeyword} = useSearchAndFilter({
    data: collectionAndYieldData,
    searchableFields: ['provinceName'],
  });

  const [isExporting, setIsExporting] = useState(false);
  const [activeFilter, setActiveFilter] = useState({
    index: null,
    anim: new Animated.Value(0),
  });
  const filterRotate = useRef(new Animated.Value(0)).current;

  const columns = useMemo(
    () => [
      {title: 'Khu vực', key: 'provinceName', flex: 1},
      {title: 'Giá tại chợ', key: 'marketPrice', flex: 1},
      {title: 'Giá tại Vườn', key: 'farmPrice', flex: 1},
    ],
    [],
  );

  const columns_2 = useMemo(
    () => [
      {title: 'Ngày tháng', key: 'date', flex: 1},
      {title: 'Nơi thu thập', key: 'provinceName', flex: 1},
      {title: 'Số lượng', key: 'quantitySum', flex: 1},
    ],
    [],
  );

  const fruitCategorySafe = useMemo(
    () => (fruitCategory.length > 0 ? fruitCategory : ['Tất cả']),
    [fruitCategory],
  );

  const filterOptions = useMemo(
    () => [
      {label: 'Ngày BĐ', options: []},
      {label: 'Ngày KT', options: []},
      {label: 'Tỉnh', options: provinceOptions},
    ],
    [provinceOptions],
  );

  const toggleFilter = useCallback(
    index => {
      const newAnim = new Animated.Value(0);
      if (activeFilter.index === index) {
        Animated.parallel([
          Animated.timing(activeFilter.anim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(filterRotate, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setActiveFilter({index: null, anim: new Animated.Value(0)});
        });
      } else {
        setActiveFilter({index, anim: newAnim});
        Animated.parallel([
          Animated.timing(newAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(filterRotate, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start();
      }
    },
    [activeFilter.index, activeFilter.anim],
  );

  const handleTypeSelection = useCallback(
    type => {
      setSelectedTypeFilter(type);
      toggleFilter(-1);
    },
    [setSelectedTypeFilter, toggleFilter],
  );

  const getDateRangeText = useMemo(() => {
    const start = selectedFilters['Ngày BĐ'];
    const end = selectedFilters['Ngày KT'];
    if (!start && !end) return 'Chọn khoảng thời gian';
    if (!start) return `-- đến ${end}`;
    if (!end) return `${start} đến --`;
    return `${start} - ${end}`;
  }, [selectedFilters]);

  const capitalize = useCallback(
    str => (str ? str.charAt(0).toUpperCase() + str.slice(1) : ''),
    [],
  );

  const handleExport = async () => {
    setIsExporting(true);
    await exportToExcel(filteredData, 'price_comparison');
    setIsExporting(false);
  };

  return (
    <>
      <StatusBar backgroundColor={Colors.headerBack} barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <SearchAndFilterBar
            placeholder="Tìm kiếm trái cây"
            searchText={searchKeyword}
            setSearchText={setSearchKeyword}
            selectedFilters={selectedFilters}
            onFilterSelect={handleFilterSelect}
            filterOptions={filterOptions}
            itemOptions={fruitCategorySafe}
            showProductButton
            isLoading={isLoading}
          />
        </View>

        <ScrollView
          contentContainerStyle={{paddingBottom: scale(20)}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.bodyWrapper}>
            <Text style={styles.title}>Kết quả: {filteredData.length}</Text>

            <View style={styles.buttonContainer}>
              <Text style={styles.selecteButton}>{getDateRangeText}</Text>

              <View style={{flex: 1}}>
                <Button.Select
                  title={capitalize(selectedTypeFilter)}
                  style={{flex: 1}}
                  iconRight={
                    <Animated.View
                      style={{
                        transform: [
                          {
                            rotate: filterRotate.interpolate({
                              inputRange: [0, 1],
                              outputRange: ['0deg', '180deg'],
                            }),
                          },
                        ],
                      }}>
                      <DownIcon
                        style={{color: Colors.black, width: scale(20)}}
                      />
                    </Animated.View>
                  }
                  onPress={() => toggleFilter(-1)}
                />

                {activeFilter.index === -1 && (
                  <Animated.View
                    style={{
                      position: 'absolute',
                      top: scale(45),
                      zIndex: 1000,
                      width: '100%',
                      backgroundColor: Colors.white,
                      borderRadius: scale(6),
                      paddingVertical: scale(6),
                      paddingHorizontal: scale(12),
                      elevation: Platform.OS === 'android' ? 5 : undefined,
                      shadowColor: Platform.OS === 'ios' ? '#000' : undefined,
                      shadowOffset:
                        Platform.OS === 'ios'
                          ? {width: 0, height: 2}
                          : undefined,
                      shadowOpacity: Platform.OS === 'ios' ? 0.15 : undefined,
                      shadowRadius: Platform.OS === 'ios' ? 4 : undefined,
                      opacity: activeFilter.anim,
                      transform: [
                        {
                          translateY: activeFilter.anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-10, 0],
                          }),
                        },
                      ],
                    }}>
                    <ScrollView
                      style={{maxHeight: scale(200)}}
                      showsVerticalScrollIndicator={false}>
                      {productTypeOptions.map((option, index) => (
                        <TouchableOpacity
                          key={index}
                          style={{
                            paddingVertical: scale(8),
                            borderBottomWidth:
                              index < productTypeOptions.length - 1 ? 0.5 : 0,
                            borderBottomColor: '#eee',
                          }}
                          onPress={() => handleTypeSelection(option)}>
                          <Text
                            style={{
                              fontSize: scale(13),
                              color:
                                selectedTypeFilter === option
                                  ? Colors.greenText
                                  : '#333',
                              fontWeight:
                                selectedTypeFilter === option
                                  ? 'bold'
                                  : 'normal',
                            }}>
                            {capitalize(option)}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </Animated.View>
                )}
              </View>
            </View>

            {/* Bảng giá */}
            <View style={styles.tableContainer}>
              <Text style={styles.tableTitle}>Bảng giá</Text>
              <CustomTable
                data={filteredData || []}
                columns={columns}
                scrollable
                isLoading={isLoading}
                bodyHeight={scale(200)}
                headerRowStyle={{width: '100%'}}
                rowStyle={{width: '100%'}}
                containerStyle={{marginBottom: scale(20)}}
              />
              <Button.Main
                title={
                  isExporting === 'bang_gia' ? 'Đang xuất...' : 'Xuất bảng giá'
                }
                disabled={filteredData?.length === 0}
                onPress={handleExport}
                style={styles.buttonExcel}
              />
            </View>

            {/* Bảng sản lượng */}
            <View style={styles.tableContainer}>
              <Text style={styles.tableTitle}>Bảng sản lượng</Text>
              <CustomTable
                data={todayHarvestData || []}
                columns={columns_2}
                scrollable
                isLoading={isLoading}
                bodyHeight={scale(200)}
                headerRowStyle={{width: '100%'}}
                rowStyle={{width: '100%'}}
                containerStyle={{marginBottom: scale(20)}}
              />
              <Button.Main
                title={
                  isExporting === 'bang_san_luong'
                    ? 'Đang xuất...'
                    : 'Xuất bảng sản lượng'
                }
                disabled={todayHarvestData?.length === 0}
                onPress={handleExport}
                style={styles.buttonExcel}
              />
            </View>
          </View>
        </ScrollView>

        <ChatBot />
      </View>
    </>
  );
};

export default AdvancedSearchScreen;
