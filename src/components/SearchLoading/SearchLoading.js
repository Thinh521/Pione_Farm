import React, {useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {scale} from '~/utils/scaling';

const SearchLoading = () => {
  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <View style={styles.loadingContainer}>
      <LottieView
        ref={animationRef}
        source={require('~/assets/animation/loading_animation.json')}
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: scale(180),
    height: scale(100),
  },
});

export default SearchLoading;
