import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DownIcon} from '../../../assets/icons/Icons';
import {scale} from '../../../utils/scaling';

const Header = () => {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>Statistical</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <View style={[styles.dot, {backgroundColor: '#347AE2'}]} />
          <Text style={styles.buttonText}>Offline orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <View style={[styles.dot, {backgroundColor: '#FF9500'}]} />
          <Text style={styles.buttonText}>Online orders</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.dropdown}>
        <Text style={styles.dropdownText}>Monthly</Text>
        <DownIcon />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(20),
  },
  title: {
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
