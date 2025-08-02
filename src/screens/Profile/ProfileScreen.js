import React, {useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core';
import styles from './Profile.styles';
import {Colors} from '~/theme/theme';
import Background_2 from '~/components/Background/Background_2';
import {UserIcon, RightIcon} from '~/assets/icons/Icons';
import {getAccessToken, removeTokens} from '~/utils/storage/tokenStorage';
import {deleteUser} from '~/api/authApi';

const ProfileItem = ({title, subtitle, onPress, subtitleStyle}) => (
  <TouchableOpacity style={[styles.item, styles.noBorder]} onPress={onPress}>
    <View style={styles.itemLeft}>
      <UserIcon style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={[styles.itemSubtitle, subtitleStyle]}>{subtitle}</Text>
      </View>
    </View>
    <RightIcon style={styles.rightIcon} />
  </TouchableOpacity>
);

const ProfileScreen = () => {
  const navigation = useNavigation();
  const {user} = useRoute().params || {};

  const handleDeleteAccount = useCallback(async () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn xóa tài khoản không? Hành động này không thể hoàn tác.',
      [
        {text: 'Hủy', style: 'cancel'},
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            try {
              const accessToken = getAccessToken();
              if (!accessToken) {
                console.log('Lỗi', 'Không tìm thấy access token.');
                return;
              }

              await deleteUser(accessToken);
              await removeTokens();
              navigation.reset({
                index: 0,
                routes: [{name: 'BottomTab', params: {screen: 'Home'}}],
              });
            } catch (err) {
              Alert.alert('Thất bại', err.message || 'Xóa tài khoản thất bại');
            }
          },
        },
      ],
    );
  }, [navigation]);

  const navigateToEditProfile = useCallback(() => {
    navigation.navigate('NoBottomTab', {
      screen: 'EditProfile',
      params: {user},
    });
  }, [navigation, user]);

  return (
    <>
      <StatusBar backgroundColor={Colors.headerBack} barStyle="light-content" />
      <Background_2 />

      <ScrollView style={styles.container}>
        {/* Tài khoản */}
        <Text style={styles.sectionTitle}>Tài khoản</Text>
        <View style={styles.card}>
          <ProfileItem
            title="Thông tin tài khoản"
            subtitle="Dữ liệu cá nhân"
            onPress={navigateToEditProfile}
          />
        </View>

        {/* Cài đặt bảo mật */}
        <Text style={styles.sectionTitle}>Cài đặt bảo mật</Text>
        <View style={styles.card}>
          <ProfileItem
            title="Xóa tài khoản"
            subtitle="Xóa tài khoản vĩnh viễn"
            subtitleStyle={{color: '#D32F2F'}}
            onPress={handleDeleteAccount}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default ProfileScreen;
