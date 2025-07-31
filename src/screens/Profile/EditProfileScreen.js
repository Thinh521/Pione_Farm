import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  Animated,
  Dimensions,
  Platform,
  Vibration,
  RefreshControl,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/core';
import FastImage from 'react-native-fast-image';
import {launchImageLibrary} from 'react-native-image-picker';
import {API_BASE_URL} from '@env';
import {Controller, useForm} from 'react-hook-form';
import styles from './EditProfile.styles';
import Input from '~/components/ui/Input/InputComponents';
import {updateUser} from '~/api/userApi';
import {resendOtp, verifyOtp} from '~/api/verifyOtpApi';
import Background_2 from '~/components/Background/Background_2';
import {CameraIcon, RightIcon} from '~/assets/icons/Icons';
import Button from '~/components/ui/Button/ButtonComponent';
import Images from '~/assets/images/Images';
import {VALIDATION_RULES} from '~/validations/authValidations';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const {user} = useRoute().params || {};

  const [avatar, setAvatar] = useState(null);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [otpCodes, setOtpCodes] = useState(['', '', '', '', '', '']);
  const [otpData, setOtpData] = useState(null);
  const [newVerifiedValue, setNewVerifiedValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentOtpIndex, setCurrentOtpIndex] = useState(0);
  const [cooldown, setCooldown] = useState(0);
  const [resendCount, setResendCount] = useState(0);

  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const otpInputRefs = useRef([]);

  const genderOptions = [
    {label: 'Nam', value: 'male'},
    {label: 'Nữ', value: 'female'},
    {label: 'Khác', value: 'other'},
  ];

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      userName: user?.userName || '',
      yearOfBirth: user?.yearOfBirth?.toString() || '',
      address: user?.address || '',
      gender: user?.gender || '',
      nationality: user?.nationality || 'Vietnam',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    let interval;

    if (cooldown > 0) {
      interval = setInterval(() => {
        setCooldown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [cooldown, bottomSheetVisible]);

  const handlePickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });
      if (!result.didCancel && result.assets?.length > 0) {
        setAvatar(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể chọn ảnh');
    }
  };

  const prepareFormData = data => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      const trimmedValue = value?.toString().trim();
      const originalValue = user?.[key]?.toString() || '';
      if (trimmedValue !== '' && trimmedValue !== originalValue) {
        if (key === 'yearOfBirth') {
          formData.append(key, parseInt(trimmedValue));
        } else {
          formData.append(key, trimmedValue);
        }
      }
    });
    if (avatar?.uri) {
      formData.append('avatar', {
        uri:
          Platform.OS === 'ios'
            ? avatar.uri.replace('file://', '')
            : avatar.uri,
        type: avatar.type,
        name: avatar.fileName || 'avatar.jpg',
      });
    }
    return formData;
  };

  const showBottomSheet = () => {
    setBottomSheetVisible(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 35,
      friction: 8,
    }).start();
  };

  const hideBottomSheet = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setBottomSheetVisible(false);
      setOtpCodes(['', '', '', '', '', '']);
      setCurrentOtpIndex(0);
    });
  };

  const animateOtpInput = index => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleOtpChange = (text, index) => {
    const newOtpCodes = [...otpCodes];
    newOtpCodes[index] = text;
    setOtpCodes(newOtpCodes);

    if (text.length === 1) {
      animateOtpInput(index);
      if (Platform.OS === 'ios') Vibration.vibrate(10);
      if (index < 5) {
        setCurrentOtpIndex(index + 1);
        otpInputRefs.current[index + 1]?.focus();
      }
    } else if (text.length === 0 && index > 0) {
      setCurrentOtpIndex(index - 1);
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (
      e.nativeEvent.key === 'Backspace' &&
      otpCodes[index] === '' &&
      index > 0
    ) {
      setCurrentOtpIndex(index - 1);
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleSave = async data => {
    setIsLoading(true);
    try {
      const formData = prepareFormData(data);
      if (!avatar?.uri && formData._parts?.length === 0) {
        Alert.alert('Thông báo', 'Không có thông tin nào thay đổi');
        setIsLoading(false);
        return;
      }
      const res = await updateUser(formData);
      if (res?.success) {
        const otpInfo = res?.data;
        if (otpInfo?.otp && otpInfo?.userId && otpInfo?.type) {
          setOtpData(otpInfo);
          setNewVerifiedValue({
            type: otpInfo.type,
            value: otpInfo.type.includes('phone') ? data.phone : data.email,
          });
          showBottomSheet();
        } else {
          Alert.alert(
            'Thành công',
            res.message || 'Cập nhật thông tin thành công',
          );
          navigation.goBack();
        }
      } else {
        Alert.alert('Thất bại', res.message || 'Có lỗi xảy ra khi cập nhật');
      }
    } catch (error) {
      const msg = error.message;
      if (msg.includes('Email already exists'))
        Alert.alert('Lỗi', 'Email đã tồn tại');
      else if (msg.includes('Phone already exists'))
        Alert.alert('Lỗi', 'Số điện thoại đã tồn tại');
      else Alert.alert('Thất bại', msg || 'Có lỗi xảy ra');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const otpCode = otpCodes.join('');
    if (!otpCode || otpCode.length !== 6) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ 6 chữ số OTP');
      return;
    }
    if (!otpData?.userId || !otpData?.type) {
      Alert.alert('Lỗi', 'Thiếu thông tin xác thực OTP');
      return;
    }
    setIsLoading(true);
    try {
      const res = await verifyOtp({
        otp: otpCode,
        userId: otpData.userId,
        type: otpData.type,
      });

      if (res?.success) {
        const updatePayload = new FormData();
        const isPhone = otpData.type.includes('phone');
        const field = isPhone ? 'phone' : 'email';
        updatePayload.append(field, newVerifiedValue.value);
        updatePayload.append('verify', 'true');
        await updateUser(updatePayload);

        Alert.alert('Thành công', `${field.toUpperCase()} đã được xác thực`);
        hideBottomSheet();
        setOtpData(null);
        setNewVerifiedValue(null);
        navigation.goBack();
      } else {
        Alert.alert('Thất bại', res.message || 'Xác thực không thành công');
      }
    } catch (error) {
      Alert.alert('Lỗi', error.message || 'Có lỗi khi xác thực');
    } finally {
      setIsLoading(false);
    }
  };

  console.log('OTP DATA:', otpData);

  const handleResendCode = async () => {
    if (!otpData?.userId || !newVerifiedValue?.value || !otpData?.type) {
      showMessage({
        message: 'Thiếu thông tin',
        description: 'Không thể gửi lại mã OTP do thiếu thông tin liên lạc',
        type: 'danger',
        duration: 3000,
        floating: true,
      });
      return;
    }

    if (cooldown > 0) return;

    setIsLoading(true);

    try {
      const res = await resendOtp({
        userId: otpData.userId,
        contact: otpData.type.includes('phone')
          ? newVerifiedValue.value
          : undefined,
        type: otpData.type,
      });
      if (res.success) {
        setResendCount(prev => prev + 1);
        setCooldown(30);
        setOtp(['', '', '', '', '', '']);
        otpInputRefs.current[0]?.focus();

        showMessage({
          message: 'Mã OTP mới đã được gửi',
          description: 'Vui lòng kiểm tra điện thoại hoặc email',
          type: 'success',
          duration: 2500,
          floating: true,
        });
      } else {
        const isExceeded = res.message?.includes(
          'You have exceeded the maximum number',
        );
        if (isExceeded) {
          showMessage({
            message: 'Tài khoản đã bị xóa',
            description: 'Bạn đã gửi lại mã quá 3 lần. Vui lòng đăng ký lại.',
            type: 'danger',
            duration: 4000,
            floating: true,
          });
          navigation.replace('Register');
        } else {
          showMessage({
            message: 'Không thể gửi lại mã',
            description: res.message || 'Vui lòng thử lại sau',
            type: 'danger',
            duration: 3000,
            floating: true,
          });
        }
      }
    } catch (err) {
      if (isExceeded) {
        showMessage({
          message: 'Quá số lần gửi lại',
          description: 'Bạn đã gửi lại mã quá 3 lần',
          type: 'danger',
          duration: 4000,
          floating: true,
        });
        navigation.goBack();
      } else {
        showMessage({
          message: 'Lỗi hệ thống',
          description: err.message || 'Gửi lại OTP thất bại',
          type: 'danger',
          duration: 3000,
          floating: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const closeBottomSheet = () => {
    Alert.alert('Xác nhận', 'Bạn có muốn hủy xác thực?', [
      {text: 'Tiếp tục', style: 'cancel'},
      {
        text: 'Hủy',
        style: 'destructive',
        onPress: () => {
          hideBottomSheet();
          setOtpData(null);
          setNewVerifiedValue(null);
        },
      },
    ]);
  };

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const renderOtpInputs = () => (
    <View style={styles.otpContainer}>
      {otpCodes.map((code, index) => (
        <Animated.View
          key={index}
          style={[
            styles.otpInputWrapper,
            {
              transform: [{scale: currentOtpIndex === index ? scaleAnim : 1}],
            },
          ]}>
          <TextInput
            ref={ref => (otpInputRefs.current[index] = ref)}
            style={[
              styles.otpInput,
              {
                borderColor: code
                  ? '#4CAF50'
                  : currentOtpIndex === index
                  ? '#FF9800'
                  : '#C8E6C9',
              },
            ]}
            value={code}
            onChangeText={text => handleOtpChange(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            keyboardType="numeric"
            maxLength={1}
            selectTextOnFocus
          />
        </Animated.View>
      ))}
    </View>
  );

  const renderOtpSection = () => (
    <View style={styles.bottomSheetSection}>
      <Text style={styles.bottomSheetTitle}>Nhập mã OTP</Text>
      <Text style={styles.bottomSheetSubtitle}>
        {otpData?.type === 'verify-phone'
          ? 'Mã xác thực đã gửi tới số điện thoại mới'
          : 'Mã xác thực đã gửi tới email mới'}
      </Text>

      {renderOtpInputs()}

      <View style={styles.otpActions}>
        {cooldown > 0 ? (
          <Text>Chờ {formatTime(cooldown)} để gửi lại mã</Text>
        ) : resendCount >= 3 ? (
          <Text>Đã quá số lần gửi lại</Text>
        ) : (
          <Button.Text title="Gửi lại" onPress={handleResendCode} />
        )}

        <Button.Main
          title={isLoading ? 'Đang xác thực...' : 'Xác thực OTP'}
          onPress={handleVerifyOtp}
          disabled={isLoading || otpCodes.join('').length !== 6}
        />
      </View>
    </View>
  );

  return (
    <>
      <Background_2 />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.avatarWrapper}>
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
            onPress={handlePickImage}
            accessibilityLabel="Chọn ảnh đại diện">
            <CameraIcon style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.formGroup}>
          {/* Full name */}
          <View>
            <Controller
              control={control}
              name="fullName"
              rules={VALIDATION_RULES.fullName}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <Input
                  label="Họ và tên"
                  placeholder="Nhập họ và tên"
                  value={value}
                  onChangeText={onChange}
                  error={error?.message}
                  containerStyle={[
                    errors.fullName && styles.inputError,
                    styles.input,
                  ]}
                />
              )}
            />
            {errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName.message}</Text>
            )}
          </View>

          {/* Login name */}
          <View>
            <Controller
              control={control}
              name="userName"
              rules={VALIDATION_RULES.userName}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <Input
                  label="Tên đăng nhập"
                  placeholder="Nhập tên đăng nhập"
                  value={value}
                  onChangeText={onChange}
                  containerStyle={[
                    errors.userName && styles.inputError,
                    styles.input,
                  ]}
                  error={error?.message}
                />
              )}
            />
            {errors.userName && (
              <Text style={styles.errorText}>{errors.userName.message}</Text>
            )}
          </View>

          {/* Gender */}
          <View>
            <Controller
              control={control}
              name="gender"
              rules={VALIDATION_RULES.gender}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <View style={styles.gender}>
                  <Text style={styles.label}>Giới tính: </Text>
                  <View style={styles.genderContainer}>
                    {genderOptions.map(option => (
                      <TouchableOpacity
                        key={option.value}
                        style={styles.genderItem}
                        onPress={() => onChange(option.value)}>
                        <View style={styles.radio}>
                          {value === option.value && (
                            <View style={styles.radioSelected} />
                          )}
                        </View>
                        <Text style={styles.optionText}>{option.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            />
            {errors.gender && (
              <Text style={styles.errorText}>{errors.gender.message}</Text>
            )}
          </View>

          {/* Year of birth */}
          <View>
            <Controller
              control={control}
              name="yearOfBirth"
              rules={VALIDATION_RULES.yearOfBirth}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <View style={styles.yearOfBirth}>
                  <Text style={styles.label}>Năm sinh: </Text>
                  <Input
                    style={styles.yearOfBirthContainer}
                    keyboardType="numeric"
                    placeholder="YYYY"
                    value={value}
                    onChangeText={onChange}
                    maxLength={4}
                    containerStyle={[
                      errors.yearOfBirth && styles.inputError,
                      styles.input,
                      styles.inputYearOfBirth,
                    ]}
                    error={error?.message}
                  />
                </View>
              )}
            />
            {errors.yearOfBirth && (
              <Text style={styles.errorText}>{errors.yearOfBirth.message}</Text>
            )}
          </View>

          {/* Email */}
          <View>
            <Controller
              control={control}
              name="email"
              rules={VALIDATION_RULES.email}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <Input
                  label="Email"
                  placeholder="Nhập email"
                  keyboardType="email-address"
                  value={value}
                  onChangeText={onChange}
                  containerStyle={[
                    errors.email && styles.inputError,
                    styles.input,
                  ]}
                  error={error?.message}
                />
              )}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </View>

          {/* Phone */}
          <View>
            <Controller
              control={control}
              name="phone"
              rules={VALIDATION_RULES.phone}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <Input
                  label="Số điện thoại"
                  placeholder="Nhập số điện thoại (tối đa 10 số)"
                  keyboardType="phone-pad"
                  value={value}
                  onChangeText={onChange}
                  maxLength={10}
                  containerStyle={[
                    errors.phone && styles.inputError,
                    styles.input,
                  ]}
                  error={error?.message}
                />
              )}
            />
            {errors.phone && (
              <Text style={styles.errorText}>{errors.phone.message}</Text>
            )}
          </View>

          {/* Nationality */}
          <View>
            <Controller
              control={control}
              name="nationality"
              rules={VALIDATION_RULES.nationality}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <View style={[styles.nationality]}>
                  <Text style={styles.label}>Quốc gia: </Text>
                  <TouchableOpacity
                    style={[styles.nationalityButton, styles.input]}
                    onPress={() =>
                      navigation.navigate('Language', {
                        onSelect: selectedNationality =>
                          onChange(selectedNationality),
                        selectedValue: value,
                      })
                    }
                    accessibilityLabel="Chọn quốc gia">
                    <Text style={styles.nationalityText}>
                      {value || 'Chọn quốc gia'}
                    </Text>
                    <RightIcon style={styles.rightIcon} />
                  </TouchableOpacity>
                  {error && (
                    <Text style={styles.errorText}>{error.message}</Text>
                  )}
                </View>
              )}
            />
            {errors.nationality && (
              <Text style={styles.errorText}>{errors.nationality.message}</Text>
            )}
          </View>

          {/* Address */}
          <View>
            <Controller
              control={control}
              name="address"
              rules={VALIDATION_RULES.address}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <Input
                  label="Địa chỉ"
                  value={value}
                  placeholder="Nhập địa chỉ"
                  onChangeText={onChange}
                  error={error?.message}
                  containerStyle={[
                    errors.address && styles.inputError,
                    styles.input,
                  ]}
                />
              )}
            />
            {errors.address && (
              <Text style={styles.errorText}>{errors.address.message}</Text>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <Button.Main
          title={isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
          onPress={handleSubmit(handleSave)}
          disabled={isLoading}
        />
      </View>

      {bottomSheetVisible && (
        <View style={styles.bottomSheetOverlay}>
          <TouchableOpacity
            style={styles.bottomSheetBackdrop}
            onPress={closeBottomSheet}
          />
          <Animated.View
            style={[
              styles.bottomSheetContent,
              {transform: [{translateY: slideAnim}]},
            ]}>
            <View style={styles.bottomSheetHandle} />
            {renderOtpSection()}
          </Animated.View>
        </View>
      )}
    </>
  );
};

export default EditProfileScreen;
