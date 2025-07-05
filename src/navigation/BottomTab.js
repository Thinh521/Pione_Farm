import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import routerBottomTab from '~/router/routerBottomTab';
import CustomTabBar from '../components/CustomNavigation/CustomTabBar';
import withLayoutWrapper from '../layout/WithLayoutWrapper';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{headerShown: false}}>
      {routerBottomTab.map(
        ({
          name,
          component,
          label,
          Icon,
          isCenterButton = false,
          hasLayout = false,
          options = {},
        }) => (
          <Tab.Screen
            key={name}
            name={name}
            component={withLayoutWrapper(component, hasLayout)}
            options={{
              ...options,
              tabBarLabel: label || '',
              tabBarCustomIcon: Icon,
              isCenterButton,
            }}
          />
        ),
      )}
    </Tab.Navigator>
  );
};

export default BottomTab;
