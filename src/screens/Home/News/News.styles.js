import {StyleSheet} from 'react-native';
import {scale} from '../../../utils/scaling';
import {FontSizes, FontWeights} from '../../../theme/theme';

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
  sectionTitle: {
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(4),
  },
  headerSubtitle: {
    marginBottom: scale(16),
  },
});
