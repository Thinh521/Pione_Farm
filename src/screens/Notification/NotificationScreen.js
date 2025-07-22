import React, {useEffect, useState, useRef} from 'react';
import {SectionList, Text, View, ActivityIndicator} from 'react-native';

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

const NotificationScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [notificationData, setNotificationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState('');
  const lastNotificationIdRef = useRef(null);

  console.log('notificationData', notificationData);

  const fetchDefaultNotification = async () => {
    setLoading(true);
    try {
      const token = await getAccessToken();
      setAccessToken(token);
      const res = await getNotification(token);
      const rawData = res.data;

      console.log('rawData', rawData);

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

  useEffect(() => {
    fetchDefaultNotification();
  }, []);

  const renderSectionHeader = ({section: {title}}) => (
    <View style={styles.headerContainer}>
      <Text
        style={[
          styles.sectionTitle,
          title === 'Hôm nay' && {color: '#ef4444'},
        ]}>
        {title}
      </Text>
    </View>
  );

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View style={styles.row}>
        <Text style={styles.dot}></Text>
        <Text style={styles.label}>{item.label}</Text>
        <Text style={styles.badge}>{item.badge}</Text>
      </View>
      <Text style={styles.admin}>Admin</Text>
      <Text style={styles.desc} numberOfLines={2}>
        {item.desc}
      </Text>
    </View>
  );

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
        <SectionList
          sections={notificationData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id + index}
          renderSectionHeader={renderSectionHeader}
          contentContainerStyle={{paddingBottom: scale(80)}}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default NotificationScreen;
