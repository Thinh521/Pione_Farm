import {StyleSheet} from 'react-native';
import {FontSizes, FontWeights} from '~/theme/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#000000',
    fontSize: FontSizes.xlarge,
    fontWeight: FontWeights.semiBold,
  },
  icon: {
    color: '#000',
  },
});
