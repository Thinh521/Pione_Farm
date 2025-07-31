import {StyleSheet} from 'react-native';
import {Colors} from '~/theme/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8FEFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 157.59,
    height: 132,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.white,
  },
});
