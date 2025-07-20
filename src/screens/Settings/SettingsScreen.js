import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {getCurrentUser} from '~/api/userApi';
import styles from './Settings.styles';
import {useNavigation} from '@react-navigation/core';
import {scale} from '~/utils/scaling';
import Button from '~/components/ui/Button/ButtonComponent';
import {logoutUser} from '~/api/authApi';
import SettingsHeader from './components/SettingsHeader';
import AccountSecuritySettings from './components/AccountSecuritySettings';
import AccountPreferencesSettings from './components/AccountPreferencesSettings';
import AccountLanguageSettings from './components/AccountLanguageSettings';
import AccountSupportSettings from './components/AccountSupportSettings';
import {Colors} from '~/theme/theme';
import Background_2 from '~/components/Background/Background_2';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user data
  const fetchUser = async () => {
    try {
      const res = await getCurrentUser();
      setUser(res);
    } catch (err) {
      console.log('Lỗi lấy user:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Handle logout
  const handleLogout = useCallback(async () => {
    try {
      const result = await logoutUser();
      Alert.alert('Thành công', 'Đăng xuất thành công');
      navigation.reset({
        index: 0,
        routes: [{name: 'BottomTab', params: {screen: 'Home'}}],
      });
    } catch (error) {
      console.log('Lỗi đăng xuất:', error.message || error);
      Alert.alert('Lỗi', 'Đăng xuất thất bại. Vui lòng thử lại.');
    }
  }, [navigation]);

  // Handle test navigation
  const handletest = () => {
    navigation.navigate('NoBottomTab', {
      screen: 'Test',
    });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.green} />
        </View>
      ) : (
        <>
          <StatusBar
            backgroundColor={Colors.headerBack}
            barStyle="light-content"
          />

          <Background_2 />

          <ScrollView
            style={styles.content}
            contentContainerStyle={{paddingBottom: scale(100)}}
            showsVerticalScrollIndicator={false}>
            <SettingsHeader user={user} />

            <View style={styles.contentContainer}>
              <AccountSecuritySettings user={user} />

              <AccountPreferencesSettings />

              <AccountLanguageSettings />

              <AccountSupportSettings />
            </View>

            <View style={styles.buttonContainer}>
              <Button.Main
                title="Đăng xuất"
                onPress={handleLogout}
                style={[styles.button, styles.logoutButton]}
                textStyle={styles.buttonText}
              />
              <Button.Main
                onPress={handletest}
                title="Đổi tài khoản"
                style={[styles.button]}
              />
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default SettingsScreen;
