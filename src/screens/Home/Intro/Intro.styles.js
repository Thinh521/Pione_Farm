import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: scale(20),
    borderBottomWidth: 1,
    borderColor: Colors.border_2,
    paddingInline: scale(16),
  },
  headerContent: {
    alignItems: 'flex-start',
    marginBlock: scale(20),
  },
  headerTitle: {
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(4),
  },
  headerSubtitle: {
    fontSize: FontSizes.small,
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
