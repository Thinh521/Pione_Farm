import React, {useRef, useState, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {isTablet, scale} from '~/utils/scaling';
import {Colors} from '~/theme/theme';

const SliderComponents = ({images}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const intervalRef = useRef(null);
  const {width: windowWidth} = useWindowDimensions();

  const width = Math.round(windowWidth - 32);
  const height = useMemo(
    () => (isTablet ? (width * 5) / 16 : (width * 9) / 16),
    [width],
  );

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
  }, []);

  const startAutoScroll = useCallback(() => {
    stopAutoScroll();
    intervalRef.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
    }, 3000);
  }, [currentIndex, images.length]);

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [startAutoScroll]);

  const handleDotPress = index => {
    stopAutoScroll();
    setCurrentIndex(index);
    flatListRef.current?.scrollToIndex({index, animated: true});
    setTimeout(startAutoScroll, 3000);
  };

  return (
    <View style={{marginBottom: scale(20), width, alignSelf: 'center'}}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={width}
        decelerationRate="fast"
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
        renderItem={({item}) => (
          <View style={[styles.imageContainer, {width, height}]}>
            <FastImage
              source={item}
              style={styles.image}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        )}
      />

      <View style={[styles.dotsContainer]}>
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleDotPress(index)}
            style={index === currentIndex ? styles.bigDot : styles.smallDot}
          />
        ))}
      </View>
    </View>
  );
};

export default SliderComponents;

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: scale(16),
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(8),
    gap: scale(8),
  },
  smallDot: {
    width: scale(8),
    height: scale(8),
    backgroundColor: '#DEDBDB',
    borderRadius: 9999,
  },
  bigDot: {
    width: scale(10),
    height: scale(10),
    backgroundColor: Colors.green,
    borderRadius: 9999,
  },
});
