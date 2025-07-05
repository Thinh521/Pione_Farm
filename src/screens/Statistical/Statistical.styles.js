import {StyleSheet} from 'react-native';
import {scale} from '../../utils/scaling';
import {Colors} from '../../theme/theme';

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
  main: {
    marginTop: scale(20),
  },
  title: {
    marginVertical: scale(16),
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
  },
  headerBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(16),
  },
  headerBottomTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginRight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  buttonText: {
    fontSize: 10,
    color: '#4B5563',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  dropdownText: {
    fontSize: 12,
    color: '#4B5563',
  },
});
