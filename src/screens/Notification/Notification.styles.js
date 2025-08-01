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
  headerTitle: {
    marginVertical: scale(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.title,
    fontSize: FontSizes.semiLarge,
    fontWeight: FontWeights.semiBold,
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
  resetButton: {
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    backgroundColor: Colors.green,
    borderRadius: scale(10),
  },
  resetText: {
    color: Colors.white,
    fontSize: FontSizes.xsmall,
    fontWeight: FontWeights.semiBold,
  },
  loadingContainer: {
    gap: scale(10),
    marginTop: scale(220),
    flexDirection: 'column',
    alignItems: 'center',
  },
  errorWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 160,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 160,
  },
  emptyImage: {
    width: scale(100),
    height: scale(100),
    marginLeft: scale(20),
    marginBottom: scale(16),
  },
  emptyText: {
    lineHeight: 22,
    textAlign: 'center',
    color: Colors.grayText_2,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
  },
});
