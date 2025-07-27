import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {getIntroNews} from '~/api/newsApi';
import styles from './Intro.styles';
import {scale} from '~/utils/scaling';
import SearchAndFilterBar from '~/components/SearchAndFilterBar/SearchAndFilterBar';
import ChatBot from '~/components/ChatBot/ChatBot';
import {getAccessToken} from '~/utils/storage/tokenStorage';
import NewsSkeleton from '~/components/Skeleton/NewsSkeleton';
import {useSearchAndFilter} from '~/hook/useSearch';
import NewsList from '~/components/NewsCard/NewsList';
import useProvince from '~/hook/useProvince';
import ErrorView from '~/components/ErrorView/ErrorView';

const INITIAL_COUNT = 5;
const LOAD_MORE_COUNT = 5;

const IntroScreen = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [accessToken, setAccessToken] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const fetchAccessToken = useCallback(async () => {
    const token = await getAccessToken();
    setAccessToken(token);
  }, []);

  useEffect(() => {
    fetchAccessToken();
  }, [fetchAccessToken]);

  const {
    data: newsResponse = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['intro-news'],
    queryFn: () => getIntroNews(accessToken),
    enabled: !!accessToken,
    staleTime: 5 * 60 * 1000,
    onSuccess: () => {
      setVisibleCount(INITIAL_COUNT);
    },
  });

  const {provinceOptions, provinceList} = useProvince();

  const enrichedNews = useMemo(() => {
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

  const visibleItems = useMemo(() => {
    return filteredData.slice(0, visibleCount);
  }, [filteredData, visibleCount]);

  const handleFilterSelect = useCallback((type, value) => {
    setSelectedFilters(prev => ({...prev, [type]: value}));
    const [day, month, year] = value.split('/');
    const parsedDate = new Date(`${year}-${month}-${day}`);
    if (type === 'Ngày BĐ') setStartDate(parsedDate);
    if (type === 'Ngày KT') setEndDate(parsedDate);
  }, []);

  const handleLoadMore = () => {
    if (visibleCount < filteredData.length) {
      setVisibleCount(prev => prev + LOAD_MORE_COUNT);
    }
  };

  const renderFooter = () => {
    if (isLoading || !accessToken) {
      return <NewsSkeleton itemCount={5} />;
    }
    if (isError) {
      return <ErrorView />;
    }
    if (visibleItems.length === 0) {
      return (
        <View style={styles.visiContainer}>
          <Text style={styles.visiText}>Không tìm thấy bài viết phù hợp.</Text>
        </View>
      );
    }
    return null;
  };

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
        data={visibleItems}
        keyExtractor={item => item._id || item.title}
        renderItem={({item}) => <NewsList data={[item]} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0}
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Tin tức & Thông tin</Text>
            <Text style={styles.headerSubtitle}>
              Cập nhật thông tin mới nhất về nông nghiệp
            </Text>
          </View>
        }
        ListFooterComponent={renderFooter()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: scale(20),
          paddingInline: scale(16),
        }}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={10}
        removeClippedSubviews
      />

      <ChatBot style={{bottom: scale(40)}} />
    </View>
  );
};

export default memo(IntroScreen);
