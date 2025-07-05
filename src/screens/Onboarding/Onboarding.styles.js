import {Dimensions, StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';
import {scale} from '../../utils/scaling';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = width;

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: scale(80),
    backgroundColor: Colors.white,
  },
  slide: {
    flex: 1,
    width: ITEM_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    textAlign: 'center',
    marginBottom: scale(10),
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.extraBold,
  },
  titleGradient: {
    lineHeight: 26,
    textAlign: 'center',
    fontFamily: 'Sonsie One',
    fontSize: FontSizes.huge,
    fontWeight: FontWeights.extraBold,
  },
  content: {
    flex: 1,
    width: ITEM_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  image: {
    width: '60%',
    height: 300,
    marginBottom: scale(10),
  },
  description: {
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    textAlign: 'left',
    paddingHorizontal: scale(30),
    lineHeight: scale(24),
  },
  fixedFooter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButton: {
    width: 205,
    backgroundColor: '#F55B07',
    borderRadius: 9999,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
