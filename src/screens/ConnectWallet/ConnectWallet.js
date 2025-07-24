import React from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {AppKitButton} from '@reown/appkit-ethers-react-native';
import FastImage from 'react-native-fast-image';
import styles from './ConnectWallet.styles';
import Images from '~/assets/images/Images';
import Background_2 from '~/components/Background/Background_2';

const ConnectWallet = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Background_2 />

        <FastImage
          source={Images.splash_screen}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Kết nối ví của bạn</Text>
        <Text style={styles.subtitle}>
          Để bắt đầu sử dụng, vui lòng kết nối ví Web3 của bạn.
        </Text>

        <View style={styles.buttonContainer}>
          <AppKitButton balance="show" />
        </View>
      </SafeAreaView>
    </>
  );
};

export default ConnectWallet;
