import {StyleSheet} from 'react-native';
import {scale} from '../../utils/scaling';
import {Colors} from '../../theme/theme';

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
  headerContainer: {
    paddingVertical: scale(12),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#166534',
    letterSpacing: 0.5,
  },
  itemContainer: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginBottom: scale(10),
    padding: scale(16),
    borderWidth: 1,
    borderColor: Colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  dot: {
    marginRight: scale(8),
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    color: '#059669',
    fontWeight: '600',
    flex: 1,
  },
  badge: {
    fontSize: 12,
    color: '#ffffff',
    backgroundColor: '#f59e0b',
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: 12,
    fontWeight: '600',
    overflow: 'hidden',
  },
  admin: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7c3aed',
    marginBottom: scale(8),
    backgroundColor: '#f3f4f6',
    paddingHorizontal: scale(8),
    paddingVertical: scale(2),
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  desc: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});
