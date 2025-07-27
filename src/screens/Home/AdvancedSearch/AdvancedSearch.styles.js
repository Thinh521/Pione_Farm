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
    borderColor: Colors.border_2,
  },
  bodyWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  contentContainer: {
    marginTop: scale(20),
  },
  title: {
    color: Colors.title,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
    marginBlock: scale(16),
  },
  tableTitle: {
    marginBottom: scale(16),
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
  },
  buttonContainer: {
    gap: scale(20),
    marginBottom: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selecteButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderColor: '#b0ffce',
    borderWidth: 1,
    borderRadius: scale(24),
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
  },
  noResultText: {
    textAlign: 'center',
    marginTop: scale(10),
    color: Colors.gray,
    fontSize: scale(14),
    fontStyle: 'italic',
  },
  buttonExcel: {
    backgroundColor: Colors.green,
    marginBottom: scale(40),
  },
});
