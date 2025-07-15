import {FlatList, Text, View} from 'react-native';
import React, {useState} from 'react';
import styles from './Market.styles';
import SearchAndFilterBar from '../../../components/SearchAndFilterBar/SearchAndFilterBar';
import FruitPriceList from '../components/FruitPriceList';
import {scale} from '../../../utils/scaling';
import ChatBot from '../../../components/ChatBot/ChatBot';

const fruitData = [
  {
    name: 'Xoài Cát Chu',
    price: 25000,
    origin: 'Trong nước',
    province: 'Tiền Giang',
  },
  {name: 'Xoài Keo', price: 18000, origin: 'Trong nước'},
  {name: 'Xoài Tượng', price: 30000, origin: 'Trong nước'},
  {name: 'Xoài Úc', price: 45000, origin: 'Ngoài nước'},
  {name: 'Xoài Thái Lan', price: 40000, origin: 'Ngoài nước'},
  {
    name: 'Thanh Long Ruột Đỏ',
    price: 22000,
    origin: 'Trong nước',
    province: 'Bình Thuận',
  },
  {
    name: 'Thanh Long Ruột Trắng',
    price: 20000,
    origin: 'Trong nước',
    province: 'Long An',
  },
  {name: 'Táo Mỹ', price: 55000, origin: 'Ngoài nước'},
  {name: 'Táo Pháp', price: 60000, origin: 'Ngoài nước'},
  {name: 'Cam Sành', price: 27000, origin: 'Trong nước', province: 'Hậu Giang'},
  {name: 'Cam Mỹ', price: 65000, origin: 'Ngoài nước'},
  {
    name: 'Nho Ninh Thuận',
    price: 35000,
    origin: 'Trong nước',
    province: 'Ninh Thuận',
  },
  {name: 'Nho Mỹ', price: 70000, origin: 'Ngoài nước'},
  {
    name: 'Chuối Tiêu',
    price: 15000,
    origin: 'Trong nước',
    province: 'Đồng Nai',
  },
  {name: 'Chuối Cau', price: 18000, origin: 'Trong nước'},
  {name: 'Lê Hàn Quốc', price: 65000, origin: 'Ngoài nước'},
  {name: 'Lê Trung Quốc', price: 35000, origin: 'Ngoài nước'},
  {
    name: 'Bưởi Da Xanh',
    price: 40000,
    origin: 'Trong nước',
    province: 'Bến Tre',
  },
  {
    name: 'Bưởi Năm Roi',
    price: 38000,
    origin: 'Trong nước',
    province: 'Vĩnh Long',
  },
  {
    name: 'Dưa Hấu Long An',
    price: 18000,
    origin: 'Trong nước',
    province: 'Long An',
  },
];

const FILTER_OPTIONS = [
  {
    label: 'Xuất xứ',
    options: ['Tất cả', 'Trong nước', 'Ngoài nước'],
  },
  {
    label: 'Trái cây',
    options: ['Tất cả', 'Xoài', 'Táo', 'Mít', 'Chuối'],
  },
  {
    label: 'Tỉnh',
    options: ['Tất cả', 'Long An', 'Tiền Giang', 'HCM', 'Hà Nội', 'An Giang'],
  },
];

const MarketScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterSelect = (type, value) => {
    setIsLoading(true);
    setSelectedFilters(prev => ({...prev, [type]: value}));
    setTimeout(() => setIsLoading(false), 500);
  };

  const filteredData = fruitData.filter(item => {
    const searchMatch = item.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const origin = selectedFilters['Xuất xứ'];
    const originFilter =
      !origin ||
      origin === 'Tất cả' ||
      (origin === 'Trong nước' && item.origin === 'Trong nước') ||
      (origin === 'Ngoài nước' && item.origin === 'Ngoài nước');

    const fruit = selectedFilters['Trái cây'];
    const fruitFilter =
      !fruit ||
      fruit === 'Tất cả' ||
      item.name.toLowerCase().includes(fruit.toLowerCase());

    const province = selectedFilters['Tỉnh'];
    const provinceFilter = !province || province === 'Tất cả'; // Chưa có field `province` nên luôn true

    return searchMatch && originFilter && fruitFilter && provinceFilter;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchAndFilterBar
          searchText={searchText}
          setSearchText={setSearchText}
          filterOptions={FILTER_OPTIONS}
          placeholder="Tìm kiếm thị trường"
          onFilterSelect={handleFilterSelect}
        />
      </View>

      <FlatList
        data={[{}]}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={() => (
          <View style={styles.main}>
            <Text style={styles.title}>Bảng giá Xoài</Text>

            <FlatList
              data={filteredData.slice(0, 5)}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item}) => (
                <View style={styles.row}>
                  <View style={styles.nameCol}>
                    <Text style={styles.itemName}>{item.name}</Text>
                  </View>
                  <View style={styles.unitCol}>
                    <Text style={styles.unit}>đ/Kg</Text>
                  </View>
                  <View style={styles.priceCol}>
                    <Text style={styles.price}>
                      {item.price.toLocaleString('vi-VN')}
                    </Text>
                    <Text style={styles.currency}>VNĐ</Text>
                  </View>
                </View>
              )}
            />

            <View style={{marginTop: scale(16)}}>
              <FruitPriceList />
            </View>
          </View>
        )}
      />

      <ChatBot style={{bottom: scale(40)}} />
    </View>
  );
};

export default MarketScreen;
