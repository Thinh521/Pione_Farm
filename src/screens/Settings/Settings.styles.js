import {StyleSheet} from 'react-native';
import {scale} from '../../utils/scaling';
import {Colors, FontSizes, FontWeights, Shadows} from '../../theme/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: scale(16),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(12),
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 4,
    ...Shadows.light,
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: FontSizes.small,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: scale(12),
    marginTop: scale(24),
    paddingHorizontal: scale(16),
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    backgroundColor: '#D32F2F',
  },
  buttonText: {
    color: '#fff',
  },
  skeletonContainer: {
    flex: 1,
    paddingHorizontal: scale(16),
    paddingTop: scale(16),
    backgroundColor: Colors.background,
  },
  skeletonHeader: {
    alignItems: 'center',
    marginBottom: scale(20),
  },
  skeletonAvatar: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    marginBottom: scale(10),
  },
  skeletonText: {
    height: scale(20),
    borderRadius: 4,
    marginVertical: scale(5),
  },
  skeletonSection: {
    marginBottom: scale(20),
    padding: scale(16),
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  skeletonButtonContainer: {
    paddingHorizontal: scale(16),
    paddingVertical: scale(20),
    alignItems: 'center',
  },
  skeletonButton: {
    width: '100%',
    height: scale(48),
    borderRadius: 10,
    marginBottom: scale(10),
  },
});
