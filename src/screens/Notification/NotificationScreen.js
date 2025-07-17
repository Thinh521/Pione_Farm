import React, {useEffect, useState, useRef} from 'react';
import {
  FlatList,
  SectionList,
  Text,
  View,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import PushNotification from 'react-native-push-notification';

import styles from './Notification.styles';
import SearchAndFilterBar from '~/components/SearchAndFilterBar/SearchAndFilterBar';
import {scale} from '~/utils/scaling';
import {getNotification, getFilterNotification} from '~/api/notificationApi';
import {getAccessToken} from '~/utils/storage/tokenStorage';

const FILTER_OPTIONS = [
  {
    label: 'Ngày BĐ',
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

const NotificationScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [notificationData, setNotificationData] = useState([]);
  const [loading, setLoading] = useState(true);

  const lastNotificationIdRef = useRef(null);
  const accessToken = getAccessToken();

  const fetchDefaultNotification = async () => {
    setLoading(true);
    try {
      const res = await getNotification(accessToken);
      const rawData = res.data;

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

      setNotificationData(mapped);
    } catch (err) {
      console.log('Lỗi khi lấy thông báo:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterSelect = async (type, value) => {
    const newFilters = {...selectedFilters, [type]: value};
    setSelectedFilters(newFilters);

    const filterPayload = {};

    if (newFilters['Ngày BĐ'] && newFilters['Ngày BĐ'] !== 'Tất cả') {
      const [day, month, year] = newFilters['Ngày BĐ'].split('/');
      filterPayload.date = `${year}-${month}-${day}`;
    }

    if (newFilters['Giờ'] && newFilters['Giờ'] !== 'Tất cả') {
      filterPayload.hour = newFilters['Giờ'];
    }

    if (Object.keys(filterPayload).length === 0) {
      fetchDefaultNotification();
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

      setNotificationData(mapped);
    } catch (error) {
      console.log('Lỗi khi lọc:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        console.log(
          granted === PermissionsAndroid.RESULTS.GRANTED
            ? 'Notification permission granted'
            : 'Notification permission denied',
        );
      } catch (err) {
        console.warn('Permission error:', err);
      }
    }
  };

  const configurePush = () => {
    PushNotification.configure({
      onRegister: token => console.log('TOKEN:', token),
      onNotification: notification => {
        console.log('NOTIFICATION:', notification);
        notification.finish(PushNotification.FetchResult.NoData);
      },
      requestPermissions: Platform.OS === 'ios',
    });

    PushNotification.createChannel({
      channelId: 'default-channel-id',
      channelName: 'Default Channel',
    });
  };

  const checkNewNotification = async () => {
    try {
      const res = await getNotification(accessToken);
      const latest = res.data?.today?.[0];

      if (latest && latest._id !== lastNotificationIdRef.current) {
        lastNotificationIdRef.current = latest._id;

        PushNotification.localNotification({
          channelId: 'default-channel-id',
          title: 'Thông báo mới',
          message: latest.title || 'Bạn có thông báo mới',
        });

        setNotificationData(prev => {
          const yesterday = prev.find(
            section => section.title === 'Hôm qua',
          ) || {
            title: 'Hôm qua',
            data: [],
          };

          return [
            {
              title: 'Hôm nay',
              data: [
                {
                  id: latest._id,
                  label: latest.title,
                  desc: latest.description,
                  badge: latest.hour,
                  type: latest.type,
                  date: latest.date,
                },
                ...(prev.find(section => section.title === 'Hôm nay')?.data ||
                  []),
              ],
            },
            yesterday,
          ];
        });
      }
    } catch (err) {
      console.log('Lỗi khi kiểm tra thông báo mới:', err.message);
    }
  };

  useEffect(() => {
    requestNotificationPermission();
    configurePush();
    fetchDefaultNotification();

    const interval = setInterval(checkNewNotification, 10000);
    return () => clearInterval(interval);
  }, []);

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

      {loading ? (
        <ActivityIndicator
          style={{marginTop: scale(250)}}
          size="large"
          color="#4CAF50"
        />
      ) : (
        <FlatList
          data={[{}]}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{paddingBottom: scale(90)}}
          renderItem={() => (
            <SectionList
              sections={notificationData}
              style={styles.main}
              keyExtractor={(item, index) => item.id + index}
              renderSectionHeader={({section: {title}}) => (
                <View style={styles.headerContainer}>
                  <Text
                    style={[
                      styles.sectionTitle,
                      title === 'Hôm nay' && {color: '#ef4444'},
                    ]}>
                    {title}
                  </Text>
                </View>
              )}
              renderItem={({item}) => (
                <View style={styles.itemContainer}>
                  <View style={styles.row}>
                    <Text style={styles.dot}>🌱</Text>
                    <Text style={styles.label}>{item.label}</Text>
                    <Text style={styles.badge}>{item.badge}</Text>
                  </View>
                  <Text style={styles.admin}>Admin</Text>
                  <Text style={styles.desc}>{item.desc}</Text>
                </View>
              )}
              contentContainerStyle={styles.listContainer}
            />
          )}
        />
      )}
    </View>
  );
};

export default NotificationScreen;
