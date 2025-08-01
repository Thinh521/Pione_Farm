import React, {useEffect, useState, useRef, useCallback} from 'react';
import {Text, View, Animated, Share, Alert} from 'react-native';
import {API_BASE_URL} from '@env';
import LinearGradient from 'react-native-linear-gradient';
import styles from './NewDetail.styles';
import {useRoute, useNavigation} from '@react-navigation/native';
import {getAccessToken} from '~/utils/storage/tokenStorage';
import {getNewsById} from '~/api/newsApi';
import FastImage from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Button from '~/components/ui/Button/ButtonComponent';
import {BookmarkFillIcon, BookmarkIcon, ShareIcon} from '~/assets/icons/Icons';
import {Colors} from '~/theme/theme';
import ErrorView from '~/components/ErrorView/ErrorView';

const LoadingSkeleton = () => {
  return (
    <SkeletonPlaceholder borderRadius={4} speed={1000}>
      <SkeletonPlaceholder.Item padding={16}>
        <SkeletonPlaceholder.Item
          width="100%"
          height={240}
          borderRadius={16}
          marginBottom={20}
        />
        <SkeletonPlaceholder.Item
          width="100%"
          height={20}
          borderRadius={10}
          marginBottom={8}
        />
        <SkeletonPlaceholder.Item
          width="80%"
          height={20}
          borderRadius={10}
          marginBottom={20}
        />
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          marginBottom={20}>
          <SkeletonPlaceholder.Item width={120} height={24} borderRadius={12} />
          <SkeletonPlaceholder.Item width={120} height={24} borderRadius={12} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          width="100%"
          height={100}
          borderRadius={12}
          marginBottom={16}
        />
        <SkeletonPlaceholder.Item
          width="100%"
          height={16}
          borderRadius={8}
          marginBottom={8}
        />
        <SkeletonPlaceholder.Item
          width="90%"
          height={16}
          borderRadius={8}
          marginBottom={8}
        />
        <SkeletonPlaceholder.Item width="70%" height={16} borderRadius={8} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

const AnimatedContent = ({children, delay = 0}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{translateY: slideAnim}],
      }}>
      {children}
    </Animated.View>
  );
};

const HighlightItem = React.memo(({text, index}) => (
  <AnimatedContent delay={100 * index}>
    <View style={styles.highlightItem}>
      <LinearGradient
        colors={['#4CAF50', '#66BB6A']}
        style={styles.highlightDot}
      />
      <Text style={styles.highlightText}>{text}</Text>
    </View>
  </AnimatedContent>
));

const NewDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {newsId} = route.params || {};
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const fetchNews = useCallback(async () => {
    try {
      if (newsId) {
        const token = await getAccessToken();
        const res = await getNewsById(newsId, token);
        setNews(res.data);
      }
    } catch (error) {
      console.log('Lỗi tải tin tức:', error.message);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  }, [newsId]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const formatDate = useCallback(dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, []);

  const handleShare = useCallback(async () => {
    try {
      await Share.share({
        message: `${news.title}\n\n${news.summary}\n\nĐọc thêm tại ứng dụng của chúng tôi!`,
        title: news.title,
      });
    } catch (error) {
      console.log('Lỗi chia sẻ:', error.message);
    }
  }, [news]);

  const handleBookmark = useCallback(() => {
    setBookmarked(!bookmarked);
    Alert.alert(
      bookmarked ? 'Đã bỏ lưu' : 'Đã lưu',
      bookmarked
        ? 'Bài viết đã được bỏ khỏi danh sách yêu thích'
        : 'Bài viết đã được lưu vào danh sách yêu thích',
    );
  }, [bookmarked]);

  const highlights = [
    'Sản lượng thu hoạch giảm mạnh gần đây',
    'Tăng nhập khẩu để bù đắp thiếu hụt',
    'Thời tiết cực đoan ảnh hưởng mùa vụ',
    'Xu hướng thị trường trong tương lai',
  ];

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!news) {
    return <ErrorView />;
  }

  return (
    <>
      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}>
        <View style={styles.contentCard}>
          <AnimatedContent>
            <View style={styles.imageContainer}>
              <FastImage
                source={{
                  uri: `${API_BASE_URL}/api/upload/${news.images?.[0]}`,
                }}
                style={styles.image}
                resizeMode={FastImage.resizeMode.cover}
                onLoad={() => setImageLoaded(true)}
              />
            </View>
          </AnimatedContent>

          <AnimatedContent delay={100}>
            <Text style={styles.title}>{news.title}</Text>
          </AnimatedContent>

          <AnimatedContent delay={200}>
            <View style={styles.metaContainer}>
              <View style={[styles.metaItem, {backgroundColor: '#E8F5E8'}]}>
                <Text style={[styles.metaText, {color: '#2E7D32'}]}>
                  {formatDate(news.createdAt)}
                </Text>
              </View>
              <View style={[styles.metaItem, {backgroundColor: '#F3E5F5'}]}>
                <Text style={[styles.metaText, {color: '#4A148C'}]}>
                  FreshPlaza.com
                </Text>
              </View>
            </View>
          </AnimatedContent>

          <AnimatedContent delay={300}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Tóm tắt</Text>
              <Text style={styles.summary}>{news.summary}</Text>
            </View>
          </AnimatedContent>

          <AnimatedContent delay={400}>
            <View style={styles.contentContainer}>
              <Text style={styles.contentTitle}>Nội dung chi tiết</Text>
              <Text style={styles.content}>{news.description}</Text>
            </View>
          </AnimatedContent>

          <AnimatedContent delay={500}>
            <View style={styles.highlightsCard}>
              <View style={styles.highlightsHeader}>
                <Text style={styles.contentTitle}>Điểm nổi bật</Text>
              </View>
              {highlights.map((highlight, index) => (
                <HighlightItem key={index} text={highlight} index={index} />
              ))}
            </View>
          </AnimatedContent>

          <AnimatedContent delay={600}>
            <View style={styles.actionContainer}>
              <Button.Main
                title={bookmarked ? 'Đã lưu' : 'Lưu bài viết'}
                iconLeft={
                  bookmarked ? (
                    <BookmarkFillIcon style={{color: Colors.white}} />
                  ) : (
                    <BookmarkIcon style={{color: Colors.white}} />
                  )
                }
                onPress={handleBookmark}
                style={styles.actionButton}
              />
              <Button.Main
                title="Chia sẻ"
                iconLeft={<ShareIcon style={{color: Colors.white}} />}
                onPress={handleShare}
                style={styles.actionButton}
              />
            </View>
          </AnimatedContent>
        </View>
      </Animated.ScrollView>
    </>
  );
};

export default NewDetail;
