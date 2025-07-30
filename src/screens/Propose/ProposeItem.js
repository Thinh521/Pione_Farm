import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

const ProposeItem = ({title, description, images, value, percent, onPress}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={images[0]} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {description}
        </Text>
        <View style={styles.stats}>
          <Text style={styles.value}>{value}</Text>
          <Text style={styles.percent}>{percent}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProposeItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginVertical: scale(8),
    padding: scale(12),
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: Colors.border_3,
  },
  image: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(12),
    marginRight: scale(12),
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.title,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
  },
  description: {
    color: Colors.grayText_4,
    fontSize: FontSizes.xsmall,
    lineHeight: scale(16),
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    color: Colors.grayText_4,
    fontSize: FontSizes.xsmall,
    fontWeight: FontWeights.semiBold,
  },
  percent: {
    color: '#9bb0e8',
    marginLeft: scale(8),
    fontSize: FontSizes.xsmall,
    fontWeight: FontWeights.bold,
  },
});
