import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {scale} from '~/utils/scaling';

const CustomTable = ({
  columns,
  data,
  containerStyle,
  headerRowStyle,
  rowStyle,
  bodyHeight = scale(200),
  scrollable = false,
}) => {
  const renderRow = (row, rowIndex) => (
    <View key={rowIndex} style={[styles.row, rowStyle]}>
      {columns.map((col, colIndex) => (
        <Text
          key={colIndex}
          style={[styles.cell, {flex: col.flex || 1}, col.cellStyle]}>
          {row[col.key]}
        </Text>
      ))}
    </View>
  );

  return (
    <View style={[styles.table, containerStyle]}>
      {/* Header */}
      <View style={[styles.row, styles.headerRow, headerRowStyle]}>
        {columns.map((col, index) => (
          <Text
            key={index}
            style={[
              styles.cell,
              {flex: col.flex || 1},
              styles.headerText,
              col.headerStyle,
            ]}>
            {col.title}
          </Text>
        ))}
      </View>

      {/* Body */}
      {scrollable ? (
        <ScrollView
          nestedScrollEnabled={true}
          style={{height: bodyHeight}}
          contentContainerStyle={{paddingBottom: scale(10)}}
          showsVerticalScrollIndicator={true}>
          {data.map(renderRow)}
        </ScrollView>
      ) : (
        data.map(renderRow)
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#eee',
  },
  headerRow: {
    backgroundColor: '#f6f6f6',
  },
  cell: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(12),
    textAlign: 'center',
  },
  headerText: {
    fontWeight: 'bold',
  },
});

export default CustomTable;
