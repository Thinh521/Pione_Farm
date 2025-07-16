import React, {useState, useMemo, useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import styles from './News.styles';
import SearchAndFilterBar from '../../../components/SearchAndFilterBar/SearchAndFilterBar';
import ChatBot from '../../../components/ChatBot/ChatBot';
import {scale} from '../../../utils/scaling';
import NewsList from '../../../components/NewsCard/NewsList';
import useNewsStore from '../../../store/useNewsStore';

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

const NewsScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const {newsData, loading, fetchNewsData, hasFetched, error} = useNewsStore();

  useEffect(() => {
    if (!hasFetched) {
      fetchNewsData();
    }
  }, []);

  const handleFilterSelect = (type, value) => {
    setIsLoading(true);
    setSelectedFilters(prev => ({...prev, [type]: value}));
    setTimeout(() => setIsLoading(false), 300);
  };

  const filterData = useMemo(() => {
    let data = [...newsData];

    if (searchText) {
      data = data.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    const priceFilter = selectedFilters['Giá'];
    if (priceFilter === 'Tăng dần') {
      data.sort((a, b) => a.price - b.price);
    } else if (priceFilter === 'Giảm dần') {
      data.sort((a, b) => b.price - a.price);
    }

    const provinceFilter = selectedFilters['Tỉnh'];
    if (provinceFilter && provinceFilter !== 'Tất cả') {
      data = data.filter(item => item.province === provinceFilter);
    }

    const quantityFilter = selectedFilters['Số lượng'];
    if (quantityFilter === 'Dưới 100') {
      data = data.filter(item => item.quantity < 100);
    } else if (quantityFilter === '100 - 500') {
      data = data.filter(item => item.quantity >= 100 && item.quantity <= 500);
    } else if (quantityFilter === 'Trên 500') {
      data = data.filter(item => item.quantity > 500);
    }

    return data;
  }, [searchText, selectedFilters, newsData]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchAndFilterBar
          searchText={searchText}
          setSearchText={setSearchText}
          filterOptions={FILTER_OPTIONS}
          placeholder="Tìm kiếm thông tin"
          onFilterSelect={handleFilterSelect}
        />
      </View>

      <View style={styles.main}>
        <FlatList
          data={[{}]}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : `item-${index}`
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: scale(20),
          }}
          renderItem={() => {
            const sortedData = [...filterData]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 5);

            const domesticNews = sortedData
              .filter(item => item.type === 'trongnuoc')
              .slice(0, 5);

            const internationalNews = sortedData
              .filter(item => item.type === 'ngoainuoc')
              .slice(0, 5);

            return (
              <View>
                <Text style={styles.sectionTitle}>Tin mới</Text>
                <NewsList data={sortedData} />

                <Text style={styles.sectionTitle}>Tin trong nước</Text>
                <NewsList data={domesticNews} />

                <Text style={styles.sectionTitle}>Tin ngoài nước</Text>
                <NewsList data={internationalNews} />
              </View>
            );
          }}
        />
      </View>

      <ChatBot style={{bottom: scale(40)}} />
    </View>
  );
};

export default NewsScreen;
