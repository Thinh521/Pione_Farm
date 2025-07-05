import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RightIcon} from '../../../assets/icons/Icons';
import {scale} from '../../../utils/scaling';
import {Colors, Shadows} from '../../../theme/theme';
import {useNavigation} from '@react-navigation/core';

const AccountLanguageSettings = () => {
  const navigation = useNavigation();

  const NavigationToLanguage = () => {
    navigation.navigate('NoBottomTab', {
      screen: 'Language',
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Cài đặt tài khoản</Text>

      <TouchableOpacity style={styles.item} onPress={NavigationToLanguage}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemText}>Chọn ngôn ngữ</Text>
        </View>
        <RightIcon style={styles.rightIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default AccountLanguageSettings;

const styles = StyleSheet.create({
  container: {
    marginTop: scale(20),
    borderColor: '#f5f5f5',
    borderWidth: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 8,
    ...Shadows.medium,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 16,
    marginRight: 8,
  },
  itemText: {
    fontSize: 15,
    color: '#111',
  },
  rightIcon: {
    width: scale(12),
    height: scale(12),
  },
});
