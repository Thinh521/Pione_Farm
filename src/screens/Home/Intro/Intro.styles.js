import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights, Shadows} from '../../../theme/theme';
import {scale} from '../../../utils/scaling';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(16),
  },
  header: {
    marginTop: scale(20),
    borderBottomWidth: 1,
    borderColor: Colors.border_2,
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
  listContainer: {
    marginTop: scale(20),
  },
  card: {
    gap: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(16),
    backgroundColor: Colors.white,
    borderRadius: scale(10),
    padding: scale(10),
    borderColor: Colors.border,
    borderWidth: 1,
    ...Shadows.medium,
  },
  image: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(10),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginBottom: scale(4),
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
  },
  description: {
    marginBottom: scale(6),
    color: Colors.grayText,
    fontSize: FontSizes.small,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIconText: {
    fontSize: FontSizes.xsmall,
  },
  metaText: {
    color: Colors.grayText,
    fontSize: FontSizes.xsmall,
    fontWeight: FontWeights.semiBold,
  },
});
