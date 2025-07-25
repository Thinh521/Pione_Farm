import React, {useEffect, useState, useRef, useCallback, useMemo} from 'react';
import {
  SectionList,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Animated,
} from 'react-native';
import styles from './Notification.styles';
import SearchAndFilterBar from '~/components/SearchAndFilterBar/SearchAndFilterBar';
import {scale} from '~/utils/scaling';
import {getNotification, getFilterNotification} from '~/api/notificationApi';
import {getAccessToken} from '~/utils/storage/tokenStorage';

const FILTER_OPTIONS = [
  {
    label: 'Ngày',
    options: [],
  },
  {
    label: 'Giờ',
    options: [
      'Tất cả',
      '8:00 AM',
      '9:00 AM',
      '10:00 AM',
      '1:00 PM',
      '2:00 PM',
      '3:07 PM',
    ],
  },
];

const NotificationItem = React.memo(({item, index}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 50,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        delay: index * 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.itemContainer,
        {
          opacity: fadeAnim,
          transform: [{translateY: slideAnim}],
        },
      ]}>
      <View style={styles.row}>
        <Text style={styles.dot}></Text>
        <Text style={styles.label}>{item.label}</Text>
        <Text style={styles.badge}>{item.badge}</Text>
      </View>
      <Text style={styles.admin}>Admin</Text>
      <Text style={styles.desc} numberOfLines={2}>
        {item.desc}
      </Text>
    </Animated.View>
  );
});

const SectionHeader = React.memo(({title}) => (
  <View style={styles.headerContainer}>
    <Text
      style={[styles.sectionTitle, title === 'Hôm nay' && styles.todayTitle]}>
      {title}
    </Text>
  </View>
));

const NotificationScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [notificationData, setNotificationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const lastNotificationIdRef = useRef(null);
  const cacheRef = useRef({});

  const filteredData = useMemo(() => {
    if (!searchText.trim()) return notificationData;

    return notificationData
      .map(section => ({
        ...section,
        data: section.data.filter(
          item =>
            item.label.toLowerCase().includes(searchText.toLowerCase()) ||
            item.desc.toLowerCase().includes(searchText.toLowerCase()),
        ),
      }))
      .filter(section => section.data.length > 0);
  }, [notificationData, searchText]);

  const mapNotificationData = useCallback(rawData => {
    const mapped = [];

    if (rawData.today?.length > 0) {
      lastNotificationIdRef.current = rawData.today[0]._id;
      mapped.push({
        title: 'Hôm nay',
        data: rawData.today.map(item => ({
          id: item._id,
          label: item.title,
          desc: item.description,
          badge: item.hour,
          type: item.type,
          date: item.date,
        })),
      });
    }

    if (rawData.yesterday?.length > 0) {
      mapped.push({
        title: 'Hôm qua',
        data: rawData.yesterday.map(item => ({
          id: item._id,
          label: item.title,
          desc: item.description,
          badge: item.hour,
          type: item.type,
          date: item.date,
        })),
      });
    }

    return mapped;
  }, []);

  const fetchDefaultNotification = useCallback(
    async (isRefresh = false) => {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      try {
        const token = await getAccessToken();
        setAccessToken(token);

        const cacheKey = 'default_notifications';
        if (cacheRef.current[cacheKey] && !isRefresh) {
          setNotificationData(cacheRef.current[cacheKey]);
          return;
        }

        const res = await getNotification(token);
        const rawData = res.data;
        const mapped = mapNotificationData(rawData);

        cacheRef.current[cacheKey] = mapped;
        setNotificationData(mapped);
      } catch (err) {
        console.log('Lỗi khi lấy thông báo:', err.message);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [mapNotificationData],
  );

  const handleFilterSelect = useCallback(
    async (type, value) => {
      const newFilters = {...selectedFilters, [type]: value};
      setSelectedFilters(newFilters);

      const filterPayload = {};

      if (newFilters['Ngày'] && newFilters['Ngày'] !== 'Tất cả') {
        const [day, month, year] = newFilters['Ngày'].split('/');
        filterPayload.date = `${year}-${month}-${day}`;
      }

      if (newFilters['Giờ'] && newFilters['Giờ'] !== 'Tất cả') {
        filterPayload.hour = newFilters['Giờ'];
      }

      if (Object.keys(filterPayload).length === 0) {
        fetchDefaultNotification();
        return;
      }

      const cacheKey = JSON.stringify(filterPayload);
      if (cacheRef.current[cacheKey]) {
        setNotificationData(cacheRef.current[cacheKey]);
        return;
      }

      setLoading(true);
      try {
        const res = await getFilterNotification({
          accessToken,
          filter: filterPayload,
        });

        const rawData = res.data || [];
        const mapped = [
          {
            title: 'Kết quả lọc',
            data: rawData.map(item => ({
              id: item._id,
              label: item.title,
              desc: item.description,
              badge: item.hour,
              type: item.type,
              date: item.date,
            })),
          },
        ];

        cacheRef.current[cacheKey] = mapped;
        setNotificationData(mapped);
      } catch (error) {
        console.log('Lỗi khi lọc:', error.message);
      } finally {
        setLoading(false);
      }
    },
    [selectedFilters, accessToken, fetchDefaultNotification],
  );

  const handleResetFilters = useCallback(() => {
    setSelectedFilters({});
    setSearchText('');
    fetchDefaultNotification();
  }, [fetchDefaultNotification]);

  const onRefresh = useCallback(() => {
    cacheRef.current = {};
    fetchDefaultNotification(true);
  }, [fetchDefaultNotification]);

  useEffect(() => {
    fetchDefaultNotification();
  }, [fetchDefaultNotification]);

  const renderSectionHeader = useCallback(
    ({section: {title}}) => <SectionHeader title={title} />,
    [],
  );

  const renderItem = useCallback(
    ({item, index}) => <NotificationItem item={item} index={index} />,
    [],
  );

  const keyExtractor = useCallback((item, index) => `${item.id}-${index}`, []);

  const getItemLayout = useCallback(
    (data, index) => ({
      length: scale(120),
      offset: scale(120) * index,
      index,
    }),
    [],
  );

  const hasFilters =
    Object.keys(selectedFilters).length > 0 || searchText.trim();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchAndFilterBar
          searchText={searchText}
          setSearchText={setSearchText}
          filterOptions={FILTER_OPTIONS}
          selectedFilters={selectedFilters}
          placeholder="Tìm kiếm thông báo"
          onFilterSelect={handleFilterSelect}
        />
      </View>

      <View>
        <View style={styles.headerTitle}>
          <Text style={styles.title}>
            Thông báo
            {filteredData.length > 0 && (
              <Text>
                {' '}
                (
                {filteredData.reduce(
                  (sum, section) => sum + section.data.length,
                  0,
                )}
                )
              </Text>
            )}
          </Text>
          {hasFilters && (
            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleResetFilters}
              activeOpacity={0.7}>
              <Text style={styles.resetText}>Đặt lại</Text>
            </TouchableOpacity>
          )}
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.loadingText}>Đang tải thông báo...</Text>
          </View>
        ) : filteredData.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchText.trim()
                ? 'Không tìm thấy thông báo phù hợp'
                : 'Chưa có thông báo nào'}
            </Text>
          </View>
        ) : (
          <SectionList
            sections={filteredData}
            showsVerticalScrollIndicator={false}
            keyExtractor={keyExtractor}
            renderSectionHeader={renderSectionHeader}
            renderItem={renderItem}
            contentContainerStyle={{paddingBottom: scale(280)}}
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={50}
            initialNumToRender={10}
            windowSize={10}
            getItemLayout={getItemLayout}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#4CAF50']}
                tintColor="#4CAF50"
                title="Đang cập nhật..."
                titleColor="#666"
              />
            }
          />
        )}
      </View>
    </View>
  );
};

export default NotificationScreen;
