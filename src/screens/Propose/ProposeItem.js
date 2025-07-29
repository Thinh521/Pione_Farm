import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const ProposeItem = ({title, description, image, value, percent, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
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
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 8,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d0d8f0',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
  },
  description: {
    fontSize: 13,
    color: '#555',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  value: {
    marginLeft: 4,
    fontWeight: '500',
    fontSize: 14,
    color: '#4a4a4a',
  },
  percent: {
    marginLeft: 8,
    fontSize: 14,
    color: '#9bb0e8',
  },
});
