import React, {useEffect, useRef} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';
import {scale} from '../../utils/scaling';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const CustomBottomSheet = ({
  visible,
  onClose,
  title,
  data = [],
  selectedItem,
  onSelectItem,
  keyExtractor = item => item._id || item.id,
  labelExtractor = item => item.name || item.label,
}) => {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose && onClose();
    });
  };

  const handleSelectItem = item => {
    onSelectItem && onSelectItem(item);
    handleClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent>
      <GestureHandlerRootView style={{flex: 1}}>
        <Animated.View style={[styles.overlay, {opacity}]}>
          <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPress={handleClose}
          />

          <Animated.View
            style={[styles.bottomSheet, {transform: [{translateY}]}]}>
            {/* Handle Bar */}
            <View style={styles.handleBar} />

            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
              <TouchableOpacity
                onPress={handleClose}
                style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView
              style={styles.content}
              showsVerticalScrollIndicator={false}>
              {data.map(item => {
                const key = keyExtractor(item);
                const label = labelExtractor(item);
                const isSelected =
                  selectedItem && keyExtractor(selectedItem) === key;

                return (
                  <TouchableOpacity
                    key={key}
                    style={[styles.item, isSelected && styles.selectedItem]}
                    onPress={() => handleSelectItem(item)}>
                    <Text
                      style={[
                        styles.itemText,
                        isSelected && styles.selectedItemText,
                      ]}>
                      {label}
                    </Text>
                    {isSelected && <Text style={styles.checkmark}>✓</Text>}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Animated.View>
        </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  bottomSheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    maxHeight: SCREEN_HEIGHT * 0.7,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  handleBar: {
    width: scale(40),
    height: scale(4),
    backgroundColor: '#E0E0E0',
    borderRadius: scale(2),
    alignSelf: 'center',
    marginTop: scale(8),
    marginBottom: scale(12),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingBottom: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    color: Colors.title,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
  },
  closeButton: {
    padding: scale(4),
  },
  closeButtonText: {
    fontSize: FontSizes.medium,
    color: '#666',
  },
  content: {
    paddingHorizontal: scale(20),
    paddingTop: scale(8),
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(16),
    paddingHorizontal: scale(4),
    borderBottomWidth: 1,
    borderBottomColor: '#F8F8F8',
  },
  selectedItem: {
    backgroundColor: '#F0F8FF',
    borderRadius: scale(8),
    marginHorizontal: -scale(4),
    paddingHorizontal: scale(10),
  },
  itemText: {
    fontSize: FontSizes.small,
    color: Colors.title,
  },
  selectedItemText: {
    color: Colors.greenText,
    fontWeight: '500',
  },
  checkmark: {
    fontSize: FontSizes.regular,
    color: Colors.greenText,
    fontWeight: FontWeights.bold,
  },
});

export default CustomBottomSheet;
