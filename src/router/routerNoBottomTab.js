import LoginScreen from '~/screens/Auth/Login/LoginScreen';
import RegisterScreen from '~/screens/Auth/Register';
import OnboardingScreen from '~/screens/Onboarding/OnboardingScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPassword/ForgotPassword';
import OTPInputScreen from '../screens/Auth/OtpInput/OtpInputScreen';
import LoginRequiredScreen from '../screens/Auth/Login/LoginRequiredScreen';
import ResetPasswordScreen from '../screens/Auth/ResetPassword/ResetPasswordScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import ForgotPasswordProfileScreen from '../screens/Profile/ForgotPasswordScreen';
import PriceComparisonScreen from '../screens/Home/PriceComparison/PriceComparisonScreen';
import AdvancedSearchScreen from '../screens/Home/AdvancedSearch/AdvancedSearchScreen';
import IntroScreen from '../screens/Home/Intro/IntroScreen';
import MarketScreen from '../screens/Home/Market/MarketScreen';
import NewsScreen from '../screens/Home/News/NewsScreen';
import LanguageScreen from '../screens/Settings/Language/LanguageScreen';
import TestScreen from '../screens/Test/TestScreen';
import FruitListScreen from '../screens/FruitList/FruitList';
import CustomHeader from '../components/CustomNavigation/CustomHeader';
import WalletAllScreen from '../screens/Home/WalletAll/WalletAllScreen';
import ChatbotScreen from '../screens/Chatbot/ChatbotScreen';

const routerNoBottomTab = [
  {
    name: 'Onboarding',
    component: OnboardingScreen,
    hasLayout: false,
    options: {
      title: 'Giới thiệu',
      headerShown: false,
      animation: 'fade',
    },
  },
  {
    name: 'Login',
    component: LoginScreen,
    hasLayout: false,
    options: {
      title: 'Đăng nhập',
      headerShown: false,
      animation: 'slide_from_left',
    },
  },
  {
    name: 'Register',
    component: RegisterScreen,
    hasLayout: false,
    options: {
      title: 'Đăng ký',
      headerShown: false,
      animation: 'slide_from_right',
    },
  },
  {
    name: 'ForgotPassword',
    component: ForgotPasswordScreen,
    hasLayout: false,
    options: {
      title: 'Quên mật khẩu',
      headerShown: false,
      animation: 'slide_from_bottom',
    },
  },
  {
    name: 'ResetPassword',
    hasLayout: false,
    component: ResetPasswordScreen,
    options: {
      title: 'Quên mật khẩu',
      headerShown: false,
      animation: 'slide_from_bottom',
    },
  },
  {
    name: 'OtpInput',
    component: OTPInputScreen,
    hasLayout: true,
    options: {
      title: 'Mã OTP',
      headerShown: true,
      animation: 'slide_from_bottom',
    },
  },
  {
    name: 'LoginRequired',
    component: LoginRequiredScreen,
    options: {
      title: 'Kiểm tra Login',
      headerShown: false,
      animation: 'fade',
    },
  },
  {
    name: 'Profile',
    component: ProfileScreen,
    options: ({navigation}) => ({
      header: () => (
        <CustomHeader title="Bảo mật tài khoản" navigation={navigation} />
      ),
    }),
  },
  {
    name: 'EditProfile',
    component: EditProfileScreen,
    options: ({navigation}) => ({
      header: () => (
        <CustomHeader title="Chỉnh sửa thông tin" navigation={navigation} />
      ),
    }),
  },
  {
    name: 'ForgotPasswordProfile',
    component: ForgotPasswordProfileScreen,
    options: ({navigation}) => ({
      header: () => (
        <CustomHeader title="Đổi mật khẩu" navigation={navigation} />
      ),
    }),
  },
  {
    name: 'PriceComparison',
    component: PriceComparisonScreen,
    hasLayout: true,
    options: {
      title: 'Tra cứu tổng hợp',
      headerShown: false,
    },
  },
  {
    name: 'AdvancedSearch',
    component: AdvancedSearchScreen,
    hasLayout: true,
    options: {
      title: 'Tra cứu tổng nâng cao',
      headerShown: false,
    },
  },
  {
    name: 'Intro',
    component: IntroScreen,
    hasLayout: true,
    options: {
      title: 'Giới thiệu chung',
      headerShown: false,
    },
  },
  {
    name: 'Market',
    component: MarketScreen,
    hasLayout: true,
    options: {
      title: 'Thị trường',
      headerShown: false,
    },
  },
  {
    name: 'News',
    component: NewsScreen,
    hasLayout: true,
    options: {
      title: 'Thị trường',
      headerShown: false,
    },
  },
  {
    name: 'Test',
    component: TestScreen,
    hasLayout: true,
    options: {
      title: 'Thị trường',
      headerShown: true,
    },
  },
  {
    name: 'Fruit',
    component: FruitListScreen,
    options: {
      title: 'Thị trường',
      headerShown: false,
    },
  },
  {
    name: 'Language',
    component: LanguageScreen,
    options: ({navigation}) => ({
      header: () => <CustomHeader title="Ngôn ngữ" navigation={navigation} />,
    }),
  },
  {
    name: 'WalletAll',
    component: WalletAllScreen,
    options: ({navigation}) => ({
      header: () => <CustomHeader title="Thị trường" navigation={navigation} />,
    }),
  },
  {
    name: 'Chatbot',
    component: ChatbotScreen,
    options: {
      title: 'Chat bot',
      headerShown: false,
      animation: 'slide_from_bottom',
    },
  },
];

export default routerNoBottomTab;
