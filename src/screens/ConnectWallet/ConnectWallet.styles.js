import {StyleSheet} from 'react-native';
import {scale} from '~/utils/scaling';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(24),
  },
  logo: {
    width: scale(120),
    height: scale(120),
    marginBottom: scale(20),
  },
  title: {
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    color: Colors.title,
    marginBottom: scale(8),
  },
  subtitle: {
    color: '#6e6e6e',
    fontSize: FontSizes.small,
    textAlign: 'center',
    paddingHorizontal: scale(40),
    marginBottom: scale(20),
    lineHeight: scale(18),
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: scale(24),
  },
});
