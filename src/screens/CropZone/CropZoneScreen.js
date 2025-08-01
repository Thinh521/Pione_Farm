import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import styles from './CropZone.styles';
import FeaturedFarms from './components/FeaturedFarms';
import {useQuery} from '@tanstack/react-query';
import {getFarmALl} from '~/api/farmAllApi';
import {scale} from '~/utils/scaling';
import Background_2 from '~/components/Background/Background_2';
import SoilClimateSection from './components/SoilClimateSection';
import CropsSection from './components/CropsSection';
import {useNavigation, useRoute} from '@react-navigation/core';
import FastImage from 'react-native-fast-image';
import Images from '~/assets/images/Images';
import SliderComponents from '~/components/SliderComponents/SliderComponents';
import {getAccessToken} from '~/utils/storage/tokenStorage';
import {getRegionById} from '~/api/regionApi';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import ErrorView from '~/components/ErrorView/ErrorView';

const {width} = Dimensions.get('window');

const LoadingSkeleton = () => {
  return (
    <SkeletonPlaceholder speed={1000}>
      <SkeletonPlaceholder.Item padding={16}>
        <SkeletonPlaceholder.Item
          width={width * 0.6}
          height={24}
          borderRadius={4}
          marginBottom={16}
        />
        <SkeletonPlaceholder.Item
          width="100%"
          height={180}
          borderRadius={8}
          marginBottom={20}
        />
        <SkeletonPlaceholder.Item
          width={width * 0.5}
          height={18}
          borderRadius={4}
          marginBottom={12}
        />
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          marginBottom={24}>
          <SkeletonPlaceholder.Item
            width={width * 0.4}
            height={20}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            width={width * 0.4}
            height={20}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          width="100%"
          height={100}
          borderRadius={8}
          marginBottom={20}
        />
        <SkeletonPlaceholder.Item
          width="100%"
          height={100}
          borderRadius={10}
          marginBottom={20}
        />
        <SkeletonPlaceholder.Item
          width="100%"
          height={80}
          borderRadius={8}
          marginBottom={20}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

const CropZoneScreen = () => {
  const navigation = useNavigation();
  const {id} = useRoute().params;

  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getAccessToken();
      setAccessToken(token);
    };
    fetchToken();
  }, []);

  const {
    data: item,
    isLoading: isLoadingRegion,
    isError: errorRegion,
  } = useQuery({
    queryKey: ['regionById', id],
    queryFn: () => getRegionById({id, accessToken}),
    select: res => res.data,
    retry: 1,
    enabled: !!id && !!accessToken,
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: farms,
    isLoading: isLoadingFarms,
    isError: errorFarm,
  } = useQuery({
    queryKey: ['FarmAll'],
    queryFn: getFarmALl,
    select: res => res.data,
    staleTime: 10 * 60 * 1000,
  });

  const navigateToMap = useCallback(() => {
    navigation.navigate('NoBottomTab', {
      screen: 'PlantRegionMap',
    });
  }, [navigation]);

  if (!item || isLoadingRegion) {
    return <LoadingSkeleton />;
  }

  if (errorRegion) {
    return <ErrorView />;
  }

  return (
    <>
      <Background_2 />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: scale(20)}}>
        <Text style={styles.zoneName}>{item.name}</Text>

        {Array.isArray(item.images) && item.images.length > 0 && (
          <SliderComponents images={item.images} />
        )}

        <View style={styles.header}>
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
            <Text style={styles.buttonAction}>Nhấn để xem bản đồ chi tiết</Text>
          </View>
        </TouchableOpacity>

        <CropsSection
          crops={item.crops}
          loading={isLoadingFarms}
          error={errorFarm}
        />

        <FeaturedFarms farms={farms} />

        <View>
          <View style={[styles.card, styles.halfCard]}>
            <Text style={styles.sectionTitle}>Ưu thế</Text>
            {Array.isArray(item.strengths) &&
              item.strengths.map((strength, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: scale(6),
                  }}>
                  <View style={styles.highlightDot} />
                  <Text style={styles.listItem}>{strength}</Text>
                </View>
              ))}
          </View>

          <View style={[styles.card, styles.halfCard]}>
            <Text style={styles.sectionTitle}>Thách thức</Text>
            {Array.isArray(item.challenges) &&
              item.challenges.map((challenge, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: scale(6),
                  }}>
                  <View style={styles.highlightDot} />
                  <Text style={styles.listItem}>{challenge}</Text>
                </View>
              ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default CropZoneScreen;
