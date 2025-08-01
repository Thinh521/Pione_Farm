import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {scale} from '~/utils/scaling';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import FastImage from 'react-native-fast-image';
import Images from '~/assets/images/Images';

const ErrorView = () => {
  return (
    <View style={styles.errorContainer}>
      <FastImage
        source={Images.empty_box}
        style={styles.errorImage}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.errorText}>Không có dữ liệu</Text>
    </View>
  );
};

export default ErrorView;

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(40),
  },
  errorImage: {
    width: scale(100),
    height: scale(100),
  },
  errorText: {
    marginTop: scale(4),
    textAlign: 'center',
    color: Colors.blueText,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
  },
});
