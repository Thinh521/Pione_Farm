import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';
import {scale} from '../../utils/scaling';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(16),
  },
  sectionTitle: {
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
    color: Colors.title,
    marginBottom: scale(8),
    marginTop: scale(16),
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: scale(8),
    paddingVertical: scale(4),
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    justifyContent: 'space-between',
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  icon: {
    width: scale(24),
    height: scale(24),
    marginRight: 12,
    color: '#7C8DB5',
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: FontSizes.medium,
    fontWeight: '500',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: FontSizes.small,
    color: '#7C8DB5',
  },
  rightIcon: {
    width: scale(14),
    height: scale(14),
    color: '#BDBDBD',
  },
});
