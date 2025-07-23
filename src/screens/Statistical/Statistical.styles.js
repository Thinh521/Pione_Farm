import {StyleSheet} from 'react-native';
import {scale} from '~/utils/scaling';
import {Colors, FontSizes, FontWeights, Shadows} from '~/theme/theme';

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
  main: {
    marginTop: scale(20),
  },
  headerBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scale(10),
    marginBottom: scale(16),
  },
  headerBottomTitle: {
    color: Colors.title,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
  },
  buttonContainer: {
    gap: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: scale(10),
    height: scale(10),
    borderRadius: scale(999),
    marginRight: scale(5),
  },
  buttonText: {
    color: Colors.grayText,
    fontSize: FontSizes.xsmall,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: scale(10),
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border_3,
  },
  headerdropdown: {
    width: scale(75),
    paddingVertical: scale(4),
    paddingHorizontal: scale(10),
  },
  dropdownHeaderText: {
    fontSize: FontSizes.xsmall,
  },
  dropdownProduct: {
    marginBottom: 16,
    paddingVertical: scale(10),
    paddingHorizontal: scale(16),
  },
  dropdownText: {
    color: Colors.title,
    fontSize: FontSizes.small,
  },
  dropdownList: {
    position: 'absolute',
    top: scale(28),
    right: 0,
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: scale(8),
    paddingVertical: scale(4),
    zIndex: 10,
    ...Shadows.dropdown,
  },
  dropdownItem: {
    paddingVertical: scale(8),
    paddingHorizontal: scale(12),
  },
});
