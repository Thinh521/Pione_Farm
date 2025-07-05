import {Dimensions, StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '../../../theme/theme';
import {scale} from '../../../utils/scaling';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: scale(20),
    borderBottomWidth: 1,
    borderColor: '#b0ffce',
    paddingHorizontal: scale(16),
  },
  bodyWrapper: {
    flex: 1,
    paddingHorizontal: scale(16),
    justifyContent: 'space-between',
  },
  contentContainer: {
    marginTop: scale(20),
  },
  title: {
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(16),
  },
  buttonContainer: {
    gap: scale(20),
    marginBottom: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonExcel: {
    backgroundColor: Colors.green,
    marginBottom: scale(30),
  },
  footer: {
    alignItems: 'center',
    marginTop: scale(16),
  },
  footerContent: {
    position: 'absolute',
    top: -scale(10),
    padding: scale(45),
  },
  footerContentTitle: {
    color: '#1500FF',
    textAlign: 'center',
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
  },
  footerContentTitle_2: {
    color: '#1500FF',
    textAlign: 'center',
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
  },
  footerContentDescription: {
    fontSize: FontSizes.small,
    textAlign: 'justify',
  },
  backgroundPriceComparison_1: {
    position: 'relative',
    width: SCREEN_WIDTH,
    height: scale(166),
    alignSelf: 'center',
    marginBottom: scale(50),
  },
  trendWrapper: {
    position: 'absolute',
    bottom: 0,
    width: SCREEN_WIDTH,
    height: scale(207.83514404296875),
    alignItems: 'center',
  },
  backgroundPriceComparison_2: {
    position: 'relative',
    width: SCREEN_WIDTH,
    height: scale(207.83514404296875),
    alignSelf: 'center',
  },
  backgroundPriceComparison_3: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: scale(166),
    alignSelf: 'center',
    marginBottom: scale(50),
  },
  backgroundPriceComparison_4: {
    position: 'absolute',
    top: -10,
    right: 20,
    width: SCREEN_WIDTH - 60,
    height: scale(166),
    alignSelf: 'center',
    marginBottom: scale(50),
  },
  backgroundPriceComparison_5: {
    position: 'absolute',
    top: -30,
    left: 20,
    width: scale(48.78157424926758),
    height: scale(57.28705596923828),
    alignSelf: 'center',
    marginBottom: scale(50),
  },
  ai: {
    position: 'absolute',
    top: 2000,
    left: 0,
    zIndex: 10,
    width: scale(1000),
    height: scale(1000),
    alignSelf: 'center',
  },
  noResultText: {
    textAlign: 'center',
    marginTop: scale(10),
    color: Colors.gray,
    fontSize: scale(14),
    fontStyle: 'italic',
  },
});
