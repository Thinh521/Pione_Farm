import {StyleSheet} from 'react-native';
import {scale} from '~/utils/scaling';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
  },
  skeletonContent: {
    position: 'absolute',
    top: scale(20),
    left: scale(20),
    right: scale(20),
  },
  skeletonCategory: {
    width: scale(150),
    height: scale(24),
    borderRadius: scale(12),
    marginBottom: scale(20),
  },
  skeletonImage: {
    width: '100%',
    height: scale(200),
    borderRadius: scale(16),
    marginBottom: scale(20),
  },
  skeletonTitle: {
    width: '100%',
    height: scale(20),
    borderRadius: scale(10),
    marginBottom: scale(8),
  },
  skeletonTitleSecond: {
    width: '80%',
    height: scale(20),
    borderRadius: scale(10),
    marginBottom: scale(20),
  },
  skeletonMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(20),
  },
  skeletonMetaItem: {
    width: scale(120),
    height: scale(24),
    borderRadius: scale(12),
  },
  skeletonSummary: {
    width: '100%',
    height: scale(80),
    borderRadius: scale(12),
    marginBottom: scale(16),
  },
  skeletonContent1: {
    width: '100%',
    height: scale(16),
    borderRadius: scale(8),
    marginBottom: scale(8),
  },
  skeletonContent2: {
    width: '90%',
    height: scale(16),
    borderRadius: scale(8),
    marginBottom: scale(8),
  },
  skeletonContent3: {
    width: '70%',
    height: scale(16),
    borderRadius: scale(8),
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: Colors.title,
    fontSize: FontSizes.semiLarge,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(16),
    textAlign: 'center',
  },
  backButton: {
    width: '34%',
    borderRadius: scale(999),
    backgroundColor: Colors.green,
  },
  backButtonText: {
    color: Colors.white,
    fontWeight: FontWeights.semiBold,
    fontSize: scale(14),
  },
  scrollView: {
    flex: 1,
  },
  contentCard: {
    padding: scale(16),
    marginTop: scale(4),
  },
  imageContainer: {
    position: 'relative',
    marginBottom: scale(16),
    borderRadius: scale(16),
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: scale(220),
  },
  title: {
    color: Colors.title,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.bold,
    lineHeight: scale(22),
    marginBottom: scale(16),
    letterSpacing: -0.5,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(16),
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(14),
    paddingVertical: scale(8),
    borderRadius: scale(20),
  },
  metaText: {
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
  },
  summaryCard: {
    padding: scale(16),
    borderRadius: scale(10),
    marginBottom: scale(20),
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  summaryTitle: {
    color: Colors.title,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.bold,
    marginBottom: scale(6),
  },
  summary: {
    color: Colors.grayText_2,
    fontSize: FontSizes.small,
    lineHeight: scale(20),
    textAlign: 'justify',
  },
  contentContainer: {
    marginBottom: scale(20),
  },
  contentTitle: {
    color: Colors.title,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.bold,
    marginBottom: scale(8),
  },
  content: {
    color: Colors.grayText_2,
    fontSize: FontSizes.small,
    lineHeight: scale(20),
    textAlign: 'justify',
  },
  highlightsCard: {
    padding: scale(16),
    borderRadius: scale(10),
    marginBottom: scale(20),
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  highlightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: scale(8),
    paddingLeft: scale(4),
  },
  highlightDot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    marginTop: scale(8),
    marginRight: scale(12),
  },
  highlightText: {
    flex: 1,
    fontSize: FontSizes.small,
    lineHeight: scale(20),
    color: '#2d3748',
    fontWeight: FontWeights.medium,
  },
  actionContainer: {
    gap: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(20),
  },
  actionButton: {
    flex: 1,
    backgroundColor: Colors.green,
  },
});
