import {StyleSheet} from 'react-native';
import {scale} from '../../utils/scaling';

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
  title: {
    marginVertical: scale(16),
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
  },
});
