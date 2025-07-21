import {StyleSheet, Dimensions} from 'react-native';
import {scale} from '~/utils/scaling';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: Colors.white,
    fontSize: scale(16),
    fontWeight: '600',
    marginTop: scale(15),
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
  },
  errorGradient: {
    paddingHorizontal: scale(40),
    paddingVertical: scale(30),
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: '600',
    marginTop: scale(15),
    marginBottom: scale(20),
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    borderRadius: scale(25),
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: scale(14),
  },
  scrollView: {
    flex: 1,
  },
  contentCard: {
    paddingHorizontal: scale(20),
    paddingTop: scale(25),
    paddingBottom: scale(30),
  },
  categoryContainer: {
    alignSelf: 'flex-start',
    marginBottom: scale(15),
  },
  image: {
    width: '100%',
    height: scale(240),
  },
  title: {
    color: Colors.title,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
    marginBlock: scale(8),
    textAlign: 'left',
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(20),
    flexWrap: 'wrap',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: scale(15),
    marginBottom: scale(8),
  },
  dateIcon: {
    width: scale(16),
    height: scale(16),
    color: '#66BB6A',
  },
  date: {
    fontSize: scale(12),
    color: '#2E7D32',
    fontWeight: '500',
    marginLeft: scale(4),
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E5F5',
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: scale(15),
    marginBottom: scale(8),
  },
  source: {
    fontSize: scale(12),
    color: '#4A148C',
    fontWeight: '500',
    marginLeft: scale(4),
  },
  summaryCard: {
    padding: scale(16),
    borderRadius: scale(16),
    marginBottom: scale(20),
    borderWidth: 1,
    borderColor: Colors.border,
  },
  summaryTitle: {
    color: Colors.title,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(6),
  },
  summary: {
    color: Colors.grayText,
    fontSize: FontSizes.small,
    lineHeight: scale(20),
  },
  contentContainer: {
    marginBottom: scale(20),
  },
  contentTitle: {
    color: Colors.title,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(6),
  },
  content: {
    color: Colors.grayText,
    fontSize: FontSizes.small,
    lineHeight: scale(20),
    textAlign: 'justify',
  },
  highlightsCard: {
    padding: scale(16),
    borderRadius: scale(16),
    marginBottom: scale(25),
    borderWidth: 1,
    borderColor: Colors.border,
  },
  highlightsTitle: {
    color: Colors.title,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(6),
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: scale(10),
    paddingLeft: scale(4),
  },
  highlightText: {
    fontSize: FontSizes.xsmall,
    lineHeight: scale(20),
    color: '#424242',
    flex: 1,
    fontWeight: '500',
  },

  // Action Buttons
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(10),
  },
  actionButton: {
    flex: 1,
    marginHorizontal: scale(6),
  },
  actionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(14),
    borderRadius: scale(12),
    elevation: 4,
    shadowColor: '#4CAF50',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: scale(14),
    fontWeight: '600',
    marginLeft: scale(6),
  },
});
