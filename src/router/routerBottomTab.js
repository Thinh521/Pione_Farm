import HomeScreen from '../screens/Home/HomeScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import TrendScreen from '../screens/Trend/TrendScreen';
import {
  AnalyticsIcon,
  ChartIconTab,
  GlobalMarketIcon,
  SettingIcon,
  UserProfileIcon,
} from '../assets/icons/Icons';
import StatisticalScreen from '../screens/Statistical/StatisticalScreen';
import NotificationScreen from '../screens/Notification/NotificationScreen';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, FontWeights} from '../theme/theme';

const routerBottomTab = [
  {
    name: 'Home',
    component: HomeScreen,
    label: 'Trang chủ',
    Icon: ChartIconTab,
    hasLayout: true,
    options: {
      headerShown: false,
      requiresAuth: false,
    },
  },
  {
    name: 'Trend',
    component: TrendScreen,
    label: 'Xu hướng',
    Icon: AnalyticsIcon,
    hasLayout: true,
    options: {
      headerShown: false,
      requiresAuth: true,
    },
  },
  {
    name: 'Statistical',
    component: StatisticalScreen,
    label: 'Thống kê',
    Icon: GlobalMarketIcon,
    hasLayout: true,
    options: {
      headerShown: false,
      requiresAuth: true,
    },
  },
  {
    name: 'Notification',
    component: NotificationScreen,
    label: 'Thông báo',
    Icon: UserProfileIcon,
    hasLayout: true,
    options: {
      headerShown: false,
      requiresAuth: true,
    },
  },
  {
    name: 'Settings',
    component: SettingsScreen,
    label: 'Cài đặt',
    Icon: SettingIcon,
    hasLayout: false,
    options: {
      headerShown: true,
      requiresAuth: true,
      headerTitle: 'Cài đặt',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: Colors.headerBack,
      },
      headerTitleStyle: {
        fontSize: 18,
        color: Colors.white,
        fontWeight: FontWeights.medium,
      },
    },
  },
];

export default routerBottomTab;
