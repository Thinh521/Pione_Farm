import React from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import Images from '~/assets/images/Images';
import {TrendDownIcon, TrendUpIcon} from '~/assets/icons/Icons';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

const PriceItem = ({
  price,
  name,
  image,
  change,
  changePercent,
  isIncrease,
  isLast,
}) => {
  return (
    <View style={styles.itemWrapper}>
      <View style={styles.itemContainer}>
        <View style={styles.priceSection}>
          <View style={styles.priceInfo}>
            <View style={styles.textContainer}>
              <Text style={styles.price}>${price}</Text>
              <Text style={styles.name}>{name}</Text>
            </View>
            <Image source={image} style={styles.image} />
          </View>
          <View style={styles.changeContainer}>
            <Text>{isIncrease ? <TrendUpIcon /> : <TrendDownIcon />}</Text>
            <Text style={styles.change}>
              {change} {changePercent && `+${changePercent}%`} this week
            </Text>
          </View>
        </View>
      </View>

      {!isLast && <View style={styles.customRightBorder} />}
    </View>
  );
};

const PriceMovementSummary = () => {
  const data = [
    {
      id: '1',
      price: '17',
      name: 'Mango',
      image: Images.Mango_2,
      change: '10.2',
      changePercent: '89.01',
      isIncrease: true,
    },
    {
      id: '2',
      price: '23',
      name: 'Rambut',
      image: Images.Mango_2,
      change: '3.1',
      changePercent: '',
      isIncrease: true,
    },
    {
      id: '3',
      price: '17',
      name: 'Mango',
      image: Images.Mango_2,
      change: '10.2',
      changePercent: '89.01',
      isIncrease: false,
    },
    {
      id: '4',
      price: '23',
      name: 'Consum',
      image: Images.Mango_2,
      change: '3.1',
      changePercent: '',
      isIncrease: false,
    },
    {
      id: '5',
      price: '23',
      name: 'Consum',
      image: Images.Mango_2,
      change: '3.1',
      changePercent: '',
      isIncrease: false,
    },
    {
      id: '6',
      price: '23',
      name: 'Rambut',
      image: Images.Mango_2,
      change: '3.1',
      changePercent: '',
      isIncrease: true,
    },
  ];

  const increasedData = data.filter(item => item.isIncrease);
  const decreasedData = data.filter(item => !item.isIncrease);

  const renderItem =
    listData =>
    ({item, index}) => {
      const isLast = index === listData.length - 1;
      return <PriceItem {...item} isLast={isLast} />;
    };

  return (
    <View style={{marginBottom: scale(10)}}>
      {/* Price Increase Section */}
      <Text style={[styles.sectionTitleUp, styles.title]}>Price increase</Text>
      <FlatList
        data={increasedData}
        renderItem={renderItem(increasedData)}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />

      {/* Price Decrease Section */}
      <Text style={[styles.sectionTitleDown, styles.title]}>
        Price reduction
      </Text>
      <FlatList
        data={decreasedData}
        renderItem={renderItem(decreasedData)}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
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
    fontSize: FontSizes.large,
    fontWeight: FontWeights.semiBold,
  },
  name: {
    fontSize: FontSizes.small,
    marginVertical: scale(6),
  },
  changeContainer: {
    gap: scale(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  change: {
    color: Colors.gray,
    fontSize: FontSizes.small,
  },
  image: {
    width: scale(50),
    height: scale(50),
    resizeMode: 'contain',
  },
});
