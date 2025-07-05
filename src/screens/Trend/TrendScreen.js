import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import styles from './Trend.styles';
import Images from '../../assets/images/Images';
import SearchAndFilterBar from '../../components/SearchAndFilterBar/SearchAndFilterBar';
import WalletList from '../Home/components/WalletList';
import {scale} from '../../utils/scaling';

const FILTER_OPTIONS = [
  {
    label: 'Tất cả',
    options: ['Tất cả', 'Xu hướng', 'Hôm nay', 'Hôm qua'],
  },
  {
    label: '12/12',
    options: ['Tất cả', 'Long An', 'Tiền Giang', 'HCM', 'Hà Nội', 'An Giang'],
  },
  {
    label: 'Giờ',
    options: ['Tất cả', 'Dưới 100', '100 - 500', 'Trên 500'],
  },
];

const DROPDOWN_OPTIONS = [
  {label: 'Tra cứu tổng hợp', route: 'PriceComparison'},
  {label: 'Tra cứu tổng nâng cao', route: 'AdvancedSearch'},
  {label: 'Giới thiệu chung', route: 'Intro'},
  {label: 'Thị trường trong nước và ngoài nước', route: 'Market'},
  {label: 'Tin tức', route: 'News'},
];

const trendData = [
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
];

const todayData = [
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
    id: 3,
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
];

const yesterdayData = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
];

const TrendScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});

  const renderSections = () => {
    const section = selectedFilters['Tất cả'] || 'Tất cả';

    const renderWalletSection = (title, data) => (
      <View style={styles.section}>
        <Text style={styles.title}>{title}</Text>
        <WalletList
          data={data}
          searchText={searchText}
          selectedFilters={selectedFilters}
        />
      </View>
    );

    switch (section) {
      case 'Xu hướng':
        return renderWalletSection('Xu hướng', trendData);
      case 'Hôm nay':
        return renderWalletSection('Hôm nay', todayData);
      case 'Hôm qua':
        return renderWalletSection('Hôm qua', yesterdayData);
      default:
        return (
          <>
            {renderWalletSection('Xu hướng', trendData)}
            {renderWalletSection('Hôm nay', todayData)}
            {renderWalletSection('Hôm qua', yesterdayData)}
          </>
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchAndFilterBar
          searchText={searchText}
          setSearchText={setSearchText}
          filterOptions={FILTER_OPTIONS}
          dropdownOptions={DROPDOWN_OPTIONS}
          showProductButton={false}
          placeholder="Tìm kiếm thông tin"
          onFilterSelect={(type, value) =>
            setSelectedFilters(prev => ({...prev, [type]: value}))
          }
        />
      </View>

      <ScrollView
        contentContainerStyle={{paddingBottom: scale(80)}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.main}>{renderSections()}</View>
      </ScrollView>
    </View>
  );
};

export default TrendScreen;
