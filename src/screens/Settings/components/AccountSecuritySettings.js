import React, {memo, useCallback} from 'react';
import {useNavigation} from '@react-navigation/core';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RightIcon} from '~/assets/icons/Icons';
import {scale} from '~/utils/scaling';
import {Colors, Shadows, FontSizes, FontWeights} from '~/theme/theme';

const AccountSecuritySettings = ({user}) => {
  const navigation = useNavigation();

  const NavigationToEditForgotpProfile = useCallback(() => {
    navigation.navigate('NoBottomTab', {
      screen: 'ForgotPasswordProfile',
      params: {user},
    });
  }, [navigation, user]);

  const NavigationToProfile = useCallback(() => {
    navigation.navigate('NoBottomTab', {
      screen: 'Profile',
      params: {user},
    });
  }, [navigation, user]);

  const NavigationToConnectWallet = () => {
    navigation.navigate('NoBottomTab', {
      screen: 'ConnectWallet',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Cài đặt tài khoản</Text>

      <TouchableOpacity
        style={styles.item}
        onPress={NavigationToEditForgotpProfile}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemText}>Đổi mật khẩu</Text>
        </View>
        <RightIcon style={styles.rightIcon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={NavigationToProfile}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemText}>Bảo mật tài khoản</Text>
        </View>
        <RightIcon style={styles.rightIcon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemText}>Xuất dữ liệu cá nhân (Excel, CSV)</Text>
        </View>
        <RightIcon style={styles.rightIcon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={NavigationToConnectWallet}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemText}>Quản lí tài chính</Text>
        </View>
        <RightIcon style={styles.rightIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: scale(20),
    borderColor: Colors.border_3,
    borderWidth: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    borderRadius: scale(10),
    marginVertical: scale(8),
    ...Shadows.medium,
  },
  sectionTitle: {
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
    color: Colors.title,
    marginBottom: scale(8),
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(10),
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: FontSizes.small,
  },
  rightIcon: {
    width: scale(10),
    height: scale(10),
  },
});

export default memo(AccountSecuritySettings);
