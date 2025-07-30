import React, {useEffect, useState} from 'react';
import AppNavigator from './src/navigation';
import SplashScreen from './src/screens/Splash/SplashScreen';
import FlashMessage from 'react-native-flash-message';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from './src/context/ThemeContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {storage} from './src/utils/storage/onboardingStorage';
import {AuthProvider} from './src/context/AuthContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AppKit} from '@reown/appkit-ethers-react-native';

import './src/config/AppKitSetup';

import {
  requestUserPermission,
  setupFCMListeners,
  uploadFcmTokenIfNeeded,
} from './src/utils/firebaseMessageHandler';
import DidYouKnowTip from './src/components/DidYouKnowTip/DidYouKnowTip';

const queryClient = new QueryClient();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const initNotification = async () => {
      await requestUserPermission();
      await uploadFcmTokenIfNeeded();
      setupFCMListeners();
    };

    initNotification();
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
              <AppKit />
            </NavigationContainer>
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
