import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {scale} from '~/utils/scaling';
import {DownIcon} from '~/assets/icons/Icons';
import {Colors, FontSizes, FontWeights, Shadows} from '~/theme/theme';

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
    borderColor: Colors.border_3,
    borderWidth: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    borderRadius: scale(10),
    marginVertical: scale(8),
    ...Shadows.medium,
  },
  sectionTitle: {
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
    color: Colors.title,
    marginBottom: scale(8),
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(10),
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: FontSizes.small,
    flexShrink: 1,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.headerBack,
    borderRadius: 999,
    paddingVertical: scale(4),
    paddingHorizontal: scale(12),
  },
  dropdownText: {
    fontSize: FontSizes.small,
    marginRight: 4,
  },
  dropdownIcon: {
    color: Colors.headerBack,
  },
});
