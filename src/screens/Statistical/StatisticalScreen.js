import React, {useState} from 'react';
import {FlatList, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import styles from './Statistical.styles';
import SearchAndFilterBar from '../../components/SearchAndFilterBar/SearchAndFilterBar';
import {scale} from '../../utils/scaling';
import {DownIcon} from '../../assets/icons/Icons';
import TrendAnalyticsCard from './components/TrendAnalyticsCard';
import PriceMovementSummary from './components/PriceMovementSummary';
import {Colors} from '../../theme/theme';

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

const StatisticalScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedFilters, setSelectedFilters] = useState('');

  return (
    <>
      <StatusBar backgroundColor={Colors.headerBack} barStyle="light-content" />

      <View style={styles.container}>
        <View style={styles.header}>
          <SearchAndFilterBar
            searchText={searchText}
            setSearchText={setSearchText}
            filterOptions={[]}
            dropdownOptions={DROPDOWN_OPTIONS}
            showProductButton={false}
            placeholder="Tìm kiếm thông tin"
            onFilterSelect={(type, value) =>
              setSelectedFilters(prev => ({...prev, [type]: value}))
            }
          />
          <View style={styles.headerBottom}>
            <View>
              <Text style={styles.headerBottomTitle}>Statistical</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => {}}>
                <View style={[styles.dot, {backgroundColor: '#347AE2'}]} />
                <Text style={styles.buttonText}>Offline orders</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => {}}>
                <View style={[styles.dot, {backgroundColor: '#FF9500'}]} />
                <Text style={styles.buttonText}>Online orders</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>Monthly</Text>
              <DownIcon />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={[{}]}
          contentContainerStyle={{
            paddingBottom: scale(70),
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={() => (
            <View style={styles.main}>
              <TrendAnalyticsCard />
              <PriceMovementSummary />
            </View>
          )}
        />
      </View>
    </>
  );
};

export default StatisticalScreen;
