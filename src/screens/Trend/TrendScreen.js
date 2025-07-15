import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styles from './Trend.styles';
import SearchAndFilterBar from '../../components/SearchAndFilterBar/SearchAndFilterBar';
import WalletList from '../Home/components/WalletList';
import WalletListSkeleton from '../../components/Skeleton/WalletListSkeleton';
import {scale} from '../../utils/scaling';
import {Colors} from '../../theme/theme';
import useWalletStore from '../../store/useWalletStore';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {Flame, CalendarDays, History} from 'lucide-react-native';

const FILTER_OPTIONS = [
  {
    label: 'Tất cả',
    options: ['Tất cả', 'Xu hướng', 'Hôm nay', 'Hôm qua'],
  },
  {label: 'Ngày BĐ', options: []},
  {label: 'Ngày KT', options: []},
];

const TrendScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});

  const {walletData, loading, fetchWalletData, hasFetched} = useWalletStore();

  useEffect(() => {
    if (!hasFetched) {
      fetchWalletData();
    }
  }, []);

  // const today = new Date().toDateString();
  // const yesterday = new Date(Date.now() - 86400000).toDateString();

  // const walletData = walletData.filter(
  //   item => new Date(item.createdAt).toDateString() === today,
  // );

  // const walletData = walletData.filter(
  //   item => new Date(item.createdAt).toDateString() === yesterday,
  // );

  const navigateToWalletAll = (title, data) => {
    navigation.navigate('NoBottomTab', {
      screen: 'WalletAll',
      params: {
        title,
        data,
      },
    });
  };

  const renderWalletSection = (title, data, Icon, color) => (
    <Animatable.View animation="fadeInUp" duration={500} style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.headerTitle}>
          <Icon size={20} color={color} style={{marginRight: 8}} />
          <Text style={[styles.title, {color}]}>{title}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigateToWalletAll(title, data)}
          style={styles.seeMoreButton}>
          <Text style={styles.seeMoreText}>Xem Tất cả</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <WalletListSkeleton itemCount={5} />
      ) : (
        <WalletList
          data={data.slice(0, 5)}
          searchText={searchText}
          selectedFilters={selectedFilters}
        />
      )}
    </Animatable.View>
  );

  const renderSections = () => {
    const section = selectedFilters['Tất cả'] || 'Tất cả';

    switch (section) {
      case 'Xu hướng':
        return renderWalletSection('Xu hướng', walletData, Flame, 'orange');
      case 'Hôm nay':
        return renderWalletSection(
          'Hôm nay',
          walletData,
          CalendarDays,
          'green',
        );
      case 'Hôm qua':
        return renderWalletSection('Hôm qua', walletData, History, 'gray');
      default:
        return (
          <>
            {renderWalletSection('Xu hướng', walletData, Flame, 'orange')}
            {renderWalletSection('Hôm nay', walletData, CalendarDays, 'green')}
            {renderWalletSection('Hôm qua', walletData, History, 'gray')}
          </>
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchAndFilterBar
          searchText={searchText}
          setSearchText={setSearchText}
          filterOptions={FILTER_OPTIONS}
          selectedFilters={selectedFilters}
          showProductButton={false}
          placeholder="Tìm kiếm thông tin"
          onFilterSelect={(type, value) =>
            setSelectedFilters(prev => ({...prev, [type]: value}))
          }
        />
      </View>

      {!hasFetched ? (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={Colors.green} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{paddingBottom: scale(80)}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.main}>{renderSections()}</View>
        </ScrollView>
      )}
    </View>
  );
};

export default TrendScreen;
