import React, {useState, useMemo, useEffect} from 'react';
import {useQuery} from '@tanstack/react-query';
import {FlatList, Text, View} from 'react-native';
import styles from './News.styles';
import SearchAndFilterBar from '~/components/SearchAndFilterBar/SearchAndFilterBar';
import ChatBot from '~/components/ChatBot/ChatBot';
import {scale} from '~/utils/scaling';
import NewsList from '~/components/NewsCard/NewsList';
import useNewsStore from '~/store/useNewsStore';
import NewsSkeleton from '~/components/Skeleton/NewsSkeleton';
import {getAllProvinceApii} from '~/api/provinceApi';
import {useSearchAndFilter} from '~/hook/useSearch';

const NewsScreen = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [date, setDate] = useState(null);

  const {newsData, loading, fetchNewsData, hasFetched, error} = useNewsStore();

  const {
    data: provinceList = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['provinces'],
    queryFn: getAllProvinceApii,
    select: res => res.data,
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (!hasFetched) {
      fetchNewsData();
    }
  }, []);

  useEffect(() => {
    setProvinceOptions(['Tất cả', ...provinceList.map(p => p.name)]);
  }, [provinceList]);

  const enrichedNews = useMemo(() => {
    return newsData.map(item => {
      const province = provinceList.find(p => p._id === item.provinceId);
      return {
        ...item,
        provinceName: province?.name || '',
        province: province?._id || '',
      };
    });
  }, [newsData, provinceList]);

  const filterOptions = useMemo(() => {
    return [
      {label: 'Tin tức', options: ['Tất cả', 'Trong nước', 'Ngoài nước']},
      {label: 'Ngày', options: []},
      {label: 'Tỉnh', options: provinceOptions},
    ];
  }, [provinceOptions]);

  const {filteredData, searchKeyword, setSearchKeyword} = useSearchAndFilter({
    data: enrichedNews,
    searchableFields: ['title', 'summary'],
    startDate: date,
    endDate: date,
    filters: selectedFilters,
  });

  const handleFilterSelect = (type, value) => {
    setSelectedFilters(prev => ({...prev, [type]: value}));

    if (type === 'Ngày') {
      const [day, month, year] = value.split('/');
      setDate(new Date(`${year}-${month}-${day}`));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchAndFilterBar
          selectedFilters={selectedFilters}
          searchText={searchKeyword}
          setSearchText={setSearchKeyword}
          filterOptions={filterOptions}
          placeholder="Tìm kiếm thông tin"
          onFilterSelect={handleFilterSelect}
          onDateChange={date => {
            setDate(date);
          }}
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
            const sortedData = [...filteredData].sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
            );

            const domesticNews = sortedData
              .filter(item => item.type === 'trongnuoc')
              .slice(0, 5);

            const internationalNews = sortedData
              .filter(item => item.type === 'ngoainuoc')
              .slice(0, 5);

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
