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
  infoGrid: {
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#2e7d32',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  infoDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginTop: 8,
  },
  seasonText: {
    fontSize: 14,
    color: '#4caf50',
    fontStyle: 'italic',
    marginTop: 8,
    textAlign: 'center',
  },
  advantageText: {
    fontSize: 14,
    color: '#4caf50',
    fontWeight: '500',
    marginTop: 8,
  },
  cropHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cropName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  cropStats: {
    alignItems: 'flex-end',
  },
  cropArea: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  cropYield: {
    fontSize: 12,
    color: '#4caf50',
    fontWeight: '600',
  },
  cropDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 12,
  },
  cropDetails: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  detailRow: {
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4caf50',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
