import React from 'react';
import {API_BASE_URL} from '@env';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  TrendDownIcon,
  TrendUpIcon,
  NeutralTrendIcon,
} from '~/assets/icons/Icons';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const PriceSkeletonItem = () => (
  <SkeletonPlaceholder borderRadius={4}>
    <View style={[styles.itemContainer]}>
      <View style={{flex: 1}}>
        <View style={{width: 120, height: 16, borderRadius: 4}} />
        <View style={{width: 80, height: 14, marginTop: 12, borderRadius: 4}} />
        <View
          style={{width: 100, height: 12, marginTop: 12, borderRadius: 4}}
        />
      </View>
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          marginLeft: 10,
        }}
      />
    </View>
  </SkeletonPlaceholder>
);

const PriceItem = ({item, isLast}) => {
  const {price, productName, images, changePrice} = item;

  return (
    <View style={styles.itemWrapper}>
      <View style={styles.itemContainer}>
        <View style={styles.priceSection}>
          <View style={styles.priceInfo}>
            <View style={styles.textContainer}>
              <Text style={styles.price}>
                {price?.toLocaleString('vi-VN')} VND
              </Text>
              <Text style={styles.name} numberOfLines={1}>
                {productName}
              </Text>
            </View>
            <FastImage
              source={{uri: `${API_BASE_URL}/api/upload/${images?.[0]}`}}
              style={styles.image}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <View style={styles.changeContainer}>
            {changePrice > 0 ? (
              <TrendUpIcon />
            ) : changePrice < 0 ? (
              <TrendDownIcon />
            ) : (
              <NeutralTrendIcon />
            )}
            <Text style={styles.change}>
              {changePrice === 0 || !changePrice
                ? 'No change this week'
                : `${Math.abs(changePrice).toLocaleString(
                    'vi-VN',
                  )} VND this week`}
            </Text>
          </View>
        </View>
      </View>
      {!isLast && <View style={styles.customRightBorder} />}
    </View>
  );
};

const PriceListSection = ({title, titleStyle, data}) => {
  const renderItem = ({item, index}) => (
    <PriceItem item={item} isLast={index === data.length - 1} />
  );

  return (
    <>
      <Text style={[titleStyle, styles.title]}>{title}</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </>
  );
};

const PriceMovementSummary = ({data, isLoading, isError}) => {
  const renderSkeletonList = () => (
    <FlatList
      data={[1, 2, 3]}
      horizontal
      keyExtractor={(item, index) => `skeleton-${index}`}
      renderItem={() => <PriceSkeletonItem />}
      contentContainerStyle={styles.flatListContent}
      showsHorizontalScrollIndicator={false}
    />
  );

  if (isLoading) {
    return (
      <View style={{marginBottom: scale(10)}}>
        <Text style={[styles.sectionTitleUp, styles.title]}>
          Price increase
        </Text>
        {renderSkeletonList()}
        <Text style={[styles.sectionTitleDown, styles.title]}>
          Price reduction
        </Text>
        {renderSkeletonList()}
      </View>
    );
  }

  if (isError || !Array.isArray(data)) {
    return (
      <View style={styles.errorWrapper}>
        <Text style={{color: 'red'}}>Không thể tải dữ liệu</Text>
      </View>
    );
  }

  const increasedData = data.filter(item => item.changePrice > 0);
  const decreasedData = data.filter(item => item.changePrice < 0);

  return (
    <View style={{marginBottom: scale(10)}}>
      {increasedData.length > 0 && (
        <PriceListSection
          title="Price increase"
          titleStyle={styles.sectionTitleUp}
          data={increasedData}
        />
      )}
      {decreasedData.length > 0 && (
        <PriceListSection
          title="Price reduction"
          titleStyle={styles.sectionTitleDown}
          data={decreasedData}
        />
      )}
    </View>
  );
};

export default PriceMovementSummary;

const styles = StyleSheet.create({
  title: {
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(10),
  },
  sectionTitleUp: {
    color: '#12B000',
  },
  sectionTitleDown: {
    color: '#FF0000',
  },
  flatListContent: {
    marginBottom: scale(16),
    borderWidth: 1,
    borderColor: Colors.border_3,
    borderRadius: scale(10),
    overflow: 'hidden',
    backgroundColor: Colors.white,
    paddingHorizontal: scale(8),
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(16),
    width: scale(250),
    backgroundColor: Colors.white,
  },
  customRightBorder: {
    height: scale(80),
    width: 1.5,
    backgroundColor: Colors.border_3,
    alignSelf: 'center',
  },
  priceSection: {
    flex: 1,
  },
  priceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'column',
  },
  price: {
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
  },
  name: {
    width: scale(150),
    fontSize: FontSizes.small,
    marginVertical: scale(6),
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    marginTop: scale(6),
  },
  change: {
    color: Colors.gray,
    fontSize: FontSizes.small,
  },
  image: {
    width: scale(50),
    height: scale(50),
    resizeMode: 'contain',
    borderRadius: scale(999),
  },
  skeletonBox: {
    backgroundColor: '#ccc',
    borderRadius: 4,
  },
  errorWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(20),
  },
});
