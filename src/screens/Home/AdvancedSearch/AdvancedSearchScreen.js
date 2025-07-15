import {
  ScrollView,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Animated,
  StatusBar,
} from 'react-native';
import React, {useRef} from 'react';
import styles from './AdvancedSearch.styles';

import SearchAndFilterBar from '~/components/SearchAndFilterBar/SearchAndFilterBar';
import CustomTable from '~/components/CustomTable/CustomTable';
import {scale} from '~/utils/scaling';
import Button from '~/components/ui/Button/ButtonComponent';
import ChatBot from '~/components/ChatBot/ChatBot';
import {DownIcon} from '~/assets/icons/Icons';
import {Colors} from '~/theme/theme';
import {useHarvestFilter} from '~/hook/useHarvestFilter';

const columns = [
  {title: 'Khu vực', key: 'provinceName', flex: 1},
  {title: 'Giá tại chợ', key: 'marketPrice', flex: 1},
  {title: 'Giá tại Vườn', key: 'farmPrice', flex: 1},
];

const columns_2 = [
  {title: 'Ngày tháng', key: 'date', flex: 1},
  {title: 'Nơi thu thập', key: 'provinceName', flex: 1},
  {title: 'Số lượng', key: 'quantitySum', flex: 1},
];

const AdvancedSearchScreen = () => {
  const {
    isLoading,
    fruitCategory,
    provinceOptions,
    selectedFilters,
    handleFilterSelect,
    collectionAndYieldData,
    todayHarvestData,
    productTypeOptions,
    selectedTypeFilter,
    setSelectedTypeFilter,
    exportDataToExcel,
    isAllFiltersSelected,
    exportingTable,
  } = useHarvestFilter(false);

  const [searchText, setSearchText] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState({
    index: null,
    anim: new Animated.Value(0),
  });
  const filterRotate = useRef(new Animated.Value(0)).current;

  const getFilterOptions = () => [
    {label: 'Ngày BĐ', options: []},
    {label: 'Ngày KT', options: []},
    {label: 'Tỉnh', options: provinceOptions},
    {label: 'Mặt hàng', options: fruitCategory},
  ];

  const toggleFilter = index => {
    if (activeFilter.index === index) {
      Animated.parallel([
        Animated.timing(activeFilter.anim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(filterRotate, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setActiveFilter({index: null, anim: new Animated.Value(0)});
      });
    } else {
      const newAnim = new Animated.Value(0);
      setActiveFilter({index, anim: newAnim});
      Animated.parallel([
        Animated.timing(newAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(filterRotate, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handleTypeSelection = selectedType => {
    setSelectedTypeFilter(selectedType);
    toggleFilter(-1);
  };

  const getDateRangeText = () => {
    const start = selectedFilters['Ngày BĐ'];
    const end = selectedFilters['Ngày KT'];
    if (!start && !end) return 'Chọn khoảng thời gian';
    if (!start) return `-- đến ${end}`;
    if (!end) return `${start} đến --`;
    return `${start} - ${end}`;
  };

  const capitalizeFirstLetter = str =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

  return (
    <>
      <StatusBar backgroundColor={Colors.headerBack} barStyle="light-content" />

      <View style={styles.container}>
        <View style={styles.header}>
          <SearchAndFilterBar
            selectedFilters={selectedFilters}
            searchText={searchText}
            setSearchText={setSearchText}
            filterOptions={getFilterOptions()}
            placeholder="Tìm kiếm trái cây"
            onFilterSelect={handleFilterSelect}
            isLoading={isLoading}
          />
        </View>

        <ScrollView
          contentContainerStyle={{paddingBottom: scale(20)}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.bodyWrapper}>
            <Text style={styles.title}>
              Kết quả: {collectionAndYieldData.length}
            </Text>

            {isAllFiltersSelected() && (
              <View style={styles.buttonContainer}>
                <View
                  style={{
                    flex: 2,
                    paddingHorizontal: scale(12),
                    paddingVertical: scale(8),
                    borderColor: '#b0ffce',
                    borderWidth: 1,
                    borderRadius: scale(24),
                  }}>
                  <Text style={{fontSize: scale(13)}}>
                    {getDateRangeText()}
                  </Text>
                </View>

                {/* Type selector dropdown */}
                <View style={{flex: 1}}>
                  <Button.Select
                    title={capitalizeFirstLetter(selectedTypeFilter)}
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
                        {productTypeOptions.map((option, i) => (
                          <TouchableOpacity
                            key={i}
                            style={{
                              paddingVertical: scale(8),
                              borderBottomWidth:
                                i < productTypeOptions.length - 1 ? 0.5 : 0,
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
                              {capitalizeFirstLetter(option)}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </Animated.View>
                  )}
                </View>
              </View>
            )}

            {/* Bảng giá */}
            <View style={styles.tableContainer}>
              <Text style={styles.tableTitle}>Bảng giá</Text>
              <CustomTable
                data={collectionAndYieldData || []}
                columns={columns}
                scrollable
                bodyHeight={scale(200)}
                headerRowStyle={{width: '100%'}}
                rowStyle={{width: '100%'}}
                containerStyle={{marginBottom: scale(20)}}
                emptyText={
                  !isAllFiltersSelected()
                    ? 'Vui lòng chọn đầy đủ: Tỉnh, Mặt hàng, Ngày BĐ, Ngày KT'
                    : 'Không có dữ liệu phù hợp'
                }
              />

              <Button.Main
                title={
                  exportingTable === 'bang_gia'
                    ? 'Đang xuất...'
                    : 'Xuất bảng giá'
                }
                disabled={collectionAndYieldData.length === 0}
                onPress={() =>
                  exportDataToExcel(collectionAndYieldData, 'bang_gia')
                }
                style={styles.buttonExcel}
              />
            </View>

            {/* Bảng sản lượng hôm nay */}
            <View style={styles.tableContainer}>
              <Text style={styles.tableTitle}>Bảng sản lượng</Text>
              <CustomTable
                data={todayHarvestData || []}
                columns={columns_2}
                scrollable
                bodyHeight={scale(200)}
                headerRowStyle={{width: '100%'}}
                rowStyle={{width: '100%'}}
                containerStyle={{marginBottom: scale(20)}}
                emptyText={
                  todayHarvestData?.length === 0
                    ? 'Không có dữ liệu sản lượng hôm nay'
                    : undefined
                }
              />

              <Button.Main
                title={
                  exportingTable === 'bang_san_luong'
                    ? 'Đang xuất...'
                    : 'Xuất bảng sản lượng'
                }
                disabled={todayHarvestData?.length === 0}
                onPress={() =>
                  exportDataToExcel(todayHarvestData, 'bang_san_luong')
                }
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
