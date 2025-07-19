import React, {useState, useMemo, useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import styles from './News.styles';
import SearchAndFilterBar from '~/components/SearchAndFilterBar/SearchAndFilterBar';
import ChatBot from '~/components/ChatBot/ChatBot';
import {scale} from '~/utils/scaling';
import NewsList from '~/components/NewsCard/NewsList';
import useNewsStore from '~/store/useNewsStore';
import NewsSkeleton from '~/components/Skeleton/NewsSkeleton';

const FILTER_OPTIONS = [
  {label: 'Ngày BĐ', options: []},
  {label: 'Ngày KT', options: []},
  {label: 'Tỉnh', options: ['Tất cả', 'Tăng dần', 'Giảm dần']},
];

const NewsScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});

  const {newsData, loading, fetchNewsData, hasFetched, error} = useNewsStore();

  useEffect(() => {
    if (!hasFetched) {
      fetchNewsData();
    }
  }, []);

  const handleFilterSelect = (type, value) => {
    setSelectedFilters(prev => ({...prev, [type]: value}));
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
            item._id?.toString() || `item-${index}`
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: scale(20),
            paddingBottom: scale(170),
          }}
          renderItem={() => {
            const sortedData = [...filterData].sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
            );

            const domesticNews = sortedData
              .filter(item => item.type === 'trongnuoc')
              .slice(0, 5);

            const internationalNews = sortedData
              .filter(item => item.type === 'ngoainuoc')
              .slice(0, 5);

            console.log('sortedData', sortedData);
            console.log('domesticNews', domesticNews);
            console.log('internationalNews', internationalNews);

            return (
              <View>
                <Text style={styles.sectionTitle}>Tin mới</Text>
                {loading && !hasFetched ? (
                  <NewsSkeleton itemCount={sortedData} />
                ) : (
                  <NewsList data={sortedData} />
                )}

                <Text style={styles.sectionTitle}>Tin trong nước</Text>
                {loading && !hasFetched ? (
                  <NewsSkeleton itemCount={domesticNews} />
                ) : (
                  <NewsList data={domesticNews} />
                )}

                <Text style={styles.sectionTitle}>Tin ngoài nước</Text>
                {loading && !hasFetched ? (
                  <NewsSkeleton itemCount={internationalNews} />
                ) : (
                  <NewsList data={internationalNews} />
                )}
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
