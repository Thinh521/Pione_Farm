import {
  ScrollView,
  Text,
  View,
  Alert,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  Animated,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';

import styles from './AdvancedSearch.styles';
import SearchAndFilterBar from '../../../components/SearchAndFilterBar/SearchAndFilterBar';
import CustomTable from '../../../components/CustomTable/CustomTable';
import {scale} from '../../../utils/scaling';
import Button from '../../../components/ui/Button/ButtonComponent';
import ChatBot from '../../../components/ChatBot/ChatBot';
import {getAllCategories} from '../../../api/categogyApi';
import {getAllProvinceApii} from '../../../api/provinceApi';
import {
  getFarmMarketPrices,
  getProductTypesByProvince,
  getTodayHarvestSummary,
} from '../../../api/productApi';
import {DownIcon} from '../../../assets/icons/Icons';
import {Colors} from '../../../theme/theme';

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
  const [searchText, setSearchText] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [exportingTable, setExportingTable] = useState(null);
  const [fruitCategory, setFruitCategory] = useState(['Tất cả']);
  const [provinceOptions, setProvinceOptions] = useState(['Tất cả']);
  const [productTypeOptions, setProductTypeOptions] = useState(['Tất cả']);
  const [selectedFruitFilter, setSelectedFruitFilter] = useState('Tất cả');
  const [allProvinces, setAllProvinces] = useState([]);
  const [collectionAndYieldData, setCollectionAndYieldData] = useState([]);
  const [todayHarvestData, setTodayHarvestData] = useState([]);

  const [activeFilter, setActiveFilter] = useState({
    index: null,
    anim: new Animated.Value(0),
  });
  const filterRotate = useRef(new Animated.Value(0)).current;

  // Api lấy all tỉnh và mặt hàng
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Fetch trái cây
        const categories = await getAllCategories();

        console.log('categories', categories);

        const categoryNames = categories.data.map(c => c.name);
        setFruitCategory(['Tất cả', ...categoryNames]);

        // Fetch tỉnh
        const province = await getAllProvinceApii();

        console.log('province', province);

        const provinceNames = province.data.map(p => p.name);
        setProvinceOptions(['Tất cả', ...provinceNames]);
        setAllProvinces(province.data);
      } catch (error) {
        console.log('Lỗi khi lấy danh mục:', error.message);
      }
    };

    fetchCategories();
  }, []);

  // Api lấy dữ liệu đã lọc
  useEffect(() => {
    const autoFetchFilteredPrices = async () => {
      const provinceName = selectedFilters['Tỉnh'];
      const categoryName = selectedFilters['Mặt hàng'];
      const startDate = selectedFilters['Ngày BĐ'];
      const endDate = selectedFilters['Ngày KT'];

      if (
        !provinceName ||
        !categoryName ||
        !startDate ||
        !endDate ||
        provinceName === 'Tất cả' ||
        categoryName === 'Tất cả'
      ) {
        return;
      }

      const selectedProvince = allProvinces.find(p => p.name === provinceName);
      if (!selectedProvince) return;

      try {
        const allCategories = await getAllCategories();
        const selectedCategory = allCategories.data.find(
          c => c.name === categoryName,
        );
        if (!selectedCategory) return;

        const payload = {
          provinceId: selectedProvince._id,
          categoryId: selectedCategory._id,
          date: {
            start: formatDate(startDate),
            end: formatDate(endDate),
          },
        };

        console.log('Gửi API theo filter:', payload);

        const res = await getFarmMarketPrices(payload);
        setCollectionAndYieldData(res.data);
      } catch (error) {
        console.error('Lỗi khi gọi API theo filter:', error.message);
      }
    };

    autoFetchFilteredPrices();
  }, [
    selectedFilters['Tỉnh'],
    selectedFilters['Mặt hàng'],
    selectedFilters['Ngày BĐ'],
    selectedFilters['Ngày KT'],
    allProvinces,
  ]);

  // Api lấy dữ liệu sản lượng
  useEffect(() => {
    const fetchTodaySummary = async () => {
      try {
        const res = await getTodayHarvestSummary();
        setTodayHarvestData(res.data);
      } catch (error) {
        console.log('Lỗi khi fetch sản lượng hôm nay:', err.message);
      }
    };

    fetchTodaySummary();
  }, []);

  const getFilterOptions = () => [
    {label: 'Ngày BĐ', options: []},
    {label: 'Ngày KT', options: []},
    {label: 'Tỉnh', options: provinceOptions},
  ];

  const formatDate = dateString => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  const parseDate = date => {
    if (!date) return null;
    const [day, month, year] = date.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };

  const isDateInRange = (itemDate, startDate, endDate) => {
    const date = parseDate(itemDate);
    if (!date) return false;

    const start = startDate ? parseDate(startDate) : null;
    const end = endDate ? parseDate(endDate) : null;

    return (!start || date >= start) && (!end || date <= end);
  };

  // Fetch product types when filters change
  useEffect(() => {
    const fetchProductTypes = async () => {
      const provinceName = selectedFilters['Tỉnh'];
      const startDate = selectedFilters['Ngày BĐ'];
      const endDate = selectedFilters['Ngày KT'];

      if (
        !provinceName ||
        provinceName === 'Tất cả' ||
        !startDate ||
        !endDate
      ) {
        setProductTypeOptions(['Tất cả']);
        return;
      }

      try {
        const selectedProvince = allProvinces.find(
          p => p.name === provinceName,
        );
        if (!selectedProvince) {
          setProductTypeOptions(['Tất cả']);
          return;
        }

        const types = await getProductTypesByProvince(selectedProvince._id, {
          start: formatDate(startDate),
          end: formatDate(endDate),
        });

        if (types && types.data && types.data.length > 0) {
          const typeNames = types.data.map(t => t.name);
          setProductTypeOptions(['Tất cả', ...typeNames]);
        } else {
          setProductTypeOptions(['Tất cả']);
        }
      } catch (error) {
        console.log('Lỗi khi lấy loại sản phẩm:', error.message);
        setProductTypeOptions(['Tất cả']);
      }
    };

    fetchProductTypes();
  }, [
    selectedFilters['Tỉnh'],
    selectedFilters['Ngày BĐ'],
    selectedFilters['Ngày KT'],
    allProvinces,
  ]);

  const exportDataToExcel = async (data, tableKey) => {
    if (!data || data.length === 0) {
      Alert.alert('Thông báo', 'Không có dữ liệu để xuất!');
      return;
    }

    try {
      setExportingTable(tableKey);

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, 'Kết quả');
      const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});

      const toBinary = str =>
        str
          .split('')
          .map(c => String.fromCharCode(c.charCodeAt(0)))
          .join('');

      const fileName = `ket_qua_${tableKey}_${Date.now()}.xlsx`;
      const path =
        Platform.OS === 'android'
          ? `${RNFS.DownloadDirectoryPath}/${fileName}`
          : `${RNFS.DocumentDirectoryPath}/${fileName}`;

      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Cấp quyền lưu file',
            message: 'Ứng dụng cần quyền để lưu file Excel.',
            buttonPositive: 'Đồng ý',
            buttonNegative: 'Hủy',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Thông báo', 'Bạn chưa cấp quyền lưu file!');
          return;
        }
      }

      await RNFS.writeFile(path, toBinary(wbout), 'ascii');
      Alert.alert('Thành công', `File đã được lưu tại:\n${path}`);
    } catch (error) {
      console.error('Lỗi xuất Excel:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi xuất file Excel!');
    } finally {
      setExportingTable(null);
    }
  };

  const handleFilterSelect = (type, value) => {
    setIsLoading(true);

    if (type === 'Tỉnh' || type === 'Ngày BĐ' || type === 'Ngày KT') {
      setSelectedFilters(prev => ({
        ...prev,
        [type]: value,
        'Mặt hàng': 'Tất cả',
      }));
    } else {
      setSelectedFilters(prev => ({...prev, [type]: value}));
    }

    setTimeout(() => setIsLoading(false), 500);
  };

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

  const onFilterSelect = (type, value) => {
    handleFilterSelect(type, value);
  };

  const getDateRangeText = () => {
    const start = selectedFilters['Ngày BĐ'];
    const end = selectedFilters['Ngày KT'];
    if (!start && !end) return 'Chọn khoảng thời gian';
    if (!start) return `-- đến ${end}`;
    if (!end) return `${start} đến --`;
    return `${start} - ${end}`;
  };

  const capitalizeFirstLetter = str => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

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
            itemOptions={fruitCategory}
            showProductButton
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
                <Text style={{fontSize: scale(13)}}>{getDateRangeText()}</Text>
              </View>
              <View style={{flex: 1}}>
                <Button.Select
                  title={capitalizeFirstLetter(selectedFruitFilter)}
                  style={{flex: 1}}
                  iconRight={
                    activeFilter.index === -1 ? (
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
                    ) : (
                      <DownIcon
                        style={{color: Colors.black, width: scale(20)}}
                      />
                    )
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
                          onPress={() => {
                            onFilterSelect('Mặt hàng', option);
                            setSelectedFruitFilter(option);
                            toggleFilter(-1);
                          }}>
                          <Text
                            style={{
                              fontSize: scale(13),
                              color:
                                selectedFilters['Mặt hàng'] === option
                                  ? Colors.greenText
                                  : '#333',
                              fontWeight:
                                selectedFilters['Mặt hàng'] === option
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

            {/* Bảng giá */}
            <View style={styles.tableContainer}>
              <Text style={styles.tableTitle}>Bảng giá</Text>
              <CustomTable
                data={collectionAndYieldData}
                columns={columns}
                scrollable
                bodyHeight={scale(200)}
                headerRowStyle={{width: '100%'}}
                rowStyle={{width: '100%'}}
                containerStyle={{marginBottom: scale(20)}}
                emptyText={
                  collectionAndYieldData.length === 0
                    ? 'Không có dữ liệu phù hợp'
                    : undefined
                }
              />

              <Button.Main
                title={
                  exportingTable === 'table1' ? 'Đang xuất...' : 'Xuất bảng giá'
                }
                disabled={
                  exportingTable !== null || collectionAndYieldData.length === 0
                }
                onPress={() =>
                  exportDataToExcel(collectionAndYieldData, 'bang_gia')
                }
                style={styles.buttonExcel}
              />
            </View>

            {/* Bảng sản lượng */}
            <View style={styles.tableContainer}>
              <Text style={styles.tableTitle}>Bảng sản lượng</Text>
              <CustomTable
                data={todayHarvestData}
                columns={columns_2}
                scrollable
                bodyHeight={scale(200)}
                headerRowStyle={{width: '100%'}}
                rowStyle={{width: '100%'}}
                containerStyle={{marginBottom: scale(20)}}
                emptyText={
                  todayHarvestData.length === 0
                    ? 'Không có dữ liệu phù hợp'
                    : undefined
                }
              />

              <Button.Main
                title={
                  exportingTable === 'table2'
                    ? 'Đang xuất...'
                    : 'Xuất bảng sản lượng'
                }
                disabled={
                  exportingTable !== null || todayHarvestData.length === 0
                }
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
