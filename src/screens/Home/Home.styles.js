import {StyleSheet} from 'react-native';
import {scale} from '../../utils/scaling';
import {FontSizes, FontWeights} from '../../theme/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(16),
  },
  header: {
    marginTop: scale(20),
    borderBottomWidth: 1,
    borderColor: '#b0ffce',
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: scale(20),
    paddingBottom: scale(90),
  },
  title: {
    paddingBottom: scale(20),
    fontSize: FontSizes.xlarge,
    fontWeight: FontWeights.semiBold,
  },
});
