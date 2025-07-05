import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '../../../theme/theme';
import {scale} from '../../../utils/scaling';

export default StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingVertical: scale(32),
    paddingHorizontal: scale(16),
    backgroundColor: Colors.white,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: scale(32),
    marginTop: scale(8),
  },
  logoContainer: {
    marginBottom: scale(16),
  },
  logo: {
    width: scale(100),
    height: scale(100),
  },
  title: {
    fontSize: FontSizes.huge,
    fontWeight: '600',
    marginBottom: scale(8),
    textAlign: 'center',
    color: '#059669',
  },
  subtitle: {
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: scale(20),
    fontSize: FontSizes.medium,
    paddingHorizontal: scale(20),
  },
  inputContainer: {
    marginBottom: scale(16),
  },
  inputError: {
    borderColor: Colors.red,
    borderWidth: 1,
  },
  errorText: {
    color: Colors.red,
    marginTop: scale(6),
    marginLeft: scale(4),
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.regular,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(10),
  },
  loginText: {
    fontSize: scale(14),
    color: '#6b7280',
    fontWeight: '400',
  },
  loginbuttonText: {
    fontSize: scale(14),
    fontWeight: '600',
    color: '#059669',
    marginLeft: scale(4),
  },
  farmInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: scale(24),
    paddingTop: scale(20),
    borderTopWidth: 1,
    borderTopColor: 'rgba(34, 197, 94, 0.2)',
  },
  farmInfoItem: {
    alignItems: 'center',
  },
  farmInfoIcon: {
    fontSize: scale(18),
    marginBottom: scale(4),
  },
  farmInfoText: {
    fontSize: scale(11),
    color: '#059669',
    fontWeight: '600',
  },
});
