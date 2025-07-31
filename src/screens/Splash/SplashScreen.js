import React from 'react';
import {StatusBar,View} from 'react-native';
import styles from './Splash.styles';
import Images from '~/assets/images/Images';
import FastImage from 'react-native-fast-image';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#E8FEFF" barStyle="dark-content" />
      <FastImage source={Images.splash_screen} style={styles.logo} />
    </View>
  );
};

export default SplashScreen;
