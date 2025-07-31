import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

const API_URL = 'https://mocki.io/v1/3ae45171-23d1-41fc-8c55-4eeb3cbf6a8a';

const FruitListScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFruits = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Lỗi HTTP: ${response.status}`);
      }

      const json = await response.json();

      if (!Array.isArray(json)) {
        throw new Error('Dữ liệu trả về không phải là mảng');
      }

      setData(json);
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      Alert.alert('Lỗi', 'Không thể tải dữ liệu nông sản.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFruits();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.ten}</Text>
      <Text>
        Giá: {Number(item.gia).toLocaleString()} đ/{item.don_vi}
      </Text>
      <Text>Xuất xứ: {item.xuat_xu}</Text>
      <Text>Cập nhật: {item.ngay_cap_nhat}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách nông sản Việt Nam</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#00b94a" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.id?.toString() ?? Math.random().toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={{textAlign: 'center', marginTop: 20}}>
              Không có dữ liệu.
            </Text>
          }
        />
      )}
    </View>
  );
};

export default FruitListScreen;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#0b7d2f',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#f7fff9',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
});
