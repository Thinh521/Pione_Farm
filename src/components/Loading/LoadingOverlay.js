import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Images from '../../assets/images/Images';

const LoadingOverlay = () => {
  return (
    <View style={styles.overlay}>
      <FastImage source={Images.splash_screen} style={styles.logo} />
      <ActivityIndicator size="large" color="#4CAF50" />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 157.59,
    height: 132,
    marginBottom: 20,
    resizeMode: 'contain',
  },
});

export default LoadingOverlay;
