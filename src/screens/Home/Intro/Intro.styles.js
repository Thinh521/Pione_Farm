import {StyleSheet} from 'react-native';
import {Colors, FontSizes} from '../../../theme/theme';
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
  headerContent: {
    alignItems: 'flex-start',
    marginBottom: scale(20),
  },
  headerTitle: {
    fontSize: FontSizes.semiLarge,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: scale(4),
  },
  headerSubtitle: {
    fontSize: FontSizes.medium,
    textAlign: 'left',
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
    fontWeight: 'bold',
    fontSize: scale(14),
    marginBottom: scale(4),
    color: '#000',
  },
  description: {
    fontSize: scale(12),
    color: '#555',
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(10),
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(6),
  },
  metaIconText: {
    fontSize: scale(10),
  },
  metaText: {
    fontSize: scale(11),
    color: '#6c757d',
    fontWeight: '500',
  },
});
