import React, {useEffect, useState} from 'react';
import AppNavigator from './src/navigation';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from './src/context/ThemeContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {storage} from './src/utils/storage/onboardingStorage';
import SplashScreen from './src/screens/Splash/SplashScreen';
import FlashMessage from 'react-native-flash-message';
import {AuthProvider} from './src/context/AuthContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AppKit} from '@reown/appkit-ethers-react-native';

import './src/config/AppKitSetup';

import {
  getFcmToken,
  requestUserPermission,
  setupFCMListeners,
} from './src/utils/firebaseMessageHandler';
import {getSavedFcmToken} from './src/utils/storage/fcmStorage';
import {saveFcmToken} from './src/api/fcmApi';

const queryClient = new QueryClient();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const initNotification = async () => {
      await requestUserPermission();
      await getFcmToken();
      setupFCMListeners();
    };

    initNotification();
  }, []);

  useEffect(() => {
    const handleFCMToken = async () => {
      try {
        const user = await getUserData();
        if (!user?.id) return;

        const newToken = await getFcmToken();
        const oldToken = await getSavedFcmToken();

        if (newToken && newToken !== oldToken) {
          const res = await saveFcmToken({
            userId: user.id,
            fcmToken: newToken,
          });
          console.log('Đã gửi FCM token mới lên server:', res);

          await saveFcmTokenLocally(newToken);
        } else {
          console.log('FCM token chưa thay đổi, không cần gửi lại.');
        }
      } catch (error) {
        console.log('Lỗi khi xử lý FCM token:', error);
      }
    };

    handleFCMToken();
  }, []);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const [completed] = await Promise.all([
          storage.getBoolean('hasCompletedOnboarding'),
          new Promise(resolve => setTimeout(resolve, 1500)),
        ]);
        setInitialRoute(completed ? 'BottomTab' : 'OnboardingScreen');
      } catch (error) {
        console.error('Lỗi khi kiểm tra trạng thái onboarding:', error);
        setInitialRoute('OnboardingScreen');
      }
    };

    checkOnboarding();
  }, []);

  if (!initialRoute) return <SplashScreen />;

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AuthProvider>
            <NavigationContainer>
              <AppNavigator initialRouteName={initialRoute} />
              <FlashMessage position="top" />
            </NavigationContainer>
            <AppKit />
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
