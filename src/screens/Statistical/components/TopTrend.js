import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

const COLUMN_WIDTH = scale(120);

const COLUMNS = [
  'Name',
  'Price',
  'Category',
  'Change',
  '% Change',
  'Trend',
  'Supply',
  'Updated',
];

const SAMPLE_DATA = [
  {
    name: 'Bitcoin',
    price: '$29,000',
    category: 'Crypto',
    change: '+450',
    percentChange: '+1.5%',
    trend: '↑',
    supply: '19M',
    updated: '2 min ago',
  },
  {
    name: 'Ethereum',
    price: '$1,800',
    category: 'Crypto',
    change: '-35',
    percentChange: '-0.8%',
    trend: '↓',
    supply: '120M',
    updated: '5 min ago',
  },
  {
    name: 'Solana',
    price: '$25',
    category: 'Crypto',
    change: '+1.2',
    percentChange: '+5.0%',
    trend: '↑',
    supply: '400M',
    updated: '10 min ago',
  },
  {
    name: 'BNB',
    price: '$240',
    category: 'Crypto',
    change: '-3',
    percentChange: '-1.2%',
    trend: '↓',
    supply: '160M',
    updated: '1 hour ago',
  },
];

const TopTrendTable = () => {
  return (
    <View>
      <Text style={styles.title}>Top Trending</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {/* Header Row */}
          <View style={styles.rowWrapper}>
            {COLUMNS.map((title, index) => (
              <View key={index.toString()} style={styles.headerCell}>
                <Text style={styles.headerText}>{title}</Text>
              </View>
            ))}
          </View>

          {/* Data Rows */}
          {SAMPLE_DATA.map((item, rowIndex) => (
            <View key={rowIndex.toString()} style={styles.rowWrapper}>
              {[
                item.name,
                item.price,
                item.category,
                item.change,
                item.percentChange,
                item.trend,
                item.supply,
                item.updated,
              ].map((value, colIndex) => (
                <View
                  key={colIndex.toString()}
                  style={[
                    styles.cell,
                    colIndex === 0 && styles.leftRadius,
                    colIndex === COLUMNS.length - 1 && styles.rightRadius,
                    colIndex < COLUMNS.length - 1 && styles.cellBorderRight,
                  ]}>
                  <Text style={styles.cellText}>{value}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default TopTrendTable;

const styles = StyleSheet.create({
  title: {
    color: Colors.title,
    fontSize: FontSizes.semiLarge,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(10),
  },
  rowWrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.border_3,
    backgroundColor: Colors.white,
  },
  headerCell: {
    width: COLUMN_WIDTH,
    paddingVertical: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRightWidth: 1,
    borderRightColor: Colors.border_3,
  },
  cell: {
    width: COLUMN_WIDTH,
    paddingVertical: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
    color: Colors.black,
    textAlign: 'center',
  },
  cellText: {
    fontSize: FontSizes.small,
    color: Colors.grayText,
    textAlign: 'center',
  },
  cellBorderRight: {
    borderRightWidth: 1,
    borderRightColor: Colors.border_3,
  },
  leftRadius: {
    borderBottomLeftRadius: scale(8),
  },
  rightRadius: {
    borderBottomRightRadius: scale(8),
  },
});
