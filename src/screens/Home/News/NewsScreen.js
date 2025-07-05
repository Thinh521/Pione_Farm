import React, {useState, useMemo} from 'react';
import {FlatList, Text, View} from 'react-native';
import Images from '../../../assets/images/Images';
import styles from './News.styles';
import SearchAndFilterBar from '../../../components/SearchAndFilterBar/SearchAndFilterBar';
import ChatBot from '../../../components/ChatBot/ChatBot';
import {scale} from '../../../utils/scaling';
import NewsList from '../../../components/NewsCard/NewsList';

const FILTER_OPTIONS = [
  {
    label: 'Giá',
    options: ['Tất cả', 'Tăng dần', 'Giảm dần'],
  },
  {
    label: 'Tỉnh',
    options: [
      'Tất cả',
      'Long An',
      'Tiền Giang',
      'HCM',
      'Hà Nội',
      'An Giang',
      'Đồng Nai',
      'Vĩnh Long',
    ],
  },
  {
    label: 'Số lượng',
    options: ['Tất cả', 'Dưới 100', '100 - 500', 'Trên 500'],
  },
];

const DROPDOWN_OPTIONS = [
  {label: 'Tra cứu tổng hợp', route: 'PriceComparison'},
  {label: 'Tra cứu nâng cao', route: 'AdvancedSearch'},
  {label: 'Giới thiệu chung', route: 'Intro'},
  {label: 'Thị trường trong nước và ngoài nước', route: 'Market'},
  {label: 'Tin tức', route: 'News'},
];

const myNewsData = [
  {
    id: '1',
    title: 'Giới thiệu Trung tâm Khuyến nông Vĩnh Long',
    description:
      'Trung tâm Khuyến nông Vĩnh Long là tổ chức sự nghiệp công lập...',
    image: Images.post_1,
    category: 'Giới thiệu',
    date: '26/06/2025',
    readTime: '5 phút đọc',
    price: 0,
    province: 'Vĩnh Long',
    quantity: 0,
  },
  {
    id: '2',
    title: 'Kỹ thuật trồng lúa bền vững',
    description: 'Hướng dẫn các kỹ thuật trồng lúa tiên tiến...',
    image: Images.post_1,
    category: 'Kỹ thuật',
    date: '25/06/2025',
    readTime: '7 phút đọc',
    price: 300000,
    province: 'An Giang',
    quantity: 50,
  },
  {
    id: '3',
    title: 'Chăn nuôi heo sạch theo tiêu chuẩn VietGAP',
    description: 'Quy trình chăn nuôi heo sạch đạt tiêu chuẩn VietGAP...',
    image: Images.post_1,
    category: 'Chăn nuôi',
    date: '24/06/2025',
    readTime: '6 phút đọc',
    price: 2000000,
    province: 'Đồng Nai',
    quantity: 20,
  },
];

const NewsScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterSelect = (type, value) => {
    setIsLoading(true);
    setSelectedFilters(prev => ({...prev, [type]: value}));
    setTimeout(() => setIsLoading(false), 300);
  };

  const filterData = useMemo(() => {
    let data = [...myNewsData];

    // Search
    if (searchText) {
      data = data.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    // Filter: Giá
    const priceFilter = selectedFilters['Giá'];
    if (priceFilter === 'Tăng dần') {
      data.sort((a, b) => a.price - b.price);
    } else if (priceFilter === 'Giảm dần') {
      data.sort((a, b) => b.price - a.price);
    }

    // Filter: Tỉnh
    const provinceFilter = selectedFilters['Tỉnh'];
    if (provinceFilter && provinceFilter !== 'Tất cả') {
      data = data.filter(item => item.province === provinceFilter);
    }

    // Filter: Số lượng
    const quantityFilter = selectedFilters['Số lượng'];
    if (quantityFilter === 'Dưới 100') {
      data = data.filter(item => item.quantity < 100);
    } else if (quantityFilter === '100 - 500') {
      data = data.filter(item => item.quantity >= 100 && item.quantity <= 500);
    } else if (quantityFilter === 'Trên 500') {
      data = data.filter(item => item.quantity > 500);
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
          dropdownOptions={DROPDOWN_OPTIONS}
          placeholder="Tìm kiếm thông tin"
          onFilterSelect={handleFilterSelect}
        />
      </View>

      <View style={styles.main}>
        <FlatList
          data={[{}]} // dummy to render sections
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={() => (
            <View>
              <Text style={styles.sectionTitle}>Tin mới</Text>
              <NewsList data={filterData} />

              <Text style={styles.sectionTitle}>Tin trong nước</Text>
              <NewsList
                data={filterData.filter(item =>
                  [
                    'Vĩnh Long',
                    'An Giang',
                    'Đồng Nai',
                    'HCM',
                    'Hà Nội',
                    'Tiền Giang',
                    'Long An',
                  ].includes(item.province),
                )}
              />

              <Text style={styles.sectionTitle}>Tin ngoài nước</Text>
              <NewsList
                data={filterData.filter(
                  item =>
                    ![
                      'Vĩnh Long',
                      'An Giang',
                      'Đồng Nai',
                      'HCM',
                      'Hà Nội',
                      'Tiền Giang',
                      'Long An',
                    ].includes(item.province),
                )}
              />
            </View>
          )}
        />
      </View>

      <ChatBot style={{bottom: scale(40)}} />
    </View>
  );
};

export default NewsScreen;
