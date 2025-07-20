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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(16),
    backgroundColor: Colors.white,
    borderRadius: scale(10),
    padding: scale(10),
    borderColor: Colors.border,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(10),
    marginRight: scale(12),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: Colors.title,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(4),
  },
  description: {
    lineHeight: scale(14),
    fontSize: FontSizes.xsmall,
    color: '#555',
  },
  metaContainer: {
    marginTop: scale(8),
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
