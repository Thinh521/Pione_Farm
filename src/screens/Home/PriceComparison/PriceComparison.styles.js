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
  selecteButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderColor: '#b0ffce',
    borderWidth: 1,
    borderRadius: scale(24),
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
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
    textAlign: 'center',
    position: 'absolute',
    top: -scale(10),
    padding: scale(45),
  },
  footerContentTitle: {
    color: '#1500FF',
    textAlign: 'center',
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
  },
  footerContentTitle_2: {
    color: '#1500FF',
    textAlign: 'center',
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
  },
  footerContentDescription: {
    fontSize: FontSizes.xsmall,
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
    top: -scale(10),
    right: scale(20),
    width: SCREEN_WIDTH - scale(60),
    height: scale(166),
    alignSelf: 'center',
    marginBottom: scale(50),
  },
  backgroundPriceComparison_5: {
    position: 'absolute',
    top: -scale(30),
    left: scale(20),
    width: scale(48.78157424926758),
    height: scale(57.28705596923828),
    alignSelf: 'center',
    marginBottom: scale(50),
  },
  noResultText: {
    textAlign: 'center',
    marginTop: scale(10),
    color: Colors.gray,
    fontSize: scale(14),
    fontStyle: 'italic',
  },
});
