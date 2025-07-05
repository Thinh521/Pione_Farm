import {StyleSheet} from 'react-native';
import {Colors} from '~/theme/theme';
import {scale} from '../../../utils/scaling';
import {FontSizes} from '../../../theme/theme';

export default StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: scale(20),
  },
  container: {
    flex: 1,
    paddingHorizontal: scale(16),
    justifyContent: 'center',
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
    marginBottom: scale(20),
  },
  inputError: {
    borderColor: Colors.red,
  },
  errorText: {
    color: Colors.red,
    marginTop: scale(6),
    marginLeft: scale(4),
    fontSize: scale(12),
    fontWeight: '500',
  },
  forgotPasswordButton: {
    marginBottom: scale(16),
    alignSelf: 'flex-end',
    paddingVertical: scale(8),
    paddingHorizontal: scale(12),
    borderRadius: scale(8),
  },
  forgotPasswordText: {
    textAlign: 'right',
    color: '#059669',
    fontWeight: '600',
    fontSize: scale(14),
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(12),
  },
  registerText: {
    fontSize: scale(14),
    color: '#6b7280',
    fontWeight: '400',
  },
  registerButtonText: {
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
