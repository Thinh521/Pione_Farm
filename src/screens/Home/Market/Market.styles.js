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
    borderColor: '#b0ffce',
  },
  main: {
    marginTop: scale(20),
  },
  title: {
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(10),
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
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
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '500',
  },
  unit: {
    fontSize: 12,
    backgroundColor: '#dbeafe',
    color: '#1e3a8a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    overflow: 'hidden',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
  },
  currency: {
    fontSize: 10,
    color: '#6b7280',
  },
});
