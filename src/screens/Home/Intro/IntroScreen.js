import React, {useEffect, useRef, useState} from 'react';
import {View, Text, FlatList, Animated, ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';
import {API_BASE_URL} from '@env';
import {useQuery} from '@tanstack/react-query';

import {getIntroNews} from '~/api/newsApi';
import styles from './Intro.styles';
import {scale} from '~/utils/scaling';
import SearchAndFilterBar from '~/components/SearchAndFilterBar/SearchAndFilterBar';
import ChatBot from '~/components/ChatBot/ChatBot';
import {removeVietnameseTones} from '~/utils/normalize';

const FILTER_OPTIONS = [
  {label: 'Ngày BĐ', options: []},
  {label: 'Ngày KT', options: []},
  {
    label: 'Giá',
    options: ['Tất cả', 'Tăng dần', 'Giảm dần'],
  },
];

const IntroScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [filtering, setFiltering] = useState(false);

  const animatedValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

  const {
    data: newsData = [],
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['intro-news'],
    queryFn: getIntroNews,
  });

  console.log('newsData', newsData);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    refetch();
  }, [searchText, selectedFilters]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const parseDate = dateString => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date)) return null;
    return date;
  };

  const handleFilterSelect = (type, value) => {
    setFiltering(true);
    setSelectedFilters(prev => ({...prev, [type]: value}));
    setTimeout(() => setFiltering(false), 300);
  };

  const filteredData = newsData
    ?.filter(item => {
      const searchMatch =
        removeVietnameseTones(item.title).includes(
          removeVietnameseTones(searchText),
        ) ||
        removeVietnameseTones(item.summary).includes(
          removeVietnameseTones(searchText),
        );

      const itemDate = parseDate(item.createdAt);
      const startDate = parseDate(selectedFilters['Ngày BĐ']);
      const endDate = parseDate(selectedFilters['Ngày KT']);

      const dateMatch =
        (!startDate || itemDate >= startDate) &&
        (!endDate || itemDate <= endDate);

      return searchMatch && dateMatch;
    })
    .sort((a, b) => {
      const sortType = selectedFilters['Giá'];
      if (sortType === 'Tăng dần') return a.readTime - b.readTime;
      if (sortType === 'Giảm dần') return b.readTime - a.readTime;
      return 0;
    });

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
          searchText={searchText}
          setSearchText={setSearchText}
          filterOptions={FILTER_OPTIONS}
          placeholder="Tìm kiếm bài viết"
          onFilterSelect={handleFilterSelect}
        />
      </View>

      {isLoading || filtering ? (
        <ActivityIndicator
          size="large"
          color="#00AA00"
          style={{marginTop: 20}}
        />
      ) : filteredData.length === 0 ? (
        <View style={{alignItems: 'center', marginTop: 40}}>
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
          ListHeaderComponent={() => (
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Tin tức & Thông tin</Text>
              <Text style={styles.headerSubtitle}>
                Cập nhật thông tin mới nhất về nông nghiệp
              </Text>
            </View>
          )}
          ListFooterComponent={<View style={{height: scale(100)}} />}
        />
      )}

      <ChatBot style={{bottom: scale(40)}} />
    </View>
  );
};

export default IntroScreen;
