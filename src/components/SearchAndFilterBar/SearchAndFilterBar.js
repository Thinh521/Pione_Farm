import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import Input from '~/components/ui/Input/InputComponents';
import {SearchIcon, DownIcon_2, DownIcon_3} from '~/assets/icons/Icons';
import {scale} from '~/utils/scaling';
import {FontSizes, FontWeights, Colors} from '~/theme/theme';
import Button from '../ui/Button/ButtonComponent';
import DateTimePicker from '@react-native-community/datetimepicker';

const DROPDOWN_OPTIONS = [
  {label: 'Tra cứu tổng hợp', route: 'PriceComparison'},
  {label: 'Tra cứu tổng nâng cao', route: 'AdvancedSearch'},
  {label: 'Giới thiệu chung', route: 'Intro'},
  {label: 'Thị trường trong nước và ngoài nước', route: 'Market'},
  {label: 'Tin tức', route: 'News'},
];

const SearchAndFilterBar = ({
  searchText,
  setSearchText,
  onFilterSelect,
  filterOptions,
  itemOptions,
  placeholder,
  showProductButton,
}) => {
  const navigation = useNavigation();
  const dropdownAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [activeFilter, setActiveFilter] = useState({
    index: null,
    anim: new Animated.Value(0),
    rotateAnim: new Animated.Value(0),
  });
  const [isFocused, setIsFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [dateType, setDateType] = useState('');

  const toggleDropdown = () => {
    const toValue = isDropdownOpen ? 0 : 1;
    Animated.timing(rotateAnim, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();

    if (!isDropdownOpen) {
      setIsDropdownOpen(true);
      Animated.timing(dropdownAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(dropdownAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setIsDropdownOpen(false));
    }
  };

  const toggleFilter = index => {
    if (activeFilter.index === index) {
      Animated.parallel([
        Animated.timing(activeFilter.anim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(activeFilter.rotateAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setActiveFilter({
          index: null,
          anim: new Animated.Value(0),
          rotateAnim: new Animated.Value(0),
        });
      });
    } else {
      if (activeFilter.index !== null) {
        Animated.parallel([
          Animated.timing(activeFilter.anim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(activeFilter.rotateAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
        ]).start();
      }

      const newAnim = new Animated.Value(0);
      const newRotateAnim = new Animated.Value(0);
      setActiveFilter({index, anim: newAnim, rotateAnim: newRotateAnim});

      Animated.parallel([
        Animated.timing(newAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(newRotateAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const filterRotate = activeFilter.rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const onChange = (event, selectedDate) => {
    setShowPicker(false);

    if (event.type === 'set' && selectedDate) {
      const day = selectedDate.getDate().toString().padStart(2, '0');
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
      const year = selectedDate.getFullYear();
      const formatted = `${day}/${month}/${year}`;

      onFilterSelect(dateType, formatted);
    }
  };

  const handleDateSelection = filterLabel => {
    setDateType(filterLabel);
    setShowPicker(true);
  };

  const handleFilterSelection = (filterLabel, option) => {
    onFilterSelect(filterLabel, option);
    toggleFilter(activeFilter.index);
  };

  const handleItemSelection = option => {
    onFilterSelect('Mặt hàng', option);
    toggleFilter(filterOptions.length);
  };

  return (
    <View style={styles.container}>
      {/* Search + dropdown */}
      <View style={styles.wrapper}>
        <View style={styles.row}>
          <View style={styles.inputWrapper}>
            <Input
              value={searchText}
              onChangeText={setSearchText}
              placeholder={placeholder}
              placeholderTextColor="#828282"
              leftIcon={SearchIcon}
              inputStyle={[
                styles.searchInput,
                isFocused && styles.searchInputActive,
              ]}
              containerStyle={styles.searchContainer}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </View>
          <TouchableOpacity
            style={styles.buttonDown}
            onPress={toggleDropdown}
            activeOpacity={0.8}>
            <Animated.View style={{transform: [{rotate}]}}>
              <DownIcon_2 width={scale(18)} />
            </Animated.View>
          </TouchableOpacity>
        </View>
        {isDropdownOpen && (
          <Animated.View
            style={[
              styles.dropdown,
              {
                opacity: dropdownAnim,
                transform: [
                  {
                    translateY: dropdownAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-10, 0],
                    }),
                  },
                ],
              },
            ]}>
            <Text style={styles.headerText}>Danh sách</Text>
            {DROPDOWN_OPTIONS.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => {
                  navigation.navigate('NoBottomTab', {screen: option.route});
                  setIsDropdownOpen(false);
                  rotateAnim.setValue(0);
                  dropdownAnim.setValue(0);
                }}>
                <Text style={styles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        )}
      </View>

      {/* Filter options */}
      <View style={styles.filterContainer}>
        {filterOptions.map((filter, index) => {
          // Handle date filters
          if (filter.label === 'Ngày BĐ' || filter.label === 'Ngày KT') {
            return (
              <View key={index} style={{flex: 1}}>
                <Button.Select
                  title={filter.label}
                  iconRight={<DownIcon_3 style={{color: Colors.white}} />}
                  onPress={() => handleDateSelection(filter.label)}
                />
              </View>
            );
          }

          // Handle province filter
          return (
            <View key={index} style={{flex: 1}}>
              <Button.Select
                title={filter.label}
                testID={`filter-label-${index}`}
                iconRight={
                  activeFilter.index === index ? (
                    <Animated.View
                      style={{transform: [{rotate: filterRotate}]}}>
                      <DownIcon_3 style={{color: Colors.white}} />
                    </Animated.View>
                  ) : (
                    <DownIcon_3 style={{color: Colors.white}} />
                  )
                }
                onPress={() => toggleFilter(index)}
              />
              {activeFilter.index === index && (
                <Animated.View
                  style={[
                    styles.filterDropdown,
                    {
                      opacity: activeFilter.anim,
                      transform: [
                        {
                          translateY: activeFilter.anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-10, 0],
                          }),
                        },
                      ],
                    },
                  ]}>
                  {filter.options.map((option, i) => (
                    <TouchableOpacity
                      key={i}
                      style={styles.filterOption}
                      onPress={() =>
                        handleFilterSelection(filter.label, option)
                      }>
                      <Text style={styles.filterOptionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </Animated.View>
              )}
            </View>
          );
        })}
      </View>

      {/* Product/Fruit dropdown */}
      {showProductButton && itemOptions?.length > 0 && (
        <View style={{marginTop: scale(16)}}>
          <Button.Select
            title="Mặt hàng"
            testID="filter-label-item"
            iconRight={
              activeFilter.index === filterOptions.length ? (
                <Animated.View style={{transform: [{rotate: filterRotate}]}}>
                  <DownIcon_3 style={{color: Colors.white}} />
                </Animated.View>
              ) : (
                <DownIcon_3 style={{color: Colors.white}} />
              )
            }
            onPress={() => toggleFilter(filterOptions.length)}
          />
          {activeFilter.index === filterOptions.length && (
            <Animated.View
              style={[
                styles.filterDropdown,
                {
                  opacity: activeFilter.anim,
                  transform: [
                    {
                      translateY: activeFilter.anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-10, 0],
                      }),
                    },
                  ],
                },
              ]}>
              {itemOptions.map((option, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.filterOption}
                  onPress={() => handleItemSelection(option)}>
                  <Text style={styles.filterOptionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          )}
        </View>
      )}

      {/* Date Picker */}
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(16),
  },
  wrapper: {
    position: 'relative',
    marginBottom: scale(16),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
    marginRight: scale(8),
  },
  searchContainer: {
    borderRadius: scale(8),
    backgroundColor: '#F5F5F5',
    borderColor: 'transparent',
    paddingHorizontal: scale(12),
  },
  searchInput: {
    paddingVertical: scale(10),
    fontSize: FontSizes.regular,
  },
  searchInputActive: {
    borderColor: '#D9D9D9',
  },
  buttonDown: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(8),
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    position: 'absolute',
    top: scale(58),
    left: 0,
    right: 0,
    zIndex: 999,
    backgroundColor: Colors.white,
    borderRadius: scale(8),
    paddingVertical: scale(6),
    paddingHorizontal: scale(16),
    elevation: Platform.OS === 'android' ? 4 : undefined,
    shadowColor: Platform.OS === 'ios' ? '#000' : undefined,
    shadowOffset: Platform.OS === 'ios' ? {width: 0, height: 2} : undefined,
    shadowOpacity: Platform.OS === 'ios' ? 0.1 : undefined,
    shadowRadius: Platform.OS === 'ios' ? 4 : undefined,
  },
  headerText: {
    paddingTop: scale(10),
    paddingBottom: scale(6),
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
  },
  option: {
    paddingVertical: scale(10),
  },
  optionText: {
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.regular,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: scale(16),
    justifyContent: 'space-around',
    marginTop: scale(8),
  },
  filterDropdown: {
    position: 'absolute',
    top: scale(35),
    zIndex: 1000,
    width: '100%',
    marginTop: scale(6),
    backgroundColor: Colors.white,
    borderRadius: scale(6),
    paddingVertical: scale(6),
    paddingHorizontal: scale(12),
    elevation: Platform.OS === 'android' ? 5 : undefined,
    shadowColor: Platform.OS === 'ios' ? '#000' : undefined,
    shadowOffset: Platform.OS === 'ios' ? {width: 0, height: 2} : undefined,
    shadowOpacity: Platform.OS === 'ios' ? 0.15 : undefined,
    shadowRadius: Platform.OS === 'ios' ? 4 : undefined,
  },
  filterOption: {
    paddingVertical: scale(8),
  },
  filterOptionText: {
    fontSize: FontSizes.small,
    color: '#333',
  },
});

export default SearchAndFilterBar;
