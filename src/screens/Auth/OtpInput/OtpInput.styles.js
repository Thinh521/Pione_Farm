import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: scale(60),
    paddingHorizontal: scale(20),
  },
  header: {
    alignItems: 'center',
    marginBottom: scale(40),
  },
  title: {
    color: Colors.title,
    fontSize: FontSizes.xxlarge,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(8),
  },
  subtitle: {
    color: Colors.grayText,
    fontSize: FontSizes.small,
    textAlign: 'center',
    lineHeight: scale(18),
  },
  phoneNumber: {
    color: Colors.secondary,
    fontWeight: FontWeights.semiBold,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(40),
    paddingHorizontal: scale(10),
  },
  otpInput: {
    width: scale(50),
    height: scale(60),
    borderWidth: scale(2),
    borderColor: '#e1e8ed',
    borderRadius: scale(12),
    textAlign: 'center',
    fontSize: FontSizes.xlarge,
    fontWeight: FontWeights.semiBold,
    color: '#2c3e50',
    backgroundColor: Colors.white,
  },
  otpInputFilled: {
    borderColor: Colors.greenText,
    backgroundColor: '#f8fff9',
  },
  otpInputFocused: {
    borderColor: '#3498db',
    borderWidth: 2,
  },
  verifyButton: {
    marginBottom: scale(20),
  },
  verifyButtonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: {
    color: Colors.grayText,
    fontSize: FontSizes.small,
  },
  resendButton: {
    marginLeft: scale(5),
  },
  buttontext: {
    fontSize: FontSizes.small,
  },
});
