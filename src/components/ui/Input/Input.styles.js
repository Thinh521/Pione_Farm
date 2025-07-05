import {StyleSheet} from 'react-native';
import {Colors} from '../../../theme/theme';
import {scale} from '../../../utils/scaling';

export default StyleSheet.create({
  label: {
    fontSize: 14,
    color: '#000',
    marginBottom: scale(8),
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.white,
    width: '100%',
    height: 55,
  },

  readonlyField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
    justifyContent: 'flex-start',
  },

  readonlyText: {
    fontSize: 16,
    color: '#000',
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 0,
    height: '100%',
  },

  disabledContainer: {
    backgroundColor: '#e0e0e0',
    borderColor: '#d0d0d0',
    opacity: 0.6,
  },

  leftIcon: {
    marginRight: 8,
  },

  rightContent: {
    marginLeft: 8,
  },

  eyeIcon: {
    width: 24,
    height: 24,
  },

  rightIcon: {
    width: 24,
    height: 24,
  },
});
