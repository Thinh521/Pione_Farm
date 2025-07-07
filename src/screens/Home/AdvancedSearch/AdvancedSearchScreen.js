import {
  ScrollView,
  Text,
  View,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';

import styles from './AdvancedSearch.styles';
import SearchAndFilterBar from '../../../components/SearchAndFilterBar/SearchAndFilterBar';
import CustomTable from '../../../components/CustomTable/CustomTable';
import {scale} from '../../../utils/scaling';
import Button from '../../../components/ui/Button/ButtonComponent';
import ChatBot from '../../../components/ChatBot/ChatBot';
import {getAllCategories} from '../../../api/categogyApi';

const FILTER_OPTIONS = [
  {label: 'Ngày BĐ', options: []},
  {label: 'Ngày KT', options: []},
  {
    label: 'Tỉnh',
    options: ['Tất cả', 'Long An', 'Tiền Giang', 'HCM', 'Hà Nội', 'An Giang'],
  },
];

const DROPDOWN_OPTIONS = [
  {label: 'Tra cứu tổng hợp', route: 'PriceComparison'},
  {label: 'Tra cứu tổng nâng cao', route: 'AdvancedSearch'},
  {label: 'Giới thiệu chung', route: 'Intro'},
  {label: 'Thị trường trong nước và ngoài nước', route: 'Market'},
  {label: 'Tin tức', route: 'News'},
];

const columns = [
  {title: 'ĐVT', key: 'unit', flex: 1},
  {title: 'Giá tại chợ', key: 'marketPrice', flex: 1},
  {title: 'Giá tại Vườn', key: 'farmPrice', flex: 1},
];

const columns_2 = [
  {title: 'Ngày tháng', key: 'date', flex: 1},
  {title: 'Nơi thu thập', key: 'province', flex: 1},
  {title: 'Số lượng', key: 'quantity', flex: 1},
];

const initialData_1 = [
  {
    id: 1,
    unit: 'KG',
    marketPrice: '15K/KG',
    farmPrice: '10K/KG',
    date: '10/7/2025',
    fruit: 'Xoài',
    province: 'Long An',
  },
  {
    id: 2,
    unit: 'KG',
    marketPrice: '15K/KG',
    farmPrice: '10K/KG',
    date: '11/7/2025',
    fruit: 'Táo',
    province: 'HCM',
  },
  {
    id: 3,
    unit: 'KG',
    marketPrice: '15K/KG',
    farmPrice: '10K/KG',
    date: '12/7/2025',
    fruit: 'Mít',
    province: 'Hà Nội',
  },
  {
    id: 4,
    unit: 'KG',
    marketPrice: '15K/KG',
    farmPrice: '10K/KG',
    date: '13/7/2025',
    fruit: 'Chuối',
    province: 'Tiền Giang',
  },
  {
    id: 5,
    unit: 'KG',
    marketPrice: '15K/KG',
    farmPrice: '10K/KG',
    date: '14/7/2025',
    fruit: 'Xoài',
    province: 'An Giang',
  },
  {
    id: 6,
    unit: 'KG',
    marketPrice: '15K/KG',
    farmPrice: '10K/KG',
    date: '15/7/2025',
    fruit: 'Táo',
    province: 'Long An',
  },
];

const initialData_2 = [
  {
    id: 1,
    unit: 'KG',
    marketPrice: '15K/KG',
    farmPrice: '10K/KG',
    date: '10/7/2025',
    fruit: 'Xoài',
    province: 'Long An',
    quantity: '100T',
  },
  {
    id: 2,
    unit: 'KG',
    marketPrice: '15K/KG',
    farmPrice: '10K/KG',
    date: '11/7/2025',
    fruit: 'Táo',
    province: 'HCM',
    quantity: '10T',
  },
  {
    id: 3,
    unit: 'KG',
    marketPrice: '15K/KG',
    farmPrice: '10K/KG',
    date: '12/7/2025',
    fruit: 'Mít',
    province: 'Hà Nội',
    quantity: '990T',
  },
  {
    id: 4,
    unit: 'KG',
    marketPrice: '15K/KG',
    farmPrice: '10K/KG',
    date: '13/7/2025',
    fruit: 'Chuối',
    province: 'Tiền Giang',
    quantity: '9T',
  },
  {
    id: 5,
    unit: 'KG',
    marketPrice: '15K/KG',
    farmPrice: '10K/KG',
    date: '14/7/2025',
    fruit: 'Xoài',
    province: 'An Giang',
    quantity: '14T',
  },
  {
    id: 6,
    unit: 'KG',
    marketPrice: '15K/KG',
    farmPrice: '10K/KG',
    date: '15/7/2025',
    fruit: 'Táo',
    province: 'Long An',
    quantity: '1T',
  },
];

const AdvancedSearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [exportingTable, setExportingTable] = useState(null);
  const [fruitCategory, setFruitCategory] = useState(['Tất cả']);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getAllCategories();
        const names = categories.data.map(c => c.name);
        setFruitCategory(['Tất cả', ...names]);
      } catch (error) {
        console.log('Lỗi khi lấy danh mục:', error.message);
      }
    };

    fetchCategories();
  }, []);

  const parseDate = date => {
    const [day, month, year] = date.split('/');
    return new Date(year, month - 1, day);
  };

  const filteredData = initialData_1.filter(item => {
    const searchMatch = item.fruit
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const startDate = selectedFilters['Ngày BĐ']
      ? parseDate(selectedFilters['Ngày BĐ'])
      : null;

    const endDate = selectedFilters['Ngày KT']
      ? parseDate(selectedFilters['Ngày KT'])
      : null;

    const itemDate = parseDate(item.date);

    const inDateRange =
      (!startDate || itemDate >= startDate) &&
      (!endDate || itemDate <= endDate);

    const provinceMatch =
      !selectedFilters['Tỉnh'] ||
      selectedFilters['Tỉnh'] === 'Tất cả' ||
      item.province === selectedFilters['Tỉnh'];

    const fruitMatch =
      !selectedFilters['Mặt hàng'] ||
      selectedFilters['Mặt hàng'] === 'Tất cả' ||
      item.fruit === selectedFilters['Mặt hàng'];

    return searchMatch && inDateRange && provinceMatch && fruitMatch;
  });

  const filteredData_2 = initialData_2.filter(item => {
    const searchMatch = item.fruit
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const startDate = selectedFilters['Ngày BĐ']
      ? parseDate(selectedFilters['Ngày BĐ'])
      : null;
    const endDate = selectedFilters['Ngày KT']
      ? parseDate(selectedFilters['Ngày KT'])
      : null;
    const itemDate = parseDate(item.date);
    const inDateRange =
      (!startDate || itemDate >= startDate) &&
      (!endDate || itemDate <= endDate);
    const provinceMatch =
      !selectedFilters['Tỉnh'] ||
      selectedFilters['Tỉnh'] === 'Tất cả' ||
      item.province === selectedFilters['Tỉnh'];
    const fruitMatch =
      !selectedFilters['Mặt hàng'] ||
      selectedFilters['Mặt hàng'] === 'Tất cả' ||
      item.fruit === selectedFilters['Mặt hàng'];

    return searchMatch && inDateRange && provinceMatch && fruitMatch;
  });

  const exportDataToExcel = async (data, tableKey) => {
    if (!data || data.length === 0) {
      Alert.alert('Không có dữ liệu để xuất!');
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
      const fileName = `ket_qua_gia_${tableKey}_${Date.now()}.xlsx`;
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
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Bạn chưa cấp quyền lưu file!');
          return;
        }
      }

      await RNFS.writeFile(path, toBinary(wbout), 'ascii');
      Alert.alert('Xuất file thành công!', `File lưu tại:\n${path}`);
    } catch (error) {
      console.error('Lỗi xuất Excel:', error);
      Alert.alert('Đã xảy ra lỗi khi xuất file Excel!');
    } finally {
      setExportingTable(null);
    }
  };

  const handleFilterSelect = (type, value) => {
    setIsLoading(true);
    setSelectedFilters(prev => ({...prev, [type]: value}));
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchAndFilterBar
          searchText={searchText}
          setSearchText={setSearchText}
          filterOptions={FILTER_OPTIONS}
          dropdownOptions={DROPDOWN_OPTIONS}
          itemOptions={fruitCategory}
          showProductButton
          placeholder="Tìm kiếm trái cây"
          onFilterSelect={handleFilterSelect}
        />
      </View>

      <ScrollView contentContainerStyle={{paddingBottom: scale(20)}}>
        <View style={styles.bodyWrapper}>
          <Text style={styles.title}>Kết quả: {filteredData.length}</Text>

          <CustomTable
            data={filteredData}
            columns={columns}
            scrollable
            bodyHeight={scale(200)}
            headerRowStyle={{width: '100%'}}
            rowStyle={{width: '100%'}}
            containerStyle={{marginBottom: scale(20)}}
          />

          <Button.Main
            title={
              exportingTable === 'table1' ? 'Đang xuất...' : 'Xuất bảng giá'
            }
            disabled={exportingTable !== null}
            onPress={() => exportDataToExcel(filteredData, 'table1')}
            style={styles.buttonExcel}
          />

          <CustomTable
            data={filteredData_2}
            columns={columns_2}
            scrollable
            bodyHeight={scale(200)}
            headerRowStyle={{width: '100%'}}
            rowStyle={{width: '100%'}}
            containerStyle={{marginBottom: scale(20)}}
          />

          <Button.Main
            title={
              exportingTable === 'table2'
                ? 'Đang xuất...'
                : 'Xuất bảng sản lượng'
            }
            disabled={exportingTable !== null}
            onPress={() => exportDataToExcel(filteredData_2, 'table2')}
            style={styles.buttonExcel}
          />
        </View>
      </ScrollView>

      <ChatBot />
    </View>
  );
};

export default AdvancedSearchScreen;
