import React from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import Images from '../../../assets/images/Images';
import {TrendDownIcon, TrendUpIcon} from '../../../assets/icons/Icons';

const PriceItem = ({price, name, image, change, changePercent, isIncrease}) => {
  return (
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
          <Text
            style={[
              styles.change,
              isIncrease ? styles.increase : styles.decrease,
            ]}>
            {isIncrease ? <TrendUpIcon /> : <TrendDownIcon />} {change} +
            {changePercent}% this week
          </Text>
        </View>
      </View>
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
  ];

  const renderItem = ({item}) => {
    return (
      <PriceItem
        price={item.price}
        name={item.name}
        image={item.image}
        change={item.change}
        changePercent={item.changePercent}
        isIncrease={item.isIncrease}
      />
    );
  };

  return (
    <View>
      <Text style={styles.sectionTitleUp}>Price increase</Text>
      <FlatList
        data={data.slice(0, 2)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
      <Text style={styles.sectionTitleDown}>Price reduction</Text>
      <FlatList
        data={data.slice(2)}
        renderItem={renderItem}
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
  sectionTitleUp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#12B000',
    marginBottom: 10,
  },
  sectionTitleDown: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF0000',
    marginBottom: 10,
  },
  flatListContent: {
    paddingVertical: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E6EDFF',
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    marginRight: 10,
    width: 250,
  },
  priceSection: {
    flex: 1,
  },
  priceInfo: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'column',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
    marginVertical: 5,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  change: {
    fontSize: 14,
  },
  increase: {
    color: '#10B981',
  },
  decrease: {
    color: '#EF4444',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  proposeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 12,
    width: 100,
    height: 100,
  },
  proposeText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  proposeImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});
