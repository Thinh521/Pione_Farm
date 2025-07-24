import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {RightIcon} from '~/assets/icons/Icons';
import {scale} from '~/utils/scaling';
import {Colors, Shadows} from '~/theme/theme';

const AccountSecuritySettings = ({user}) => {
  const navigation = useNavigation();

  const NavigationToEditForgotpProfile = () => {
    navigation.navigate('NoBottomTab', {
      screen: 'ForgotPasswordProfile',
      params: {user},
    });
  };

  const NavigationToProfile = () => {
    navigation.navigate('NoBottomTab', {
      screen: 'Profile',
      params: {user},
    });
  };

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
  itemText: {
    fontSize: 15,
    color: '#111',
  },
  rightIcon: {
    width: scale(12),
    height: scale(12),
  },
  sendButton: {
    backgroundColor: Colors.primary,
    marginTop: scale(10),
    paddingVertical: scale(8),
    borderRadius: scale(6),
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  signButton: {
    backgroundColor: Colors.green,
    marginTop: scale(10),
    paddingVertical: scale(8),
    borderRadius: scale(6),
    alignItems: 'center',
  },
});

export default AccountSecuritySettings;
