import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {scale} from '~/utils/scaling';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';

const ErrorView = () => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>Đã có lỗi xảy ra</Text>
      <Text style={styles.errorSub}>Vui lòng thử lại sau</Text>
    </View>
  );
};

export default ErrorView;

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(40),
  },
  errorText: {
    color: Colors.red,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.medium,
    textAlign: 'center',
  },
  errorSub: {
    color: Colors.red,
    fontSize: FontSizes.small,
    marginTop: scale(2),
    textAlign: 'center',
  },
});
