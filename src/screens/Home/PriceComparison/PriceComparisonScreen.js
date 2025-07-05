import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import FastImage from 'react-native-fast-image';

import {DownIcon} from '../../../assets/icons/Icons';
import {Colors} from '../../../theme/theme';
import {scale} from '../../../utils/scaling';
import Images from '../../../assets/images/Images';
import styles from './PriceComparison.styles';

import SearchAndFilterBar from '../../../components/SearchAndFilterBar/SearchAndFilterBar';
import CustomTable from '../../../components/CustomTable/CustomTable';
import ChatBot from '../../../components/ChatBot/ChatBot';
import Button from '../../../components/ui/Button/ButtonComponent';

const FILTER_OPTIONS = [
  {label: 'Ngày BĐ', options: []},
  {label: 'Ngày KT', options: []},
  {
    label: 'Tỉnh',
    options: ['Tất cả', 'Long An', 'Tiền Giang', 'HCM', 'Hà Nội', 'An Giang'],
  },
];

const FRUIT_OPTIONS = ['Tất cả', 'Xoài', 'Táo', 'Mít', 'Chuối'];

const columns = [
  {title: 'ĐVT', key: 'unit', flex: 1},
  {title: 'Giá tại chợ', key: 'marketPrice', flex: 1},
  {title: 'Giá tại Vườn', key: 'farmPrice', flex: 1},
];

const initialData = [
  {
    id: 1,
    unit: '10K/KG',
    marketPrice: '15K/KG',
    farmPrice: '10K/KG',
    date: '10/7/2025',
    fruit: 'Xoài',
    province: 'Long An',
  },
  {
    id: 2,
    unit: '10K/KG',
    marketPrice: '15K/KG',
    farmPrice: '10K/KG',
    date: '11/7/2025',
    fruit: 'Táo',
    province: 'HCM',
  },
  {
    id: 3,
    unit: '10K/KG',
    marketPrice: '15K/KG',
    farmPrice: '10K/KG',
    date: '12/7/2025',
    fruit: 'Mít',
    province: 'Hà Nội',
  },
  {
    id: 4,
    unit: '10K/KG',
    marketPrice: '15K/KG',
    farmPrice: '10K/KG',
    date: '13/7/2025',
    fruit: 'Chuối',
    province: 'Tiền Giang',
  },
  {
    id: 5,
    unit: '10K/KG',
    marketPrice: '15K/KG',
    farmPrice: '10K/KG',
    date: '14/7/2025',
    fruit: 'Xoài',
    province: 'An Giang',
  },
  {
    id: 6,
    unit: '10K/KG',
    marketPrice: '15K/KG',
    farmPrice: '10K/KG',
    date: '15/7/2025',
    fruit: 'Táo',
    province: 'Long An',
  },
];

const PriceComparisonScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const parseDate = date => {
    if (!date) return null;
    const [day, month, year] = date.split('/');
    return new Date(year, month - 1, day);
  };

  const filteredData = initialData.filter(item => {
    const searchMatch = item.fruit
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const startDate = parseDate(selectedFilters['Ngày BĐ']);
    const endDate = parseDate(selectedFilters['Ngày KT']);
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

  const handleFilterSelect = (type, value) => {
    setIsLoading(true);
    setSelectedFilters(prev => ({...prev, [type]: value}));
    setTimeout(() => setIsLoading(false), 500);
  };

  const exportDataToExcel = async data => {
    if (!data || data.length === 0) {
      Alert.alert('Không có dữ liệu để xuất!');
      return;
    }

    try {
      setIsExporting(true);

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, 'Kết quả');
      const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});

      const toBinary = str =>
        str
          .split('')
          .map(c => String.fromCharCode(c.charCodeAt(0)))
          .join('');

      const fileName = `ket_qua_gia_${Date.now()}.xlsx`;
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
      setIsExporting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchAndFilterBar
          searchText={searchText}
          setSearchText={setSearchText}
          filterOptions={FILTER_OPTIONS}
          itemOptions={FRUIT_OPTIONS}
          showProductButton
          placeholder="Tìm kiếm trái cây"
          onFilterSelect={handleFilterSelect}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bodyWrapper}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Kết quả: {filteredData.length}</Text>

            <View style={styles.buttonContainer}>
              <Button.Select
                title={`${selectedFilters['Ngày BĐ'] || '--'} - ${
                  selectedFilters['Ngày KT'] || '--'
                }`}
                style={{flex: 2}}
              />
              <Button.Select
                title={selectedFilters['Mặt hàng'] || 'Tất cả'}
                style={{flex: 1}}
                iconRight={
                  <DownIcon style={{color: Colors.white, width: scale(20)}} />
                }
              />
            </View>

            {isLoading ? (
              <ActivityIndicator
                style={{height: scale(200)}}
                size="large"
                color="#4CAF50"
              />
            ) : filteredData.length > 0 ? (
              <CustomTable
                data={filteredData}
                columns={columns}
                scrollable
                bodyHeight={scale(200)}
                headerRowStyle={{width: '100%'}}
                rowStyle={{width: '100%'}}
                containerStyle={{marginBottom: scale(20)}}
              />
            ) : (
              <Text style={styles.noResultText}>
                Không tìm thấy kết quả phù hợp.
              </Text>
            )}
          </View>

          <Button.Main
            title={isExporting ? 'Đang xuất...' : 'Xuất Excel'}
            disabled={isExporting}
            onPress={() => exportDataToExcel(filteredData)}
            style={styles.buttonExcel}
          />

          <View style={styles.footer}>
            <FastImage
              source={Images.PriceComparison_1}
              style={styles.backgroundPriceComparison_1}
              resizeMode={FastImage.resizeMode.contain}
            />
            <FastImage
              source={Images.PriceComparison_3}
              style={styles.backgroundPriceComparison_3}
              resizeMode={FastImage.resizeMode.contain}
            />
            <FastImage
              source={Images.PriceComparison_4}
              style={styles.backgroundPriceComparison_4}
              resizeMode={FastImage.resizeMode.contain}
            />
            <View style={styles.trendWrapper}>
              <FastImage
                source={Images.PriceComparison_2}
                style={styles.backgroundPriceComparison_2}
                resizeMode={FastImage.resizeMode.contain}>
                <View style={styles.footerContent}>
                  <Text style={styles.footerContentTitle}>Xu hướng</Text>
                  <Text style={styles.footerContentTitle_2}>
                    Xu hướng thị trường trái cây tại Việt Nam
                  </Text>
                  <Text
                    style={styles.footerContentDescription}
                    numberOfLines={6}>
                    Xu hướng Diễn giả Tăng xuất khẩu trái cây chế biến Nhu cầu
                    thế giới tăng cao với sản phẩm sấy khô, đông lạnh, đóng hộp
                    (xoài, mít, sầu riêng...) Truy xuất nguồn gốc & nông nghiệp
                    số. Đòi hỏi mã vùng trồng, QR code truy xuất để đạt chuẩn
                    xuất khẩu. Bán lẻ trực tuyến tăng mạnh. Mở rộng thị trường
                    mới. Ứng dụng bảo quản sau thu hoạch.
                  </Text>
                </View>
              </FastImage>
            </View>
            <FastImage
              source={Images.PriceComparison_5}
              style={styles.backgroundPriceComparison_5}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
        </View>
      </ScrollView>

      <ChatBot />
    </View>
  );
};

export default PriceComparisonScreen;
