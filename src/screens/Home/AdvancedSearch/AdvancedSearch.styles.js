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
    borderColor: '#b0ffce',
  },
  bodyWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  contentContainer: {
    marginTop: scale(20),
  },
  title: {
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(16),
  },
  buttonContainer: {
    gap: scale(20),
    marginBottom: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
