import React, {useCallback} from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ProposeItem from './ProposeItem';
import {useNavigation} from '@react-navigation/core';
import {scale} from '~/utils/scaling';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {useQuery} from '@tanstack/react-query';
import {getRegionAll} from '~/api/regionApi';
import {getAccessToken} from '~/utils/storage/tokenStorage';

const ProposeScreen = () => {
  const navigation = useNavigation();
  const actessToken = getAccessToken();

  const {
    data: regionData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['regionAll', actessToken],
    queryFn: () => getRegionAll(actessToken),
    select: res => res?.data || [],
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const navigateToAllPropose = useCallback(() => {
    navigation.navigate('NoBottomTab', {
      screen: 'CropZoneAll',
      params: {
        data: regionData,
      },
    });
  }, [navigation, regionData]);

  const navigateToProposeDetail = id => {
    navigation.navigate('NoBottomTab', {
      screen: 'CropZoneDetail',
      params: {id},
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Vùng trồng</Text>
        <TouchableOpacity onPress={navigateToAllPropose}>
          <Text>Xem tất cả</Text>
        </TouchableOpacity>
      </View>
      {regionData.slice(0, 3).map(item => (
        <ProposeItem
          key={item.id}
          title={item.name}
          description={item.description}
          images={item.images}
          area={item.area}
          population={item.population}
          onPress={() => navigateToProposeDetail(item.id)}
        />
      ))}
    </ScrollView>
  );
};

export default ProposeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: scale(20),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: Colors.title,
    fontSize: FontSizes.large,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(10),
  },
});
