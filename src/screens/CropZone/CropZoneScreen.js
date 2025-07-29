import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import styles from './CropZone.styles';
import FeaturedFarms from './components/FeaturedFarms';
import {useQuery} from '@tanstack/react-query';
import {getFarmALl} from '../../api/farmAllApi';
import {scale} from '../../utils/scaling';
import Background_2 from '../../components/Background/Background_2';
import SoilClimateSection from './components/SoilClimateSection';
import CropsSection from './components/CropsSection';
import {useNavigation} from '@react-navigation/core';
import FastImage from 'react-native-fast-image';
import Images from '../../assets/images/Images';

const CropZoneScreen = ({route}) => {
  const {item} = route.params;
  const navigation = useNavigation();

  const {
    data: farms,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['FarmAll'],
    queryFn: getFarmALl,
    select: res => res.data,
    staleTime: 10 * 60 * 1000,
  });

  const navigateToMap = () => {
    navigation.navigate('NoBottomTab', {
      screen: 'PlantRegionMap',
      params: {
        item: item,
      },
    });
  };

  return (
    <>
      <Background_2 />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: scale(20)}}>
        <View style={styles.header}>
          <Text style={styles.zoneName}>{item.name}</Text>
          <Text style={styles.location}>{item.location}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{item.area}</Text>
              <Text style={styles.statLabel}>Diện tích</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{item.population}</Text>
              <Text style={styles.statLabel}>Dân số</Text>
            </View>
          </View>
        </View>

        <SoilClimateSection cropZone={item} />

        <TouchableOpacity
          style={styles.buttonMap}
          onPress={navigateToMap}
          activeOpacity={0.9}>
          <View style={styles.buttonMapHeader}>
            <View style={styles.iconContainer}>
              <FastImage
                source={Images.map}
                style={styles.mapIcon}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.buttonTitle}>Xem địa chỉ</Text>
              <Text style={styles.buttonSubtitle}>Định vị chính xác</Text>
            </View>
          </View>
          <View style={styles.buttonFooter}>
            <Text style={styles.buttonAction}>
              Nhấn để xem bản đồ chi tiết
            </Text>
          </View>
        </TouchableOpacity>

        <CropsSection cropZone={item} />

        <FeaturedFarms farms={farms} />

        <View>
          <View style={[styles.card, styles.halfCard]}>
            <Text style={styles.sectionTitle}>Ưu thế</Text>
            {item.advantages.map((advantage, index) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: scale(6),
                }}>
                <View style={styles.highlightDot} />
                <Text key={index} style={styles.listItem}>
                  {advantage}
                </Text>
              </View>
            ))}
          </View>

          <View style={[styles.card, styles.halfCard]}>
            <Text style={styles.sectionTitle}>Thách thức</Text>
            {item.challenges.map((challenge, index) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: scale(6),
                }}>
                <View style={styles.highlightDot} />
                <Text key={index} style={styles.listItem}>
                  {challenge}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default CropZoneScreen;
