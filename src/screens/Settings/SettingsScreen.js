import React, {useCallback} from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useQuery} from '@tanstack/react-query';
import {getCurrentUser} from '~/api/userApi';
import {logoutUser} from '~/api/authApi';
import styles from './Settings.styles';
import {Colors} from '~/theme/theme';
import {scale} from '~/utils/scaling';
import SettingsHeader from './components/SettingsHeader';
import AccountSecuritySettings from './components/AccountSecuritySettings';
import AccountPreferencesSettings from './components/AccountPreferencesSettings';
import AccountLanguageSettings from './components/AccountLanguageSettings';
import AccountSupportSettings from './components/AccountSupportSettings';
import Button from '~/components/ui/Button/ButtonComponent';
import Background_2 from '~/components/Background/Background_2';
import ErrorView from '~/components/ErrorView/ErrorView';

const SettingsScreen = () => {
  const navigation = useNavigation();

  const {
    data: userData,
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });

  const handleLogout = useCallback(async () => {
    try {
      await logoutUser();
      Alert.alert('Thành công', 'Đăng xuất thành công');
      navigation.reset({
        index: 0,
        routes: [{name: 'BottomTab', params: {screen: 'Home'}}],
      });
    } catch (error) {
      console.log('Lỗi đăng xuất:', error?.message || error);
    }
  }, [navigation]);

  const handleSwitchAccount = () => {
    navigation.navigate('NoBottomTab', {screen: 'Test'});
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.green} />
      </View>
    );
  }

  if (isError) {
    return <ErrorView />;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.headerBack} barStyle="light-content" />
      <Background_2 />

      <ScrollView
        style={styles.content}
        contentContainerStyle={{paddingBottom: scale(100)}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            colors={[Colors.green]}
            tintColor={Colors.green}
          />
        }>
        <SettingsHeader user={userData} />

        <View style={styles.contentContainer}>
          <AccountSecuritySettings user={userData} />
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
            title="Đổi tài khoản"
            onPress={handleSwitchAccount}
            style={styles.button}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
