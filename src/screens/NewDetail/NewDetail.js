import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {API_BASE_URL} from '@env';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './NewDetail.styles';
import {useRoute, useNavigation} from '@react-navigation/native';
import {getAccessToken} from '~/utils/storage/tokenStorage';
import {getNewsById} from '~/api/newsApi';
import FastImage from 'react-native-fast-image';
import {DateIcon} from '../../assets/icons/Icons';
import Background_2 from '../../components/Background/Background_2';

const NewDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {newsId} = route.params || {};
  const accessToken = getAccessToken();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log('news', news);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        if (newsId) {
          const res = await getNewsById(newsId, accessToken);
          setNews(res.data);
        }
      } catch (error) {
        console.log('Lỗi tải tin tức:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [newsId]);

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Đang tải tin tức...</Text>
      </View>
    );
  }

  if (!news) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Không tìm thấy bài viết</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <View style={styles.contentCard}>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryText}>Thị Trường Nông Sản</Text>
            </View>

            <FastImage
              source={{uri: `${API_BASE_URL}/api/upload/${news.images?.[0]}`}}
              style={styles.image}
              resizeMode={FastImage.resizeMode.contain}
            />

            <Text style={styles.title}>{news.title}</Text>

            <View style={styles.metaContainer}>
              <View style={styles.dateContainer}>
                <DateIcon style={styles.dateIcon} />
                <Text style={styles.date}>{formatDate(news.createdAt)}</Text>
              </View>
              <View style={styles.sourceContainer}>
                <Text style={styles.source}>FreshPlaza.com</Text>
              </View>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Tóm tắt</Text>
              <Text style={styles.summary}>{news.summary}</Text>
            </View>

            <View style={styles.contentContainer}>
              <Text style={styles.contentTitle}>Nội dung chi tiết</Text>
              <Text style={styles.content}>{news.description}</Text>
            </View>

            <View style={styles.highlightsCard}>
              <Text style={styles.highlightsTitle}>Điểm nổi bật</Text>
              <Text style={styles.highlightText}>
                Sản lượng cà chua giảm 700.000 tấn trong thập kỷ qua
              </Text>
              <Text style={styles.highlightText}>
                Khối lượng nhập khẩu tăng 400.000 tấn
              </Text>
              <Text style={styles.highlightText}>
                Ảnh hưởng của thời tiết và nhiệt độ cao
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionContainer}>
              <TouchableOpacity style={styles.actionButton}>
                <LinearGradient
                  colors={['#4CAF50', '#66BB6A']}
                  style={styles.actionButtonGradient}>
                  <Icon name="bookmark" size={20} color="#fff" />
                  <Text style={styles.actionButtonText}>Lưu bài viết</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <LinearGradient
                  colors={['#FF9800', '#FFB74D']}
                  style={styles.actionButtonGradient}>
                  <Icon name="share" size={20} color="#fff" />
                  <Text style={styles.actionButtonText}>Chia sẻ</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default NewDetail;
