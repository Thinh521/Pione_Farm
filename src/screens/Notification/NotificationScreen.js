import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  SectionList,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import styles from './Notification.styles';
import {scale} from '~/utils/scaling';
import SearchAndFilterBar from '~/components/SearchAndFilterBar/SearchAndFilterBar';
import {getAccessToken} from '~/utils/storage/tokenStorage';
import {getNotification, getFilterNotification} from '~/api/notificationApi';
import {useQuery, useMutation} from '@tanstack/react-query';
import {useSearchAndFilter} from '~/hook/useSearch';
import ErrorView from '~/components/ErrorView/ErrorView';

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
        {opacity: fadeAnim, transform: [{translateY: slideAnim}]},
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
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    (async () => {
      const token = await getAccessToken();
      setAccessToken(token);
    })();
  }, []);

  const mapNotificationData = useCallback(rawData => {
    const result = [];

    if (rawData.today?.length) {
      result.push({
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

    if (rawData.yesterday?.length) {
      result.push({
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

    return result;
  }, []);

  const {
    data: notificationData = [],
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ['notifications', accessToken],
    queryFn: async () => {
      if (!accessToken) return [];
      const res = await getNotification(accessToken);
      return mapNotificationData(res.data);
    },
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 3,
    cacheTime: 1000 * 60 * 10,
  });

  const filterMutation = useMutation({
    mutationFn: async payload => {
      const res = await getFilterNotification({accessToken, filter: payload});
      return [
        {
          title: 'Kết quả lọc',
          data: res.data.map(item => ({
            id: item._id,
            label: item.title,
            desc: item.description,
            badge: item.hour,
            type: item.type,
            date: item.date,
          })),
        },
      ];
    },
  });

  const handleFilterSelect = useCallback(
    (type, value) => {
      const newFilters = {...selectedFilters, [type]: value};
      setSelectedFilters(newFilters);

      const payload = {};
      if (newFilters['Ngày'] && newFilters['Ngày'] !== 'Tất cả') {
        const [day, month, year] = newFilters['Ngày'].split('/');
        payload.date = `${year}-${month}-${day}`;
      }
      if (newFilters['Giờ'] && newFilters['Giờ'] !== 'Tất cả') {
        payload.hour = newFilters['Giờ'];
      }

      if (Object.keys(payload).length === 0) {
        refetch();
      } else {
        filterMutation.mutate(payload);
      }
    },
    [selectedFilters, accessToken],
  );

  const handleResetFilters = () => {
    setSelectedFilters({});
    setSearchText('');
    setSearchKeyword('');
    filterMutation.reset();

    setTimeout(() => {
      refetch();
    }, 100);
  };

  const flatData = useMemo(() => {
    const sourceData = filterMutation.data || notificationData;
    return sourceData.flatMap(section =>
      section.data.map(item => ({
        ...item,
        sectionTitle: section.title,
      })),
    );
  }, [notificationData, filterMutation.data]);

  const {
    filteredData: searchedData,
    searchKeyword,
    setSearchKeyword,
  } = useSearchAndFilter({
    data: flatData,
    searchKeyword: searchText,
    searchableFields: ['label', 'desc'],
  });

  const filteredData = useMemo(() => {
    const grouped = {};
    for (const item of searchedData) {
      if (!grouped[item.sectionTitle]) {
        grouped[item.sectionTitle] = [];
      }
      grouped[item.sectionTitle].push(item);
    }

    return Object.entries(grouped).map(([title, data]) => ({title, data}));
  }, [searchedData]);

  const renderItem = useCallback(
    ({item, index}) => <NotificationItem item={item} index={index} />,
    [],
  );

  const renderSectionHeader = useCallback(
    ({section: {title}}) => <SectionHeader title={title} />,
    [],
  );

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
          searchText={searchKeyword}
          setSearchText={setSearchKeyword}
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

        {isError ? (
          <ErrorView />
        ) : isLoading || filterMutation.isPending ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.loadingText}>Đang tải thông báo...</Text>
          </View>
        ) : (
          <SectionList
            sections={
              filteredData.length > 0 ? filteredData : [{title: '', data: []}]
            }
            keyExtractor={item => item.id.toString()}
            renderSectionHeader={
              filteredData.length > 0 ? renderSectionHeader : undefined
            }
            renderItem={
              filteredData.length > 0
                ? renderItem
                : () => (
                    <View style={styles.emptyContainer}>
                      <Text style={styles.emptyText}>
                        {searchText.trim()
                          ? 'Không tìm thấy thông báo phù hợp'
                          : 'Chưa có thông báo nào'}
                      </Text>
                    </View>
                  )
            }
            contentContainerStyle={{paddingBottom: scale(280), flexGrow: 1}}
            getItemLayout={filteredData.length > 0 ? getItemLayout : undefined}
            removeClippedSubviews
            maxToRenderPerBatch={10}
            initialNumToRender={10}
            windowSize={10}
            refreshControl={
              <RefreshControl
                refreshing={isRefetching}
                onRefresh={refetch}
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
