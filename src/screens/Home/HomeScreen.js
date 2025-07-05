import React, {useMemo, useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import WalletList from './components/WalletList';
import styles from './Home.styles';
import Images from '../../assets/images/Images';
import FruitPriceList from './components/FruitPriceList';
import SearchAndFilterBar from '../../components/SearchAndFilterBar/SearchAndFilterBar';

const FILTER_OPTIONS = [
  {
    label: 'Giá',
    options: ['Tất cả', 'Tăng dần', 'Giảm dần'],
  },
  {
    label: 'Tỉnh',
    options: ['Tất cả', 'Long An', 'Tiền Giang', 'HCM', 'Hà Nội', 'An Giang'],
  },
  {
    label: 'Số lượng',
    options: ['Tất cả', 'Dưới 100', '100 - 500', 'Trên 500'],
  },
];

const walletData = [
  {
    id: 1,
    image: Images.Mango,
    name: 'Long An',
    symbol: 'Xoài',
    quantity: 350,
    price: '29,198.24',
    change: 125.1,
    chartData: [20, 18, 15, 17, 17, 19, 15, 18, 13, 12.5, 10, 11.5, 8, 9, 6],
    chartColor: '#6BBDFF',
    gradientId: '#1D82CC',
  },
  {
    id: 2,
    image: Images.Apple,
    name: 'HCM',
    symbol: 'Táo',
    quantity: 200,
    price: '8,000.12',
    change: -20.1,
    chartData: [
      1, 2, 5, 4.5, 4.5, 3, 15, 8, 12, 14, 14, 16, 12, 17, 12, 13, 13, 20,
    ],
    chartColor: '#07F8B5',
    gradientId: '#8EE04E00',
  },
  {
    id: 3,
    image: Images.Jackfruit,
    name: 'Hà Nội',
    symbol: 'Mít',
    quantity: 400,
    price: '12,500.00',
    change: 1.76,
    chartData: [20, 19, 17, 18, 18, 19, 16, 18, 10, 9, 8, 9, 7, 8, 4, 3, 2, 1],
    chartColor: '#FFC107',
    gradientId: '#FFC107',
  },
  {
    id: 4,
    image: Images.Banana,
    name: 'Tiền Giang',
    symbol: 'Chuối',
    quantity: 500,
    price: '300.10',
    change: -0.1,
    chartData: [20, 18, 15, 17, 17, 19, 15, 18, 13, 12.5, 10, 11.5, 8, 9, 6],
    chartColor: '#6BBDFF',
    gradientId: '#1D82CC',
  },
  {
    id: 5,
    image: Images.AustralianMango,
    name: 'An Giang',
    symbol: 'Xoài',
    quantity: 150,
    price: '205.90',
    change: -272.65,
    chartData: [
      1, 2, 5, 4.5, 4.5, 3, 15, 8, 12, 14, 14, 16, 12, 17, 12, 13, 13, 20,
    ],
    chartColor: '#07F8B5',
    gradientId: '#8EE04E00',
  },
];

const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedFilters, setSelectedFilters] = useState('');

  const filteredWalletData = useMemo(() => {
    let data = [...walletData];

    // Tìm kiếm
    if (searchText) {
      data = data.filter(
        item =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.symbol.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    // Lọc theo giá
    if (selectedFilters['Giá'] && selectedFilters['Giá'] !== 'Tất cả') {
      data = data.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(',', ''));
        const priceB = parseFloat(b.price.replace(',', ''));
        return selectedFilters['Giá'] === 'Tăng dần'
          ? priceA - priceB
          : priceB - priceA;
      });
    }

    // Lọc theo tỉnh
    if (selectedFilters['Tỉnh'] && selectedFilters['Tỉnh'] !== 'Tất cả') {
      data = data.filter(item => item.name === selectedFilters['Tỉnh']);
    }

    // Lọc theo số lượng
    if (
      selectedFilters['Số lượng'] &&
      selectedFilters['Số lượng'] !== 'Tất cả'
    ) {
      data = data.filter(item => {
        if (selectedFilters['Số lượng'] === 'Dưới 100')
          return item.quantity < 100;
        if (selectedFilters['Số lượng'] === '100 - 500')
          return item.quantity >= 100 && item.quantity <= 500;
        return item.quantity > 500;
      });
    }

    return data;
  }, [searchText, selectedFilters]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchAndFilterBar
          searchText={searchText}
          setSearchText={setSearchText}
          filterOptions={FILTER_OPTIONS}
          showProductButton={false}
          placeholder="Tìm kiếm trái cây"
          onFilterSelect={(type, value) =>
            setSelectedFilters(prev => ({...prev, [type]: value}))
          }
        />
      </View>

      <FlatList
        data={[{}]}
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={() => (
          <>
            <Text style={styles.title}>Danh sách</Text>
            <WalletList data={filteredWalletData} />
            <FruitPriceList />
          </>
        )}
      />
    </View>
  );
};

export default HomeScreen;
