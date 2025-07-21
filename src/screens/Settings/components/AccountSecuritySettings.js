import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {RightIcon} from '~/assets/icons/Icons';
import {scale} from '~/utils/scaling';
import {Colors, Shadows} from '~/theme/theme';
import {AppKitButton, useWalletInfo} from '@reown/appkit-ethers-react-native';
import {ethers} from 'ethers';

const AccountSecuritySettings = ({user}) => {
  const navigation = useNavigation();
  const {address, isConnected, provider} = useWalletInfo();
  const [ethBalance, setEthBalance] = useState(null);

  console.log('address', address);
  console.log('provider', provider);
  console.log('ethBalance', ethBalance);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (provider && address) {
          const balance = await provider.getBalance(address);
          setEthBalance(ethers.utils.formatEther(balance));
        }
      } catch (error) {
        console.log('Lỗi khi lấy số dư ETH:', error);
      }
    };

    if (isConnected) {
      console.log('Địa chỉ ví:', address);
      fetchBalance();
    }
  }, [isConnected, provider, address]);

  const sendTransaction = async () => {
    try {
      if (!provider || !address) {
        console.log('Ví chưa được kết nối hoặc không có provider.');
        return;
      }

      const signer = provider.getSigner();

      const tx = await signer.sendTransaction({
        to: '0xRecipientAddressHere',
        value: ethers.utils.parseEther('0.01'),
      });

      console.log('Giao dịch đã gửi, hash:', tx.hash);

      const receipt = await tx.wait();
      console.log('Giao dịch đã xác nhận:', receipt);

      const updatedBalance = await provider.getBalance(address);
      setEthBalance(ethers.utils.formatEther(updatedBalance));
    } catch (error) {
      console.error('Lỗi khi gửi giao dịch:', error);
    }
  };

  const signMessage = async () => {
    try {
      if (!provider || !address) {
        console.log('Ví chưa được kết nối hoặc không có provider.');
        return;
      }

      const signer = provider.getSigner();
      const message = 'Tôi đồng ý với điều khoản!';
      const signature = await signer.signMessage(message);

      console.log('Chữ ký:', signature);
      Alert.alert('Chữ ký thành công', signature);
    } catch (error) {
      console.error('Lỗi khi ký thông điệp:', error);
      Alert.alert('Lỗi', 'Không thể ký thông điệp.');
    }
  };

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

      <TouchableOpacity style={[styles.item, {marginBottom: scale(10)}]}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemText}>Xuất dữ liệu cá nhân (Excel, CSV)</Text>
        </View>
        <RightIcon style={styles.rightIcon} />
      </TouchableOpacity>

      <View>
        <Text style={[styles.itemText, {marginBottom: scale(10)}]}>
          Quản lí tài chính
        </Text>

        {/* Nút kết nối ví từ AppKit */}
        <AppKitButton />

        {isConnected ? (
          <>
            <Text style={{marginTop: 10}}>Ví đã kết nối: {address}</Text>
            <Text style={{marginTop: 5}}>
              Số dư ETH:{' '}
              {ethBalance !== null ? `${ethBalance} ETH` : 'Đang tải...'}
            </Text>

            <TouchableOpacity
              style={styles.sendButton}
              onPress={sendTransaction}>
              <Text style={styles.sendButtonText}>Gửi 0.01 ETH</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signButton} onPress={signMessage}>
              <Text style={styles.sendButtonText}>Ký điều khoản sử dụng</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={{marginTop: 10}}>Ví chưa được kết nối</Text>
        )}
      </View>
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
