import React, {useEffect, useRef, useCallback, memo} from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {API_BASE_URL} from '@env';
import {scale} from '~/utils/scaling';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {DateIcon} from '~/assets/icons/Icons';
import {useNavigation} from '@react-navigation/core';

const AnimatedCard = memo(({item, index}) => {
  const navigation = useNavigation();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (index < 5) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 500 + index * 200,
        useNativeDriver: true,
      }).start();
    }
  }, []);

  const animatedStyle = {
    opacity: animatedValue,
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [30, 0],
        }),
      },
    ],
  };

  const handlePress = () => {
    navigation.navigate('NoBottomTab', {
      screen: 'NewDetail',
      params: {newsId: item._id},
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <FastImage
          source={{uri: `${API_BASE_URL}/api/upload/${item.images?.[0]}`}}
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {item.summary}
          </Text>

          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <DateIcon style={styles.dateIcon} />
              <Text style={styles.metaText}>
                {new Date(item.createdAt).toLocaleDateString('vi-VN')}
              </Text>
            </View>

            <View style={styles.metaItem}>
              <Text style={styles.metaText}>
                Tỉnh: {item.provinceName || 'Tin chung'}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
});

const NewsList = ({data = []}) => {
  const renderItem = useCallback(
    ({item, index}) => <AnimatedCard item={item} index={index} />,
    [],
  );

  const keyExtractor = useCallback((item, index) => `${item._id}-${index}`, []);

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      initialNumToRender={5}
      maxToRenderPerBatch={8}
      windowSize={5}
      removeClippedSubviews={true}
    />
  );
};

export default memo(NewsList);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(16),
    backgroundColor: Colors.white,
    borderRadius: scale(10),
    padding: scale(10),
    borderColor: Colors.border,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(10),
    marginRight: scale(12),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: Colors.title,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(4),
  },
  description: {
    lineHeight: scale(14),
    fontSize: FontSizes.xsmall,
    color: '#555',
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(8),
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateIcon: {
    width: scale(14),
    height: scale(14),
    marginRight: scale(4),
  },
  metaText: {
    color: Colors.grayText,
    fontSize: FontSizes.xsmall,
    fontWeight: FontWeights.semiBold,
  },
});
