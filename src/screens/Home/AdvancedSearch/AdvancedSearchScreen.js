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
  const [allProvinces, setAllProvinces] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [productTypeOptionsData, setProductTypeOptionsData] = useState([]);

  const [collectionAndYieldData, setCollectionAndYieldData] = useState([]);
  const [todayHarvestData, setTodayHarvestData] = useState([]);

  const [selectedTypeFilter, setSelectedTypeFilter] = useState('Tất cả');
  const [activeFilter, setActiveFilter] = useState({
    index: null,
    anim: new Animated.Value(0),
  });
  const filterRotate = useRef(new Animated.Value(0)).current;

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);

        // Fetch categories
        const categoriesRes = await getAllCategories();
        const categoryNames = categoriesRes.data.map(c => c.name);
        setFruitCategory(['Tất cả', ...categoryNames]);
        setAllCategories(categoriesRes.data);

        // Fetch provinces
        const provincesRes = await getAllProvinceApii();
        const provinceNames = provincesRes.data.map(p => p.name);
        setProvinceOptions(['Tất cả', ...provinceNames]);
        setAllProvinces(provincesRes.data);

        // Fetch today harvest summary
        const todayHarvestRes = await getTodayHarvestSummary();
        setTodayHarvestData(todayHarvestRes.data);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu ban đầu:', error.message);
        Alert.alert('Lỗi', 'Không thể tải dữ liệu ban đầu');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch product types when province and date range change
  useEffect(() => {
    const fetchProductTypes = async () => {
      const provinceName = selectedFilters['Tỉnh'];
      const startDate = selectedFilters['Ngày BĐ'];
      const endDate = selectedFilters['Ngày KT'];

      // Reset product types and selected type when province or date changes
      setProductTypeOptions(['Tất cả']);
      setProductTypeOptionsData([]);
      setSelectedTypeFilter('Tất cả');

      if (
        !provinceName ||
        provinceName === 'Tất cả' ||
        !startDate ||
        !endDate
      ) {
        return;
      }

      try {
        const selectedProvince = allProvinces.find(
          p => p.name === provinceName,
        );
        if (!selectedProvince) return;

        const typesRes = await getProductTypesByProvince(selectedProvince._id, {
          start: formatDate(startDate),
          end: formatDate(endDate),
        });

        if (typesRes && typesRes.data && typesRes.data.length > 0) {
          const typeNames = typesRes.data.map(t => t.name);
          setProductTypeOptions(['Tất cả', ...typeNames]);
          setProductTypeOptionsData(typesRes.data);
        }
      } catch (error) {
        console.error('Lỗi khi lấy loại sản phẩm:', error.message);
      }
    };

    fetchProductTypes();
  }, [
    selectedFilters['Tỉnh'],
    selectedFilters['Ngày BĐ'],
    selectedFilters['Ngày KT'],
    allProvinces,
  ]);

  // Fetch filtered data when all required filters are selected
  useEffect(() => {
    const fetchFilteredData = async () => {
      const provinceName = selectedFilters['Tỉnh'];
      const categoryName = selectedFilters['Mặt hàng'];
      const startDate = selectedFilters['Ngày BĐ'];
      const endDate = selectedFilters['Ngày KT'];

      // Check if all 4 required filters are selected
      if (
        !provinceName ||
        !categoryName ||
        !startDate ||
        !endDate ||
        provinceName === 'Tất cả' ||
        categoryName === 'Tất cả'
      ) {
        setCollectionAndYieldData([]);
        return;
      }

      try {
        setIsLoading(true);

        const selectedProvince = allProvinces.find(
          p => p.name === provinceName,
        );
        const selectedCategory = allCategories.find(
          c => c.name === categoryName,
        );

        if (!selectedProvince || !selectedCategory) {
          setCollectionAndYieldData([]);
          return;
        }

        // Find selected type if any
        const selectedType =
          selectedTypeFilter !== 'Tất cả'
            ? productTypeOptionsData.find(t => t.name === selectedTypeFilter)
            : null;

        const payload = {
          provinceId: selectedProvince._id,
          categoryId: selectedCategory._id,
          date: {
            start: formatDate(startDate),
            end: formatDate(endDate),
          },
        };

        // Add typeId if a specific type is selected
        if (selectedType) {
          payload.typeId = selectedType._id;
        }

        console.log('Gửi API với payload:', payload);

        const res = await getFarmMarketPrices(payload);
        setCollectionAndYieldData(res.data || []);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu giá:', error.message);
        setCollectionAndYieldData([]);
        Alert.alert('Lỗi', 'Không thể tải dữ liệu giá cả');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredData();
  }, [
    selectedFilters['Tỉnh'],
    selectedFilters['Mặt hàng'],
    selectedFilters['Ngày BĐ'],
    selectedFilters['Ngày KT'],
    selectedTypeFilter,
    allProvinces,
    allCategories,
    productTypeOptionsData,
  ]);

  const formatDate = dateString => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  const getFilterOptions = () => [
    {label: 'Ngày BĐ', options: []},
    {label: 'Ngày KT', options: []},
    {label: 'Tỉnh', options: provinceOptions},
    {label: 'Mặt hàng', options: fruitCategory},
  ];

  const handleFilterSelect = (type, value) => {
    setIsLoading(true);

    // Reset type filter when any other filter changes
    if (type !== 'Mặt hàng') {
      setSelectedTypeFilter('Tất cả');
    }

    setSelectedFilters(prev => ({
      ...prev,
      [type]: value,
    }));

    setTimeout(() => setIsLoading(false), 300);
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

  const handleTypeSelection = selectedType => {
    setSelectedTypeFilter(selectedType);
    toggleFilter(-1); // Close dropdown
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

  // Check if all required filters are selected
  const isAllFiltersSelected = () => {
    return (
      selectedFilters['Tỉnh'] &&
      selectedFilters['Tỉnh'] !== 'Tất cả' &&
      selectedFilters['Mặt hàng'] &&
      selectedFilters['Mặt hàng'] !== 'Tất cả' &&
      selectedFilters['Ngày BĐ'] &&
      selectedFilters['Ngày KT']
    );
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

            {/* Show filter summary and type selector only when all filters are selected */}
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

                  {/* Dropdown menu */}
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

            {/* Price table */}
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
                  !isAllFiltersSelected()
                    ? 'Vui lòng chọn đầy đủ: Tỉnh, Mặt hàng, Ngày BĐ, Ngày KT'
                    : 'Không có dữ liệu phù hợp'
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

            {/* Quantity table */}
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
                    ? 'Không có dữ liệu sản lượng hôm nay'
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
