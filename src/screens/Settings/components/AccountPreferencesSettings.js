import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {scale} from '../../../utils/scaling';
import {DownIcon} from '../../../assets/icons/Icons';
import {Colors, Shadows} from '../../../theme/theme';

const AccountPreferencesSettings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Cài đặt tài khoản</Text>

      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemText}>
            Khoảng thời gian hiển thị mặc định
          </Text>
        </View>
        <TouchableOpacity style={styles.dropdownButton}>
          <Text style={styles.dropdownText}>7 Ngày</Text>
          <DownIcon style={styles.dropdownIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemText}>Loại sản phẩm theo dõi chính</Text>
        </View>
        <TouchableOpacity style={styles.dropdownButton}>
          <Text style={styles.dropdownText}>Xoài</Text>
          <DownIcon style={styles.dropdownIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemText}>
            Chọn vùng theo dõi giá / sản lượng
          </Text>
        </View>
        <TouchableOpacity style={styles.dropdownButton}>
          <Text style={styles.dropdownText}>Vĩnh Long</Text>
          <DownIcon style={styles.dropdownIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemText}>Đơn vị hiển thị</Text>
        </View>
        <TouchableOpacity style={styles.dropdownButton}>
          <Text style={styles.dropdownText}>Kg</Text>
          <DownIcon style={styles.dropdownIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountPreferencesSettings;

const styles = StyleSheet.create({
  container: {
    marginTop: scale(20),
    borderColor: '#f5f5f5',
    borderWidth: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 8,
    ...Shadows.medium,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  emoji: {
    fontSize: 16,
    marginRight: 8,
  },
  itemText: {
    fontSize: 15,
    color: '#111',
    flexShrink: 1,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#34d399',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  dropdownText: {
    fontSize: 14,
    color: '#111',
    marginRight: 4,
  },
  dropdownIcon: {
    color: '#34d399',
  },
});
