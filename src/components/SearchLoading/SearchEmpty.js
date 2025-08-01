import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale} from '~/utils/scaling';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';

const SearchEmpty = () => {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>Không tìm thấy trái cây nào</Text>
      <Text style={styles.emptySub}>Thử từ khóa hoặc bộ lọc khác</Text>
    </View>
  );
};

export default SearchEmpty;

const styles = StyleSheet.create({
  empty: {
    alignItems: 'center',
    paddingVertical: scale(40),
  },
  emptyText: {
    color: Colors.title,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.medium,
  },
  emptySub: {
    color: Colors.grayText_3,
    fontSize: FontSizes.small,
    marginTop: scale(2),
  },
});
