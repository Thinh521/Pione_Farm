import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {getIntroNews} from '~/api/newsApi';
import {getAllProvinceApii} from '~/api/provinceApi';
import styles from './Intro.styles';
import {scale} from '~/utils/scaling';
import SearchAndFilterBar from '~/components/SearchAndFilterBar/SearchAndFilterBar';
import ChatBot from '~/components/ChatBot/ChatBot';
import {getAccessToken} from '~/utils/storage/tokenStorage';
import NewsSkeleton from '~/components/Skeleton/NewsSkeleton';
import {useSearchAndFilter} from '~/hook/useSearch';
import NewsList from '~/components/NewsCard/NewsList';

const EmptyComponent = ({message}) => (
  <View style={{alignItems: 'center', marginTop: scale(40)}}>
    <Text style={{fontSize: scale(14), color: '#888'}}>{message}</Text>
  </View>
);

const IntroScreen = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [accessToken, setAccessToken] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [provinceOptions, setProvinceOptions] = useState([]);

  useEffect(() => {
    (async () => {
      const token = await getAccessToken();
      setAccessToken(token);
    })();
  }, []);

  const {data: newsResponse = [], isLoading} = useQuery({
    queryKey: ['intro-news'],
    queryFn: () => getIntroNews(accessToken),
    enabled: !!accessToken,
    staleTime: 5 * 60 * 1000,
  });

  const {data: provinceList = []} = useQuery({
    queryKey: ['provinces'],
    queryFn: getAllProvinceApii,
    select: res => res.data,
    staleTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    if (provinceList.length) {
      setProvinceOptions(['Tất cả', ...provinceList.map(p => p.name)]);
    }
  }, [provinceList]);

  const enrichedNews = useMemo(() => {
    if (!newsResponse.length) return [];
    return newsResponse.map(item => {
      const province = provinceList.find(p => p._id === item.provinceId);
      return {
        ...item,
        provinceName: province?.name || '',
        province: province?._id || '',
      };
    });
  }, [newsResponse, provinceList]);

  const filterOptions = useMemo(
    () => [
      {label: 'Ngày BĐ', options: []},
      {label: 'Ngày KT', options: []},
      {label: 'Tỉnh', options: provinceOptions},
    ],
    [provinceOptions],
  );

  const {filteredData, searchKeyword, setSearchKeyword} = useSearchAndFilter({
    data: enrichedNews,
    searchableFields: ['title', 'summary'],
    startDate,
    endDate,
    filters: selectedFilters,
  });

  const handleFilterSelect = useCallback((type, value) => {
    setSelectedFilters(prev => ({...prev, [type]: value}));
    const [day, month, year] = value.split('/');
    const parsedDate = new Date(`${year}-${month}-${day}`);
    if (type === 'Ngày BĐ') setStartDate(parsedDate);
    if (type === 'Ngày KT') setEndDate(parsedDate);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchAndFilterBar
          searchText={searchKeyword}
          setSearchText={setSearchKeyword}
          selectedFilters={selectedFilters}
          filterOptions={filterOptions}
          placeholder="Tìm kiếm bài viết"
          onFilterSelect={handleFilterSelect}
          onDateChange={(start, end) => {
            setStartDate(start);
            setEndDate(end);
          }}
        />
      </View>

      <FlatList
        data={[]}
        keyExtractor={() => 'intro-header'}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Tin tức & Thông tin</Text>
              <Text style={styles.headerSubtitle}>
                Cập nhật thông tin mới nhất về nông nghiệp
              </Text>
            </View>

            {isLoading || !accessToken ? (
              <NewsSkeleton itemCount={6} />
            ) : filteredData.length === 0 ? (
              <EmptyComponent message="Không tìm thấy tin tức phù hợp." />
            ) : (
              <NewsList data={filteredData} />
            )}
          </View>
        }
      />

      <ChatBot style={{bottom: scale(40)}} />
    </View>
  );
};

export default IntroScreen;
