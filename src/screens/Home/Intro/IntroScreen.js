import React, {useEffect, useRef, useState} from 'react';
import {View, Text, FlatList, Animated} from 'react-native';
import FastImage from 'react-native-fast-image';
import {API_BASE_URL} from '@env';
import {useQuery} from '@tanstack/react-query';
import {getIntroNews} from '~/api/newsApi';
import styles from './Intro.styles';
import {scale} from '~/utils/scaling';
import SearchAndFilterBar from '~/components/SearchAndFilterBar/SearchAndFilterBar';
import ChatBot from '~/components/ChatBot/ChatBot';
import {getAccessToken} from '~/utils/storage/tokenStorage';
import NewsSkeleton from '~/components/Skeleton/NewsSkeleton';
import {useSearchAndFilter} from '../../../hook/useSearch';

const FILTER_OPTIONS = [
  {label: 'Ngày BĐ', options: []},
  {label: 'Ngày KT', options: []},
  {label: 'Tỉnh', options: ['Tất cả', 'Tăng dần', 'Giảm dần']},
];

const IntroScreen = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [accessToken, setAccessToken] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  console.log('startDate', startDate);
  console.log('endDate', endDate);

  const animatedValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    (async () => {
      const token = await getAccessToken();
      setAccessToken(token);
    })();
  }, []);

  const {
    data: newsResponse = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['intro-news'],
    queryFn: () => getIntroNews(accessToken),
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
  });

  const {filteredData, searchKeyword, setSearchKeyword} = useSearchAndFilter({
    data: newsResponse,
    searchableFields: ['title', 'summary'],
    startDate,
    endDate,
  });

  console.log('filteredData', filteredData);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 0],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const handleFilterSelect = (type, value) => {
    setSelectedFilters(prev => ({...prev, [type]: value}));
  };

  const renderItem = ({item}) => (
    <Animated.View
      style={[
        styles.card,
        {
          opacity,
          transform: [{translateY}, {scale: scaleValue}],
        },
      ]}>
      <FastImage
        source={{uri: `${API_BASE_URL}/api/upload/${item.images?.[0]}`}}
        style={styles.image}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.summary}
        </Text>
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Text style={styles.metaIconText}>📅 </Text>
            <Text style={styles.metaText}>
              {new Date(item.createdAt).toLocaleDateString('vi-VN')}
            </Text>
          </View>
          {item.type && (
            <View style={styles.metaItem}>
              <Text style={styles.metaText}>Tin tức: {item.type}</Text>
            </View>
          )}
        </View>
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchAndFilterBar
          searchText={searchKeyword}
          setSearchText={setSearchKeyword}
          selectedFilters={selectedFilters}
          filterOptions={FILTER_OPTIONS}
          placeholder="Tìm kiếm bài viết"
          onFilterSelect={handleFilterSelect}
          onDateChange={(start, end) => {
            setStartDate(start);
            setEndDate(end);
          }}
        />
      </View>

      <FlatList
        data={[{}]}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
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
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: scale(40),
                }}>
                <Text style={{fontSize: 16, color: 'gray'}}>
                  Không tìm thấy kết quả nào.
                </Text>
              </View>
            ) : (
              <FlatList
                data={filteredData}
                keyExtractor={(item, index) =>
                  item._id?.toString() || `item-${index}`
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                renderItem={renderItem}
                ListFooterComponent={<View style={{height: scale(30)}} />}
              />
            )}
          </View>
        )}
      />

      <ChatBot style={{bottom: scale(40)}} />
    </View>
  );
};

export default IntroScreen;
