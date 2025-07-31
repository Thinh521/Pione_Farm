import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LeftIcon} from '~/assets/icons/Icons';
import {scale} from '~/utils/scaling';
import {Colors, FontWeights} from '~/theme/theme';

const CustomHeader = ({title, navigation, rightComponent}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <LeftIcon
          style={{color: Colors.white, width: scale(16), height: scale(16)}}
        />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.right}>{rightComponent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 56 + (Platform.OS === 'ios' ? 20 : 0),
    backgroundColor: Colors.headerBack,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
  },
  backButton: {
    paddingRight: scale(8),
    paddingVertical: scale(8),
  },
  title: {
    flex: 1,
    fontSize: 18,
    color: Colors.white,
    fontWeight: FontWeights.medium,
    textAlign: 'center',
    marginRight: scale(40),
  },
  right: {
    position: 'absolute',
    right: scale(16),
  },
});

export default CustomHeader;
