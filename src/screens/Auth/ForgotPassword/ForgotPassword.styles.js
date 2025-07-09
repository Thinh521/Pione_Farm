import {StyleSheet, Dimensions} from 'react-native';
import {scale} from '../../../utils/scaling';
import {Colors, FontSizes, FontWeights} from '../../../theme/theme';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: scale(20),
  },
  header: {
    alignItems: 'center',
    marginBottom: scale(40),
  },
  title: {
    fontSize: FontSizes.huge,
    fontWeight: FontWeights.bold,
    marginBottom: scale(6),
    textAlign: 'center',
  },
  subtitle: {
    color: Colors.title,
    fontSize: FontSizes.small,
    textAlign: 'center',
    lineHeight: scale(20),
    paddingHorizontal: scale(20),
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: scale(20),
    position: 'relative',
  },
  input: {
    backgroundColor: Colors.white,
  },
  inputError: {
    borderWidth: 1,
    borderColor: Colors.red,
  },
  errorText: {
    color: Colors.red,
    marginTop: scale(6),
    marginLeft: scale(4),
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.regular,
  },
  buttonDisabled: {
    backgroundColor: '#a0a0a0',
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  backButtonText: {
    color: '#e6e9ff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 30,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    width: '100%',
    paddingHorizontal: 10,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    backgroundColor: '#f8f9fa',
  },
  timerContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 16,
    color: '#666666',
  },
  resendText: {
    fontSize: 16,
    color: '#667eea',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
  },
  modalButtonPrimary: {
    backgroundColor: Colors.primary,
  },
  modalButtonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  modalButtonTextSecondary: {
    color: Colors.primary,
    textAlign: 'center',
  },
});
