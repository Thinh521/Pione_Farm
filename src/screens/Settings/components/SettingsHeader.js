import React, {useState} from 'react';
import {API_BASE_URL} from '@env';
import {View, Text, StyleSheet, TouchableOpacity, Switch} from 'react-native';
import FastImage from 'react-native-fast-image';
import {CameraIcon} from '../../../assets/icons/Icons';
import {Colors, FontSizes, FontWeights} from '../../../theme/theme';
import {scale} from '../../../utils/scaling';
import Images from '../../../assets/images/Images';
import {launchImageLibrary} from 'react-native-image-picker';

const SettingsHeader = ({user}) => {
  const [enabled, setEnabled] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const toggleSwitch = () => setEnabled(!enabled);

  const handlePickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      const selectedImage = result?.assets?.[0];

      if (selectedImage?.uri) {
        setAvatar(selectedImage);
        const formData = new FormData();
        formData.append('avatar', {
          uri:
            Platform.OS === 'ios'
              ? selectedImage.uri.replace('file://', '')
              : selectedImage.uri,
          name: selectedImage.fileName || 'avatar.jpg',
          type: selectedImage.type,
        });

        const res = await updateUser(formData);

        if (!res?.success) {
          Alert.alert('Lỗi', res.message || 'Cập nhật ảnh đại diện thất bại');
        }
      }
    } catch (error) {
      Alert.alert('Lỗi', error.message || 'Không thể chọn ảnh');
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerSection}>
        <View style={styles.avatarContainer}>
          <FastImage
            source={
              avatar?.uri
                ? {uri: avatar.uri}
                : user?.avatar
                ? {uri: `${API_BASE_URL}/api/upload/${user.avatar}`}
                : Images.avatar
            }
            style={styles.avatar}
          />
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={handlePickImage}>
            <CameraIcon style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.userName}>{user?.fullName || 'No name'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'No email'}</Text>
        </View>
      </View>

      <View style={styles.notificationRow}>
        <Text style={styles.notificationText}>📍 Thông báo</Text>
        <Switch
          trackColor={{false: '#d1d5db', true: '#34d399'}}
          thumbColor={enabled ? '#10b981' : '#f4f3f4'}
          ios_backgroundColor="#d1d5db"
          onValueChange={toggleSwitch}
          value={enabled}
        />
      </View>
    </View>
  );
};

export default SettingsHeader;

const styles = StyleSheet.create({
  header: {
    paddingVertical: scale(16),
    paddingHorizontal: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: scale(10),
    paddingBottom: scale(16),
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: scale(80),
    height: scale(80),
    borderRadius: 9999,
    borderWidth: 4,
    borderColor: Colors.white,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.green,
    borderRadius: 9999,
    paddingHorizontal: scale(4),
    paddingVertical: scale(6),
  },
  cameraIcon: {
    color: Colors.white,
  },
  headerInfo: {
    flex: 1,
    marginLeft: scale(16),
  },
  userName: {
    fontSize: FontSizes.semiLarge,
    fontWeight: FontWeights.semiBold,
  },
  userEmail: {
    marginTop: scale(4),
    fontSize: FontSizes.medium,
  },
  notificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: FontSizes.medium,
  },
});
