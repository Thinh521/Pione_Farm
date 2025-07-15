import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '../../../theme/theme';
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
  main: {
    marginTop: scale(20),
  },
  title: {
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(4),
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: scale(10),
    borderBottomColor: '#f3f4f6',
    borderBottomWidth: 1,
  },
  nameCol: {
    flex: 6,
  },
  unitCol: {
    flex: 3,
    alignItems: 'center',
  },
  priceCol: {
    flex: 3,
    alignItems: 'flex-end',
  },
  itemName: {
    color: Colors.title,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
  },
  unit: {
    fontSize: FontSizes.xsmall,
    backgroundColor: '#dbeafe',
    color: '#1e3a8a',
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: scale(999),
    overflow: 'hidden',
  },
  price: {
    color: '#059669',
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
  },
  currency: {
    color: '#6b7280',
    fontSize: FontSizes.xsmall,
  },
});
