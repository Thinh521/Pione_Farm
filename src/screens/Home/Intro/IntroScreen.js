import React, {useRef, useState, useEffect} from 'react';
import {Animated, FlatList, Text, View, ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';
import SearchAndFilterBar from '../../../components/SearchAndFilterBar/SearchAndFilterBar';
import ChatBot from '../../../components/ChatBot/ChatBot';
import Images from '../../../assets/images/Images';
import styles from './Intro.styles';
import {scale} from '../../../utils/scaling';

const NEWS_DATA = [
  {
    id: '1',
    title: 'Giới thiệu Trung tâm Khuyến nông Vĩnh Long',
    description:
      'Trung tâm Khuyến nông Vĩnh Long là tổ chức sự nghiệp công lập trực thuộc Sở Nông nghiệp và Môi trường.',
    image: Images.post_1,
    category: 'Giới thiệu',
    date: '26/06/2025',
    readTime: 5,
  },
  {
    id: '2',
    title: 'Kỹ thuật trồng lúa bền vững',
    description:
      'Hướng dẫn các kỹ thuật trồng lúa tiên tiến, thân thiện với môi trường.',
    image: Images.post_1,
    category: 'Kỹ thuật',
    date: '25/06/2025',
    readTime: 7,
  },
  {
    id: '3',
    title: 'Chăn nuôi heo sạch theo tiêu chuẩn VietGAP',
    description: 'Quy trình chăn nuôi heo sạch đạt tiêu chuẩn VietGAP.',
    image: Images.post_1,
    category: 'Chăn nuôi',
    date: '24/06/2025',
    readTime: 6,
  },
  {
    id: '4',
    title: 'Phát triển nuôi trồng thủy sản bền vững',
    description:
      'Mô hình nuôi trồng thủy sản thông minh, ứng dụng công nghệ cao.',
    image: Images.post_1,
    category: 'Thủy sản',
    date: '23/06/2025',
    readTime: 8,
  },
];

const FILTER_OPTIONS = [
  {label: 'Ngày BĐ', options: []},
  {label: 'Ngày KT', options: []},
  {
    label: 'Giá',
    options: ['Tất cả', 'Tăng dần', 'Giảm dần'],
  },
];

const DROPDOWN_OPTIONS = [
  {label: 'Tra cứu tổng hợp', route: 'PriceComparison'},
  {label: 'Tra cứu tổng nâng cao', route: 'AdvancedSearch'},
  {label: 'Giới thiệu chung', route: 'Intro'},
  {label: 'Thị trường trong nước và ngoài nước', route: 'Market'},
  {label: 'Tin tức', route: 'News'},
];

const IntroScreen = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

  const [searchText, setSearchText] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

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
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  const handleFilterSelect = (type, value) => {
    setIsLoading(true);
    setSelectedFilters(prev => ({...prev, [type]: value}));
    setTimeout(() => setIsLoading(false), 300);
  };

  const filteredData = NEWS_DATA.filter(item => {
    const searchMatch =
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase());

    const itemDate = parseDate(item.date);
    const startDate = parseDate(selectedFilters['Ngày BĐ']);
    const endDate = parseDate(selectedFilters['Ngày KT']);

    const dateMatch =
      (!startDate || itemDate >= startDate) &&
      (!endDate || itemDate <= endDate);

    return searchMatch && dateMatch;
  }).sort((a, b) => {
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
      <FastImage source={item.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {item.description}
        </Text>

        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Text style={styles.metaIconText}>📅</Text>
            <Text style={styles.metaText}>{item.date}</Text>
          </View>

          <View style={styles.metaItem}>
            <Text style={styles.metaIconText}>⏱️</Text>
            <Text style={styles.metaText}>{item.readTime} phút đọc</Text>
          </View>
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
          dropdownOptions={DROPDOWN_OPTIONS}
          placeholder="Tìm kiếm bài viết"
          onFilterSelect={handleFilterSelect}
        />
      </View>

      {isLoading ? (
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
          keyExtractor={item => item.id}
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
        />
      )}

      <ChatBot style={{bottom: scale(40)}} />
    </View>
  );
};

export default IntroScreen;
