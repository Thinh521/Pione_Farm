import {useEffect, useState} from 'react';
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

  const formatDate = dateString => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);

        const categoriesRes = await getAllCategories();
        const categoryNames = categoriesRes.data.map(c => c.name);

        setFruitCategory(['Tất cả', ...categoryNames]);
        setAllCategories(categoriesRes.data);

        const provincesRes = await getAllProvinceApii();
        const provinceNames = provincesRes.data.map(p => p.name);
        setProvinceOptions(['Tất cả', ...provinceNames]);
        setAllProvinces(provincesRes.data);

        if (!excludeTodayHarvest) {
          const todayRes = await getTodayHarvestSummary();
          setTodayHarvestData(todayRes.data);
        }
      } catch (err) {
        console.error('Lỗi tải dữ liệu ban đầu:', err.message);
        Alert.alert('Lỗi', 'Không thể tải dữ liệu');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchProductTypes = async () => {
      const provinceName = selectedFilters['Tỉnh'];
      const startDate = selectedFilters['Ngày BĐ'];
      const endDate = selectedFilters['Ngày KT'];

      setProductTypeOptions(['Tất cả']);
      setProductTypeOptionsData([]);
      setSelectedTypeFilter('Tất cả');

      if (!provinceName || provinceName === 'Tất cả' || !startDate || !endDate)
        return;

      try {
        const selectedProvince = allProvinces.find(
          p => p.name === provinceName,
        );
        if (!selectedProvince) return;

        const typesRes = await getProductTypesByProvince(selectedProvince._id, {
          start: formatDate(startDate),
          end: formatDate(endDate),
        });

        if (typesRes?.data?.length > 0) {
          const typeNames = typesRes.data.map(t => t.name);
          setProductTypeOptions(['Tất cả', ...typeNames]);
          setProductTypeOptionsData(typesRes.data);
        }
      } catch (err) {
        console.error('Lỗi lấy loại sản phẩm:', err.message);
      }
    };

    fetchProductTypes();
  }, [
    selectedFilters['Tỉnh'],
    selectedFilters['Ngày BĐ'],
    selectedFilters['Ngày KT'],
    allProvinces,
  ]);

  useEffect(() => {
    const fetchFilteredData = async () => {
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
        if (!selectedProvince || !selectedCategory) return;

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

        if (selectedType) {
          payload.typeId = selectedType._id;
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

  const handleFilterSelect = (type, value) => {
    setIsLoading(true);
    if (type !== 'Mặt hàng') {
      setSelectedTypeFilter('Tất cả');
    }
    setSelectedFilters(prev => ({
      ...prev,
      [type]: value,
    }));
    setTimeout(() => setIsLoading(false), 300);
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
      Alert.alert('Thành công', `File đã lưu tại:\n${path}`);
    } catch (err) {
      console.error('Lỗi xuất file Excel:', err);
      Alert.alert('Lỗi', 'Không thể xuất file');
    } finally {
      setExportingTable(null);
    }
  };

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
  };
};
