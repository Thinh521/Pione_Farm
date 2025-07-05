import React from 'react';
import Images from '~/assets/images/Images';
import {ImageBackground, StyleSheet} from 'react-native';
import {Colors} from '~/theme/theme';

const Background = ({children}) => {
  return (
    <ImageBackground
      source={Images.background}
      style={styles.backgroundImage}
      resizeMode="cover">
      {children}
    </ImageBackground>
  );
};

export default Background;

const styles = StyleSheet.create({
  backgroundImage: {
    backgroundColor: Colors.white,
    ...StyleSheet.absoluteFillObject,
  },
});
