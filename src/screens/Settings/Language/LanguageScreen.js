import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/core';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';
import Button from '~/components/ui/Button/ButtonComponent';
import Background_2 from '~/components/Background/Background_2';

const LANGUAGE_OPTIONS = [
  {key: 'Vietnamese', label: 'Vietnamese', flag: '🇻🇳'},
  {key: 'American', label: 'American', flag: '🇺🇸'},
  {key: 'Japanese', label: 'Japanese', flag: '🇯🇵'},
  {key: 'Korean', label: 'Korean', flag: '🇰🇷'},
  {key: 'Chinese', label: 'Chinese', flag: '🇨🇳'},
  {key: 'French', label: 'French', flag: '🇫🇷'},
  {key: 'German', label: 'German', flag: '🇩🇪'},
  {key: 'British', label: 'British', flag: '🇬🇧'},
  {key: 'Italian', label: 'Italian', flag: '🇮🇹'},
  {key: 'Spanish', label: 'Spanish', flag: '🇪🇸'},
  {key: 'Russian', label: 'Russian', flag: '🇷🇺'},
  {key: 'Indian', label: 'Indian', flag: '🇮🇳'},
  {key: 'Brazilian', label: 'Brazilian', flag: '🇧🇷'},
  {key: 'Mexican', label: 'Mexican', flag: '🇲🇽'},
  {key: 'Canadian', label: 'Canadian', flag: '🇨🇦'},
  {key: 'Australian', label: 'Australian', flag: '🇦🇺'},
];

const LanguageScreen = () => {
  const {params} = useRoute();
  const navigation = useNavigation();
  const {onSelect, selectedValue} = params || {};
  const [selected, setSelected] = useState(selectedValue || 'Vietnamese');

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[styles.row, selected === item.key && styles.rowSelected]}
      onPress={() => setSelected(item.key)}
      activeOpacity={0.8}>
      <View style={styles.left}>
        <Text style={styles.flag}>{item.flag}</Text>
        <Text style={styles.label}>{item.label}</Text>
      </View>
      <View
        style={[
          styles.checkbox,
          selected === item.key && styles.checkboxSelected,
        ]}>
        {selected === item.key && <Text style={styles.checkIcon}>✓</Text>}
      </View>
    </TouchableOpacity>
  );

  const handleConfirm = () => {
    if (onSelect) {
      onSelect(selected);
    }
    navigation.goBack();
  };

  return (
    <>
      <Background_2 />

      <View style={styles.container}>
        <FlatList
          data={LANGUAGE_OPTIONS}
          renderItem={renderItem}
          keyExtractor={item => item.key}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingVertical: 16}}
        />
        <Button.Main title="OK" onPress={handleConfirm} />
      </View>
    </>
  );
};

export default LanguageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingVertical: scale(20),
  },
  row: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingVertical: scale(12),
    paddingHorizontal: scale(12),
    marginBottom: scale(12),
  },
  rowSelected: {
    borderColor: Colors.green,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: scale(20),
    marginRight: scale(10),
  },
  label: {
    fontSize: FontSizes.medium,
  },
  checkbox: {
    width: scale(20),
    height: scale(20),
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    borderColor: Colors.green,
    backgroundColor: Colors.green,
  },
  checkIcon: {
    color: Colors.white,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
  },
});
