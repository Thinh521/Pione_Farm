import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';
import {scale} from '../../utils/scaling';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: scale(20),
    marginBottom: scale(16),
  },
  zoneName: {
    fontSize: FontSizes.large,
    fontWeight: FontWeights.semiBold,
    textAlign: 'center',
    marginBottom: scale(8),
  },
  location: {
    fontSize: FontSizes.small,
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: scale(40),
  },
  statsContainer: {
    gap: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: Colors.border,
    minWidth: 120,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  buttonMap: {
    marginHorizontal: scale(16),
    marginBottom: scale(16),
    backgroundColor: Colors.white,
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: Colors.border_3,
  },
  buttonMapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(16),
  },
  iconContainer: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  mapIcon: {
    width: scale(25),
    height: scale(25),
  },
  textContainer: {
    flex: 1,
  },
  buttonTitle: {
    color: Colors.title,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(2),
  },
  buttonSubtitle: {
    color: Colors.grayText_4,
    fontSize: FontSizes.small,
  },
  buttonFooter: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    borderBottomLeftRadius: scale(12),
    borderBottomRightRadius: scale(12),
  },
  buttonAction: {
    fontSize: FontSizes.small,
    color: Colors.greenText,
    fontWeight: FontWeights.medium,
    textAlign: 'center',
  },
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: scale(16),
    marginBottom: scale(16),
    borderRadius: scale(10),
    padding: scale(20),
    borderWidth: 1,
    borderColor: Colors.border_3,
  },
  sectionTitle: {
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(10),
    marginHorizontal: scale(16),
  },
  highlightDot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    marginRight: scale(8),
    backgroundColor: Colors.green,
  },
  listItem: {
    fontSize: FontSizes.small,
    color: Colors.grayText_2,
    lineHeight: scale(20),
  },
  horizontalScroll: {
    paddingRight: 16,
  },
});
