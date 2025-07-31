import React, {useEffect, useRef, useCallback, useState} from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  Text,
  StyleSheet,
  Keyboard,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CommonActions} from '@react-navigation/native';
import {FontSizes, FontWeights, Shadows} from '~/theme/theme';
import {useTheme} from '~/context/ThemeContext';
import {getAccessToken} from '~/utils/storage/tokenStorage';

const CustomTabBar = ({state, descriptors, navigation, config = {}}) => {
  const insets = useSafeAreaInsets();
  const visible = useRef(new Animated.Value(1)).current;
  const iconScales = useRef(
    state.routes.map(() => new Animated.Value(1)),
  ).current;
  const {theme} = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const {
    activeColor = '#347AE2',
    inactiveColor = '#7C8DB5',
    backgroundColor = theme.background,
    centerActiveColor = theme.primary,
    centerInactiveColor = theme.card,
    tabHeight = 76,
    centerButtonSize = 60,
    iconSize = 24,
    iconAnimationScale = 1.3,
    animationDuration = 250,
    hideOnKeyboard = true,
    onPress = () => {},
    onLongPress = () => {},
  } = config;

  useEffect(() => {
    const token = getAccessToken();
    setIsAuthenticated(!!token);
  }, []);

  const animateIcons = useCallback(
    newIndex => {
      const animations = iconScales.map((scale, index) =>
        Animated.timing(scale, {
          toValue: index === newIndex ? iconAnimationScale : 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      );
      Animated.parallel(animations).start();
    },
    [iconAnimationScale, iconScales, animationDuration],
  );

  const handlePressIn = useCallback(
    index => {
      Animated.timing(iconScales[index], {
        toValue: iconAnimationScale * 1.1,
        duration: animationDuration / 1.5,
        useNativeDriver: true,
      }).start();
    },
    [iconAnimationScale, iconScales, animationDuration],
  );

  const handlePressOut = useCallback(
    (index, isFocused) => {
      Animated.timing(iconScales[index], {
        toValue: isFocused ? iconAnimationScale : 1,
        duration: animationDuration,
        useNativeDriver: true,
      }).start();
    },
    [iconAnimationScale, iconScales, animationDuration],
  );

  useEffect(() => {
    animateIcons(state.index);
  }, [state.index, animateIcons]);

  useEffect(() => {
    if (!hideOnKeyboard) return;

    const showEvent =
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    const hideEvent =
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';

    const showListener = Keyboard.addListener(showEvent, () =>
      Animated.timing(visible, {
        toValue: 0,
        duration: animationDuration * 2,
        useNativeDriver: true,
      }).start(),
    );
    const hideListener = Keyboard.addListener(hideEvent, () =>
      Animated.timing(visible, {
        toValue: 1,
        duration: animationDuration * 2,
        useNativeDriver: true,
      }).start(),
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, [hideOnKeyboard, animationDuration]);

  const tabBarHeight = tabHeight + insets.bottom;

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: tabBarHeight,
      backgroundColor,
      borderTopWidth: 0.5,
      borderTopColor: '#CCC',
      ...Shadows.medium,
      transform: [
        {
          translateY: visible.interpolate({
            inputRange: [0, 1],
            outputRange: [tabBarHeight, 0],
          }),
        },
      ],
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    tabItem: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    tabLabel: {
      marginTop: 4,
      fontSize: FontSizes.xsmall,
      fontWeight: FontWeights.medium,
      color: inactiveColor,
    },
    activeLabel: {
      color: activeColor,
    },
  });

  const handleTabPress = (index, route) => {
    const {options} = descriptors[route.key];
    const requiresAuth = options?.requiresAuth;

    if (requiresAuth && isAuthenticated === false) {
      navigation.navigate('NoBottomTab', {screen: 'LoginRequired'});
      return;
    }

    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (state.index !== index && !event.defaultPrevented) {
      navigation.dispatch({
        ...CommonActions.navigate({name: route.name, merge: true}),
        target: state.key,
      });
    }

    onPress(index, route);
    animateIcons(index);
  };

  return (
    <Animated.View
      style={styles.container}
      pointerEvents={visible.__getValue() ? 'auto' : 'none'}>
      <View style={styles.content} accessibilityRole="tablist">
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const {options} = descriptors[route.key];
          const label = options.tabBarLabel ?? options.title ?? route.name;
          const Icon = options.tabBarCustomIcon ?? (() => null);

          const handlePress = () => handleTabPress(index, route);
          const handleLongPress = () => {
            navigation.emit({type: 'tabLongPress', target: route.key});
            onLongPress(index, route);
          };

          const buttonProps = {
            accessibilityRole: 'button',
            accessibilityLabel:
              options.tabBarAccessibilityLabel ?? `${label} tab`,
            activeOpacity: 0.8,
            onPress: handlePress,
            onLongPress: handleLongPress,
            onPressIn: () => handlePressIn(index),
            onPressOut: () => handlePressOut(index, focused),
          };

          const icon = (
            <Animated.View style={{transform: [{scale: iconScales[index]}]}}>
              <Icon
                style={{color: focused ? activeColor : inactiveColor}}
                focused={focused}
                size={iconSize}
              />
            </Animated.View>
          );

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabItem}
              {...buttonProps}>
              {icon}
              {/* Nếu bạn cần text label, bỏ comment phần dưới */}
              {/* <Text style={[styles.tabLabel, focused && styles.activeLabel]}>
                {label}
              </Text> */}
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  );
};

export default CustomTabBar;
