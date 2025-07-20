import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import styles from './News.styles';
import SearchAndFilterBar from '~/components/SearchAndFilterBar/SearchAndFilterBar';
import ChatBot from '~/components/ChatBot/ChatBot';
import {scale} from '~/utils/scaling';
import NewsList from '~/components/NewsCard/NewsList';
import NewsSkeleton from '~/components/Skeleton/NewsSkeleton';
import useNewsStore from '~/store/useNewsStore';
import {getAllProvinceApii} from '~/api/provinceApi';
import {useSearchAndFilter} from '~/hook/useSearch';

const EmptyComponent = ({message}) => (
  <View style={{alignItems: 'center', marginTop: scale(40)}}>
    <Text style={{fontSize: scale(14), color: '#888'}}>{message}</Text>
  </View>
);

const Section = ({title, subtitle, data, loading}) => {
  if (!data.length && !loading) return null;
  return (
    <View style={{marginBottom: scale(20)}}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.headerSubtitle}>{subtitle}</Text>
      {loading ? <NewsSkeleton itemCount={5} /> : <NewsList data={data} />}
    </View>
  );
};

const NewsScreen = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [date, setDate] = useState(null);

  const {newsData, loading, fetchNewsData, hasFetched} = useNewsStore();

  const {data: provinceList = []} = useQuery({
    queryKey: ['provinces'],
    queryFn: getAllProvinceApii,
    select: res => res.data,
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (!hasFetched) fetchNewsData();
  }, []);

  useEffect(() => {
    setProvinceOptions(['Tất cả', ...provinceList.map(p => p.name)]);
  }, [provinceList]);

  const enrichedNews = useMemo(() => {
    if (!newsData?.length) return [];
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
    !loading &&
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

      <View style={styles.main}>
        <FlatList
          data={[]}
          keyExtractor={() => 'news-screen'}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            nothingToShow ? (
              <EmptyComponent message="Không tìm thấy tin tức phù hợp." />
            ) : (
              <View>
                <Section
                  title="Tin mới"
                  subtitle="Cập nhật thông tin mới nhất về nông nghiệp"
                  data={latestNews}
                  loading={loading}
                />
                <Section
                  title="Tin trong nước"
                  subtitle="Cập nhật thông tin mới nhất về nông nghiệp"
                  data={domesticNews}
                  loading={loading}
                />
                <Section
                  title="Tin ngoài nước"
                  subtitle="Cập nhật thông tin mới nhất về nông nghiệp"
                  data={internationalNews}
                  loading={loading}
                />
              </View>
            )
          }
          contentContainerStyle={{
            marginTop: scale(20),
            paddingBottom: scale(170),
          }}
        />
      </View>

      <ChatBot style={{bottom: scale(40)}} />
    </View>
  );
};

export default NewsScreen;
