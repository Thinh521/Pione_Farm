import {StyleSheet} from 'react-native';
import {scale} from '../../utils/scaling';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: scale(16),
    paddingVertical: scale(30),
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: scale(30),
  },
  title: {
    fontSize: FontSizes.xxlarge,
    fontWeight: FontWeights.semiBold,
    textAlign: 'center',
    marginBottom: scale(8),
  },
  subtitle: {
    color: Colors.grayText,
    fontSize: FontSizes.small,
    textAlign: 'center',
    lineHeight: scale(18),
    paddingHorizontal: scale(20),
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  inputGroup: {
    marginBottom: scale(20),
  },
  inputError: {
    borderColor: Colors.red,
  },
  errorText: {
    color: Colors.red,
    fontWeight: FontWeights.medium,
    marginTop: scale(6),
    marginLeft: scale(4),
    fontSize: scale(12),
  },
  passwordStrengthContainer: {
    marginTop: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  strengthBar: {
    flex: 1,
    height: scale(4),
    backgroundColor: '#E0E0E0',
    borderRadius: scale(2),
    marginRight: scale(10),
    overflow: 'hidden',
  },
  strengthFill: {
    height: '100%',
    borderRadius: scale(2),
    transition: 'width 0.3s ease',
  },
  strengthText: {
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
    minWidth: scale(70),
  },
  requirementsContainer: {
    backgroundColor: '#F1F8E9',
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: scale(24),
    borderLeftWidth: scale(4),
    borderLeftColor: '#4CAF50',
  },
  requirementsTitle: {
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
    color: Colors.greenText,
    marginBottom: scale(8),
  },
  requirementsList: {
    marginLeft: scale(8),
  },
  requirementItem: {
    fontSize: FontSizes.small,
    color: '#558B2F',
    lineHeight: scale(18),
    marginBottom: scale(2),
  },
  changePasswordButton: {
    backgroundColor: Colors.green,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
