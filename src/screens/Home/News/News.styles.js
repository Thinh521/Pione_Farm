import {StyleSheet} from 'react-native';
import {scale} from '~/utils/scaling';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';

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
  sectionTitle: {
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(4),
  },
  headerSubtitle: {
    marginBottom: scale(16),
  },
  visiContainer: {
    alignItems: 'center',
    marginTop: scale(40),
  },
  visiText: {
    textAlign: 'center',
    color: Colors.title,
    fontSize: FontSizes.medium,
  },
});
