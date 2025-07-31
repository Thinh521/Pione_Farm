import {Dimensions, ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import Images from '~/assets/images/Images';
import {scale} from '~/utils/scaling';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const Background_2 = () => {
  return (
    <>
      <ImageBackground
        source={Images.background_top}
        style={styles.topBackground}
        resizeMode="stretch"
      />

      <ImageBackground
        source={Images.background_bottom}
        style={styles.bottomBackground}
        resizeMode="stretch"
      />
    </>
  );
};

export default Background_2;

const styles = StyleSheet.create({
  topBackground: {
    position: 'absolute',
    top: -scale(270),
    left: -scale(750),
    width: SCREEN_WIDTH + scale(1000),
    height: scale(500),
  },
  bottomBackground: {
    position: 'absolute',
    bottom: -scale(80),
    left: -scale(40),
    width: SCREEN_WIDTH + scale(120),
    height: scale(300),
  },
});
