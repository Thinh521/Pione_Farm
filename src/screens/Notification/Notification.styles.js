import {StyleSheet} from 'react-native';
import {scale} from '~/utils/scaling';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';

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
  headerContainer: {
    paddingVertical: scale(12),
  },
  sectionTitle: {
    color: Colors.title,
    fontSize: FontSizes.semiLarge,
    fontWeight: FontWeights.semiBold,
  },
  itemContainer: {
    backgroundColor: Colors.white,
    borderRadius: scale(10),
    marginBottom: scale(10),
    padding: scale(16),
    borderWidth: 1,
    borderColor: Colors.border_3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  dot: {
    width: scale(13),
    height: scale(13),
    borderRadius: scale(999),
    marginRight: scale(8),
    backgroundColor: Colors.white,
    borderWidth: 4,
    borderColor: Colors.green,
  },
  label: {
    fontSize: FontSizes.medium,
    color: Colors.green,
    fontWeight: FontWeights.semiBold,
    flex: 1,
  },
  badge: {
    fontSize: FontSizes.xsmall,
    color: Colors.white,
    backgroundColor: '#f59e0b',
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: scale(999),
    fontWeight: FontWeights.semiBold,
    overflow: 'hidden',
  },
  admin: {
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
    color: '#7c3aed',
    marginBottom: scale(8),
    backgroundColor: Colors.background,
    paddingHorizontal: scale(8),
    paddingVertical: scale(2),
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  desc: {
    fontSize: FontSizes.small,
    color: Colors.grayText,
    lineHeight: scale(18),
  },
});
