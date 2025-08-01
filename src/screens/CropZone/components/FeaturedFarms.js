import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Colors, FontSizes, FontWeights, Shadows} from '~/theme/theme';
import {scale} from '~/utils/scaling';
import FastImage from 'react-native-fast-image';
import ErrorView from '~/components/ErrorView/ErrorView';

const FeaturedFarms = ({farms, loading, error}) => {
  const {width: windowWidth} = useWindowDimensions();
  const itemWidth = (windowWidth - 42) / 2;

  return (
    <View>
      <Text style={styles.sectionTitle}>Các trang trại tiêu biểu</Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.green}
          style={styles.loading}
        />
      ) : error ? (
        <ErrorView />
      ) : farms?.length === 0 ? (
        <Text style={styles.emptyText}>Không có trang trại nào hiển thị.</Text>
      ) : (
        <FlatList
          data={farms}
          keyExtractor={(item, index) => `${item.id || index}`}
          horizontal
          decelerationRate="fast"
          snapToInterval={itemWidth + 12}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({item}) => (
            <TouchableOpacity style={[styles.card, {width: itemWidth}]}>
              <FastImage
                source={{uri: item?.image?.[0]}}
                style={styles.image}
                resizeMode={FastImage.resizeMode.cover}
              />
              <Text style={styles.farmName} numberOfLines={1}>
                {item.nameFarm}
              </Text>
              <Text style={styles.farmDescription} numberOfLines={2}>
                {item.description}
              </Text>
              <Text style={styles.farmLocation} numberOfLines={2}>
                Địa chỉ: {item.location}
              </Text>
              <Text style={styles.farmArea}>Diện tích: {item.area}</Text>
              <Text style={styles.farmCrops}>Cây trồng: {item.crops}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default FeaturedFarms;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
    color: Colors.title,
    paddingHorizontal: scale(16),
  },
  listContainer: {
    padding: scale(16),
  },
  card: {
    backgroundColor: Colors.white,
    padding: scale(16),
    borderRadius: scale(10),
    marginRight: scale(12),
    ...Shadows.medium,
  },
  image: {
    width: '100%',
    height: scale(100),
    marginBottom: scale(10),
  },
  farmName: {
    color: Colors.greenText,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(6),
  },
  farmDescription: {
    fontSize: FontSizes.xsmall,
    color: Colors.grayText_2,
    marginBottom: scale(4),
  },
  farmArea: {
    fontSize: FontSizes.xsmall,
    color: Colors.grayText_2,
    marginBottom: scale(4),
  },
  farmLocation: {
    fontSize: FontSizes.xsmall,
    color: Colors.grayText_2,
    marginBottom: scale(4),
  },
  farmCrops: {
    fontSize: 13,
    color: '#4caf50',
    fontWeight: '600',
    marginTop: 4,
  },
  loading: {
    marginVertical: scale(100),
  },
  emptyText: {
    color: Colors.grayText,
    textAlign: 'center',
    marginTop: 16,
    fontSize: FontSizes.small,
  },
});
