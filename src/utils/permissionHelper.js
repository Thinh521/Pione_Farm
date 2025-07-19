import {PermissionsAndroid, Platform, Alert} from 'react-native';

export const requestStoragePermission = async () => {
  if (Platform.OS === 'android' && Platform.Version < 33) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Cấp quyền lưu file',
          message: 'Ứng dụng cần quyền để lưu file Excel vào thiết bị.',
          buttonPositive: 'Đồng ý',
          buttonNegative: 'Hủy',
        },
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Thông báo', 'Bạn chưa cấp quyền lưu file!');
        return false;
      }

      return true;
    } catch (err) {
      console.warn('Lỗi xin quyền:', err);
      Alert.alert('Lỗi', 'Không thể xin quyền lưu file!');
      return false;
    }
  }

  return true;
};
