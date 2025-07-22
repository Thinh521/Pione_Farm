import React, {useState} from 'react';
import {FlatList, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import styles from './Statistical.styles';
import SearchAndFilterBar from '~/components/SearchAndFilterBar/SearchAndFilterBar';
import {scale} from '~/utils/scaling';
import {DownIcon} from '~/assets/icons/Icons';
import TrendAnalyticsCard from './components/TrendAnalyticsCard';
import PriceMovementSummary from './components/PriceMovementSummary';
import {Colors} from '~/theme/theme';
import TopTrend from './components/TopTrend';

const TIME_OPTIONS = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

const StatisticalScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedTimeRange, setSelectedTimeRange] = useState('Monthly');
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <StatusBar backgroundColor={Colors.headerBack} barStyle="light-content" />

      <View style={styles.container}>
        <View style={styles.header}>
          <SearchAndFilterBar
            searchText={searchText}
            setSearchText={setSearchText}
            filterOptions={[]}
            showProductButton={false}
            placeholder="Tìm kiếm thông tin"
            containerStyle={{marginBottom: 0}}
            wrapperStyle={{marginBottom: 0}}
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
            <View style={{position: 'relative'}}>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowDropdown(prev => !prev)}>
                <Text style={styles.dropdownText}>{selectedTimeRange}</Text>
                <DownIcon />
              </TouchableOpacity>

              {showDropdown && (
                <View style={styles.dropdownList}>
                  {TIME_OPTIONS.map(option => (
                    <TouchableOpacity
                      key={option}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedTimeRange(option);
                        setShowDropdown(false);
                      }}>
                      <Text style={styles.dropdownItemText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>

        <FlatList
          data={[{}]}
          contentContainerStyle={{
            paddingBottom: scale(90),
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={() => (
            <View style={styles.main}>
              <TrendAnalyticsCard />
              <PriceMovementSummary />
              <TopTrend />
            </View>
          )}
        />
      </View>
    </>
  );
};

export default StatisticalScreen;
