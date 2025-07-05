import React from 'react';
import BottomTab from './BottomTab';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NoBottomTab from './NoBottomTab';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';

const RootStack = createNativeStackNavigator();

const AppNavigator = ({initialRouteName}) => {
  return (
    <RootStack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{headerShown: false}}>
      <RootStack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <RootStack.Screen name="BottomTab" component={BottomTab} />
      <RootStack.Screen name="NoBottomTab" component={NoBottomTab} />
    </RootStack.Navigator>
  );
};

export default AppNavigator;
