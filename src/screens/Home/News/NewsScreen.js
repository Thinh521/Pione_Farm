import React, {useState, useMemo, useCallback, memo} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import styles from './News.styles';
import SearchAndFilterBar from '~/components/SearchAndFilterBar/SearchAndFilterBar';
import ChatBot from '~/components/ChatBot/ChatBot';
import {scale} from '~/utils/scaling';
import NewsList from '~/components/NewsCard/NewsList';
import NewsSkeleton from '~/components/Skeleton/NewsSkeleton';
import {getAccessToken} from '~/utils/storage/tokenStorage';
import {getNewsList} from '~/api/newsApi';
import {useSearchAndFilter} from '~/hook/useSearch';
import useProvince from '~/hook/useProvince';
import ErrorView from '~/components/ErrorView/ErrorView';

const Section = memo(({title, subtitle, data = [], loading}) => {
  if (!data.length && !loading) return null;
  return (
    <View style={{marginBottom: scale(20)}}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.headerSubtitle}>{subtitle}</Text>
      {loading ? <NewsSkeleton itemCount={5} /> : <NewsList data={data} />}
    </View>
  );
});

const NewsScreen = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [date, setDate] = useState(null);

  const {provinceOptions, provinceList} = useProvince();

  const {
    data: newsData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['newsData'],
    queryFn: async () => {
      const accessToken = await getAccessToken();
      let result = [];
      let page = 1;
      let totalPages;

      do {
        const res = await getNewsList(page, null, accessToken);
        const items = res?.data?.items || [];
        totalPages = res?.data?.totalPages || 1;
        result = [...result, ...items];
        page++;
      } while (page <= totalPages);

      return result;
    },
  });

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

  const filterOptions = useMemo(
    () => [
      {label: 'Tin tức', options: ['Tất cả', 'Trong nước', 'Ngoài nước']},
      {label: 'Ngày', options: []},
      {label: 'Tỉnh', options: provinceOptions},
    ],
    [provinceOptions],
  );

  const {filteredData, searchKeyword, setSearchKeyword} = useSearchAndFilter({
    data: enrichedNews,
    searchableFields: ['title', 'summary'],
    startDate: date,
    endDate: date,
    filters: selectedFilters,
  });

  const handleFilterSelect = useCallback((type, value) => {
    setSelectedFilters(prev => ({...prev, [type]: value}));
    if (type === 'Ngày') {
      const [day, month, year] = value.split('/');
      setDate(new Date(`${year}-${month}-${day}`));
    }
  }, []);

  const {latestNews, domesticNews, internationalNews} = useMemo(() => {
    const sorted = [...filteredData].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );

    return {
      latestNews: sorted.slice(0, 5),
      domesticNews: sorted.filter(i => i.type === 'trongnuoc').slice(0, 5),
      internationalNews: sorted.filter(i => i.type === 'ngoainuoc').slice(0, 5),
    };
  }, [filteredData]);

  const nothingToShow =
    !isLoading &&
    !latestNews.length &&
    !domesticNews.length &&
    !internationalNews.length;

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
          onDateChange={setDate}
        />
      </View>

      <View>
        <FlatList
          data={[]}
          keyExtractor={() => 'news-screen'}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            isError ? (
              <ErrorView />
            ) : nothingToShow ? (
              <View style={styles.visiContainer}>
                <Text style={styles.visiText}>
                  Không tìm thấy tin tức phù hợp.
                </Text>
              </View>
            ) : (
              <View>
                <Section
                  title="Tin mới"
                  subtitle="Cập nhật thông tin mới nhất về nông nghiệp"
                  data={latestNews}
                  loading={isLoading}
                />
                <Section
                  title="Tin trong nước"
                  subtitle="Cập nhật thông tin mới nhất trong nước"
                  data={domesticNews}
                  loading={isLoading}
                />
                <Section
                  title="Tin ngoài nước"
                  subtitle="Cập nhật thông tin quốc tế về nông nghiệp"
                  data={internationalNews}
                  loading={isLoading}
                />
              </View>
            )
          }
          initialNumToRender={1}
          maxToRenderPerBatch={2}
          removeClippedSubviews={true}
          contentContainerStyle={{
            marginTop: scale(20),
            paddingBottom: scale(170),
            paddingHorizontal: scale(16),
          }}
        />
      </View>

      <ChatBot style={{bottom: scale(40)}} />
    </View>
  );
};

export default memo(NewsScreen);
