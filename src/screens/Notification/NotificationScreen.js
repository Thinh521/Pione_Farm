import React, {useState} from 'react';
import {FlatList, ImageBackground, SectionList, Text, View} from 'react-native';
import styles from './Notification.styles';
import Images from '../../assets/images/Images';
import HeaderBar from '../../components/HeaderBar/HeaderBar';
import SearchAndFilterBar from '../../components/SearchAndFilterBar/SearchAndFilterBar';
import {scale} from '../../utils/scaling';

const DROPDOWN_OPTIONS = [
  {label: 'Tra cứu tổng hợp', route: 'PriceComparison'},
  {label: 'Tra cứu tổng nâng cao', route: 'AdvancedSearch'},
  {label: 'Giới thiệu chung', route: 'Intro'},
  {
    label: 'Thị trường trong nước và ngoài nước',
    route: 'Market',
  },
  {label: 'Tin tức', route: 'News'},
];

const FILTER_OPTIONS = [
  {
    label: 'Hôm nay',
    options: ['Tất cả', 'Tăng dần', 'Giảm dần'],
  },
  {
    label: '12/12',
    options: ['Tất cả', 'Long An', 'Tiền Giang', 'HCM', 'Hà Nội', 'An Giang'],
  },
  {
    label: 'Giờ',
    options: ['Tất cả', 'Dưới 100', '100 - 500', 'Trên 500'],
  },
];

const data = [
  {
    title: 'Mới',
    data: [
      {id: 1, label: 'Giá', badge: 'Mới', desc: '..........'},
      {id: 2, label: 'Giá', badge: 'Mới', desc: '..........'},
    ],
  },
  {
    title: 'Hôm qua',
    data: [
      {id: 3, label: 'Giá', badge: 'Mới', desc: '..........'},
      {id: 4, label: 'Giá', badge: 'Mới', desc: '..........'},
    ],
  },
];

const NotificationScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedFilters, setSelectedFilters] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchAndFilterBar
          searchText={searchText}
          setSearchText={setSearchText}
          filterOptions={FILTER_OPTIONS}
          dropdownOptions={DROPDOWN_OPTIONS}
          showProductButton={false}
          placeholder="Tìm kiếm thông tin"
          onFilterSelect={(type, value) =>
            setSelectedFilters(prev => ({...prev, [type]: value}))
          }
        />
      </View>

      <FlatList
        data={[{}]}
        style={styles.scrollContainer}
        contentContainerStyle={{
          paddingBottom: scale(90),
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={() => (
          <>
            <View>
              <SectionList
                sections={data}
                style={styles.main}
                keyExtractor={(item, index) => item.id.toString() + index}
                renderSectionHeader={({section: {title}}) => (
                  <View style={styles.headerContainer}>
                    <Text
                      style={[
                        styles.sectionTitle,
                        title === 'Mới' && {color: '#ef4444'},
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
                    <Text style={styles.desc}>
                      Cập nhật hệ thống: {item.desc}
                    </Text>
                  </View>
                )}
                contentContainerStyle={styles.listContainer}
              />
            </View>
          </>
        )}
      />
    </View>
  );
};

export default NotificationScreen;
