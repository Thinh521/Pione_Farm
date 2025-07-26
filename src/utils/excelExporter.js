import {Alert, Platform} from 'react-native';
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import {requestStoragePermission} from './permissionHelper';

export const exportToExcel = async (
  data,
  fileNamePrefix = 'export',
  sheetName = 'Kết quả',
) => {
  if (!data || data.length === 0) {
    Alert.alert('Thông báo', 'Không có dữ liệu để xuất!');
    return null;
  }

  try {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});

    const fileName = `${fileNamePrefix}_${Date.now()}.xlsx`;
    let path;

    const hasPermission = await requestStoragePermission();
    if (!hasPermission) return null;

    if (Platform.OS === 'android') {
      path = `${RNFS.DownloadDirectoryPath}/${fileName}`;
    } else {
      path = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    }

    await RNFS.writeFile(path, wbout, 'ascii');
    Alert.alert('Thành công', `File đã lưu tại:\n${path}`);
    return path;
  } catch (err) {
    console.log('Lỗi xuất file Excel:', err);
    Alert.alert('Lỗi', 'Không thể xuất file');
    return null;
  }
};
