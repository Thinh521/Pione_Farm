import {StyleSheet, Dimensions} from 'react-native';
import {scale} from '../../utils/scaling';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: scale(20),
  },
  avatarWrapper: {
    position: 'relative',
    alignSelf: 'center',
    marginVertical: scale(16),
  },
  avatar: {
    width: scale(90),
    height: scale(90),
    borderRadius: scale(9999),
    borderWidth: 3,
    borderColor: Colors.white,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.green,
    borderRadius: scale(16),
    padding: scale(6),
    borderWidth: 2,
    borderColor: Colors.white,
  },
  cameraIcon: {
    color: Colors.white,
    width: scale(16),
    height: scale(16),
  },
  formGroup: {
    gap: scale(20),
  },
  input: {
    backgroundColor: Colors.background,
    borderRadius: scale(12),
    borderColor: 'transparent',
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: FontSizes.small,
  },
  gender: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genderContainer: {
    gap: scale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: scale(20),
  },
  genderItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(999),
    borderWidth: scale(2),
    borderColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(8),
  },
  radioSelected: {
    width: scale(12),
    height: scale(12),
    borderRadius: scale(999),
    backgroundColor: Colors.green,
  },
  optionText: {
    fontSize: FontSizes.small,
  },
  yearOfBirth: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yearOfBirthContainer: {
    width: '20%',
    textAlign: 'center',
    alignItems: 'center',
  },
  inputYearOfBirth: {
    height: scale(34),
    marginLeft: scale(20),
  },
  nationality: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nationalityButton: {
    marginLeft: scale(14),
    backgroundColor: Colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(8),
    paddingHorizontal: scale(16),
  },
  nationalityText: {
    fontSize: FontSizes.medium,
  },
  rightIcon: {
    marginLeft: scale(8),
    width: scale(10),
    height: scale(10),
  },
  bottomContainer: {
    padding: scale(16),
    borderTopWidth: 1,
    borderColor: '#b0ffce',
  },
  saveButtonDisabled: {
    backgroundColor: '#A5D6A7',
    borderColor: '#C8E6C9',
    shadowOpacity: 0.1,
    elevation: 2,
  },

  // Bottom Sheet Styles
  bottomSheetOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  bottomSheetBackdrop: {
    flex: 1,
  },
  bottomSheetContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    paddingHorizontal: scale(20),
    paddingTop: scale(20),
    paddingBottom: scale(40),
    height: SCREEN_HEIGHT * 0.45,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -8},
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 20,
  },
  bottomSheetHandle: {
    width: scale(40),
    height: scale(4),
    backgroundColor: '#EAEAEA',
    alignSelf: 'center',
    borderRadius: scale(2),
    marginBottom: scale(20),
  },

  // Password Section Styles
  bottomSheetSection: {
    alignItems: 'center',
    paddingVertical: scale(24),
  },
  bottomSheetHeader: {
    alignItems: 'center',
    marginBottom: scale(30),
  },
  bottomSheetTitle: {
    color: Colors.title,
    textAlign: 'center',
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    marginBottom: scale(4),
  },
  bottomSheetSubtitle: {
    fontSize: FontSizes.small,
    color: Colors.grayText,
    textAlign: 'center',
    lineHeight: scale(20),
  },
  passwordInputContainer: {
    width: '100%',
    marginBottom: scale(24),
  },
  passwordInput: {
    borderRadius: scale(25),
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  passwordSubmitButton: {
    width: '100%',
    backgroundColor: '#4CAF50',
    paddingVertical: scale(14),
    paddingHorizontal: scale(40),
    borderRadius: scale(25),
    shadowColor: '#2E7D32',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  // OTP Section Styles
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(30),
    paddingHorizontal: scale(10),
  },
  otpInputWrapper: {
    position: 'relative',
    marginHorizontal: scale(4),
  },
  otpInput: {
    width: scale(50),
    height: scale(60),
    borderWidth: 2,
    borderRadius: scale(12),
    textAlign: 'center',
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    color: Colors.greenText,
    backgroundColor: Colors.white,
    shadowColor: '#4CAF50',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  // OTP Actions
  otpActions: {
    width: '100%',
    gap: scale(16),
  },
  buttomResendText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendText: {
    fontSize: FontSizes.small,
  },
  resendTextGui: {
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
  },
  verifyButton: {
    paddingVertical: scale(14),
    paddingHorizontal: scale(40),
    borderRadius: scale(25),
    alignItems: 'center',
    shadowColor: '#2E7D32',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  // Legacy input styles (for compatibility)
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(12),
    borderWidth: 2,
    borderColor: '#C8E6C9',
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    shadowColor: '#4CAF50',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  inputLabel: {
    color: '#2E7D32',
    fontSize: scale(14),
    fontWeight: '600',
    marginBottom: scale(8),
  },

  inputText: {
    color: '#1B5E20',
    fontSize: scale(16),
    fontWeight: '500',
  },

  // Decorative elements
  decorativeLeaf: {
    position: 'absolute',
    width: scale(20),
    height: scale(20),
    backgroundColor: '#81C784',
    borderRadius: scale(10),
    transform: [{rotate: '45deg'}],
  },

  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: scale(12),
    opacity: 0.1,
  },

  // Additional animations and effects
  pulseAnimation: {
    backgroundColor: '#4CAF50',
    borderRadius: scale(25),
  },

  shimmerEffect: {
    backgroundColor: '#E8F5E8',
    borderRadius: scale(8),
    overflow: 'hidden',
  },

  // Responsive design helpers
  smallScreen: {
    paddingHorizontal: scale(16),
  },

  largeScreen: {
    paddingHorizontal: scale(32),
  },
});
