import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, FontSizes, FontWeights, Shadows} from '~/theme/theme';
import {scale} from '~/utils/scaling';
import {RightIcon} from '~/assets/icons/Icons';

const AccountSupportSettings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Cài đặt tài khoản</Text>

      <TouchableOpacity style={styles.item}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemText}>Hướng dẫn sử dụng</Text>
        </View>
        <RightIcon style={styles.rightIcon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemText}>Câu hỏi thường gặp (FAQ)</Text>
        </View>
        <RightIcon style={styles.rightIcon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemText}>Liên hệ hỗ trợ / Góp ý</Text>
        </View>
        <RightIcon style={styles.rightIcon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemText}>Phiên bản: 1.0.1</Text>
        </View>
        <RightIcon style={styles.rightIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default AccountSupportSettings;

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
  },
  rightIcon: {
    width: scale(10),
    height: scale(10),
  },
});
