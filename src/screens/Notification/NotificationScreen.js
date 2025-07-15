import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SectionList,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
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

  console.log('notificationData', notificationData);

  const accessToken = getAccessToken();

  const fetchDefaultNotification = async () => {
    setLoading(true);
    try {
      const res = await getNotification(accessToken);
      const rawData = res.data;

      const mapped = [];

      if (rawData.today?.length > 0) {
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

    // Gán ngày theo định dạng chuẩn
    if (newFilters['Ngày BĐ'] && newFilters['Ngày BĐ'] !== 'Tất cả') {
      // Giả sử bạn nhận ngày dạng "15/07/2025" thì phải format lại:
      const [day, month, year] = newFilters['Ngày BĐ'].split('/');
      filterPayload.date = `${year}-${month}-${day}`; // -> "2025-07-15"
    }

    if (newFilters['Giờ'] && newFilters['Giờ'] !== 'Tất cả') {
      filterPayload.hour = newFilters['Giờ']; // VD: "3:07 PM"
    }

    console.log('filterPayload gửi BE:', filterPayload);

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
          style={{marginTop: scale(30)}}
          size="large"
          color="#4CAF50"
        />
      ) : (
        <FlatList
          data={[{}]}
          style={styles.scrollContainer}
          contentContainerStyle={{paddingBottom: scale(90)}}
          keyExtractor={(_, index) => index.toString()}
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
