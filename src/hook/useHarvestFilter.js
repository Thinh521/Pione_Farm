import {useEffect, useState, useCallback, useMemo} from 'react';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';

import {getAllCategories} from '../api/categogyApi';
import {getAllProvinceApii} from '../api/provinceApi';
import {
  getFarmMarketPrices,
  getProductTypesByProvince,
  getTodayHarvestSummary,
} from '../api/productApi';

// Hàm debounce đơn giản
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const useHarvestFilter = (excludeTodayHarvest = false) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fruitCategory, setFruitCategory] = useState([]);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allProvinces, setAllProvinces] = useState([]);
  const [productTypeOptions, setProductTypeOptions] = useState(['Tất cả']);
  const [productTypeOptionsData, setProductTypeOptionsData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('Tất cả');
  const [collectionAndYieldData, setCollectionAndYieldData] = useState([]);
  const [todayHarvestData, setTodayHarvestData] = useState(null);
  const [exportingTable, setExportingTable] = useState(null);

  const formatDate = useCallback(dateString => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }, []);

  const fetchInitialData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [categoriesRes, provincesRes] = await Promise.all([
        getAllCategories(),
        getAllProvinceApii(),
      ]);

      setFruitCategory(['Tất cả', ...categoriesRes.data.map(c => c.name)]);
      setProvinceOptions(['Tất cả', ...provincesRes.data.map(p => p.name)]);
      setAllCategories(categoriesRes.data);
      setAllProvinces(provincesRes.data);

      if (!excludeTodayHarvest) {
        const todayRes = await getTodayHarvestSummary();
        setTodayHarvestData(todayRes.data);
      }
    } catch (err) {
      console.error('Lỗi tải dữ liệu ban đầu:', err.message);
      Alert.alert('Lỗi', 'Không thể tải dữ liệu ban đầu');
    } finally {
      setIsLoading(false);
    }
  }, [excludeTodayHarvest]);

  const fetchProductTypes = useCallback(async () => {
    const {
      Tỉnh: provinceName,
      'Ngày BĐ': startDate,
      'Ngày KT': endDate,
    } = selectedFilters;

    if (!provinceName || provinceName === 'Tất cả' || !startDate || !endDate) {
      setProductTypeOptions(['Tất cả']);
      setProductTypeOptionsData([]);
      setSelectedTypeFilter('Tất cả');
      return;
    }

    try {
      const selectedProvince = allProvinces.find(p => p.name === provinceName);
      if (!selectedProvince) return;

      const typesRes = await getProductTypesByProvince(selectedProvince._id, {
        start: formatDate(startDate),
        end: formatDate(endDate),
      });

      const typeNames = typesRes?.data?.map(t => t.name) || [];
      setProductTypeOptions(['Tất cả', ...typeNames]);
      setProductTypeOptionsData(typesRes?.data || []);
    } catch (err) {
      console.error('Lỗi lấy loại sản phẩm:', err.message);
      Alert.alert('Lỗi', 'Không thể lấy loại sản phẩm');
    }
  }, [selectedFilters, allProvinces, formatDate]);

  const fetchFilteredData = useCallback(async () => {
    try {
      setIsLoading(true);
      const {
        Tỉnh: provinceName,
        'Mặt hàng': categoryName,
        'Ngày BĐ': startDate,
        'Ngày KT': endDate,
      } = selectedFilters;

      const payload = {};

      if (provinceName && provinceName !== 'Tất cả') {
        const selectedProvince = allProvinces.find(
          p => p.name === provinceName,
        );
        if (selectedProvince) payload.provinceId = selectedProvince._id;
      }

      if (categoryName && categoryName !== 'Tất cả') {
        const selectedCategory = allCategories.find(
          c => c.name === categoryName,
        );
        if (selectedCategory) payload.categoryId = selectedCategory._id;
      }

      if (startDate && endDate) {
        payload.date = {
          start: formatDate(startDate),
          end: formatDate(endDate),
        };
      }

      if (selectedTypeFilter && selectedTypeFilter !== 'Tất cả') {
        const selectedType = productTypeOptionsData.find(
          t => t.name === selectedTypeFilter,
        );
        if (selectedType) payload.typeId = selectedType._id;
      }

      const res = await getFarmMarketPrices(payload);
      setCollectionAndYieldData(res.data || []);
    } catch (err) {
      console.error('Lỗi lấy dữ liệu giá:', err.message);
      setCollectionAndYieldData([]);
      Alert.alert('Lỗi', 'Không thể lấy dữ liệu giá');
    } finally {
      setIsLoading(false);
    }
  }, [
    selectedFilters,
    selectedTypeFilter,
    allProvinces,
    allCategories,
    productTypeOptionsData,
    formatDate,
  ]);

  const handleFilterSelect = useCallback(
    debounce((type, value) => {
      setSelectedFilters(prev => ({
        ...prev,
        [type]: value,
      }));

      if (type === 'Mặt hàng') {
        setSelectedTypeFilter('Tất cả');
      }
    }, 300),
    [],
  );

  const exportDataToExcel = useCallback(async (data, tableKey) => {
    if (!data?.length) {
      Alert.alert('Thông báo', 'Không có dữ liệu để xuất!');
      return;
    }

    try {
      setExportingTable(tableKey);

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, 'Kết quả');
      const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});

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

      await RNFS.writeFile(path, wbout, 'ascii');
      Alert.alert('Thành công', `File đã lưu tại:\n${path}`);
    } catch (err) {
      console.error('Lỗi xuất file Excel:', err);
      Alert.alert('Lỗi', 'Không thể xuất file');
    } finally {
      setExportingTable(null);
    }
  }, []);

  const isAllFiltersSelected = useMemo(() => {
    const {
      Tỉnh: province,
      'Mặt hàng': category,
      'Ngày BĐ': start,
      'Ngày KT': end,
    } = selectedFilters;

    return (
      province &&
      province !== 'Tất cả' &&
      category &&
      category !== 'Tất cả' &&
      start &&
      end
    );
  }, [selectedFilters]);

  // Các effect gọi API
  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  useEffect(() => {
    fetchProductTypes();
  }, [fetchProductTypes]);

  useEffect(() => {
    fetchFilteredData();
  }, [fetchFilteredData]);

  return {
    isLoading,
    fruitCategory,
    provinceOptions,
    selectedFilters,
    handleFilterSelect,
    collectionAndYieldData,
    todayHarvestData: excludeTodayHarvest ? null : todayHarvestData,
    productTypeOptions,
    selectedTypeFilter,
    setSelectedTypeFilter,
    exportDataToExcel,
    isAllFiltersSelected,
    exportingTable,
  };
};
