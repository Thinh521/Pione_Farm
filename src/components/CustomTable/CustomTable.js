import React, {useMemo, useCallback} from 'react';
import {View, Text, StyleSheet, ScrollView, Platform} from 'react-native';
import {scale} from '~/utils/scaling';
import CustomTableSkeleton from '../Skeleton/CustomTableSkeleton';
import {Colors} from '../../theme/theme';

const CustomTable = ({
  columns,
  data = [],
  isLoading = false,
  containerStyle,
  headerRowStyle,
  rowStyle,
  bodyHeight = scale(200),
  scrollable = false,
}) => {
  const renderRow = useCallback(
    (row, rowIndex) => (
      <View key={rowIndex} style={[styles.row, rowStyle]}>
        {columns.map((col, colIndex) => (
          <Text
            key={colIndex}
            style={[styles.cell, {flex: col.flex || 1}, col.cellStyle]}
            numberOfLines={1}>
            {row[col.key] || '-'}
          </Text>
        ))}
      </View>
    ),
    [columns, rowStyle],
  );

  const renderHeader = useMemo(
    () => (
      <View style={[styles.row, styles.headerRow, headerRowStyle]}>
        {columns.map((col, index) => (
          <Text
            key={index}
            style={[
              styles.cell,
              {flex: col.flex || 1},
              styles.headerText,
              col.headerStyle,
            ]}
            numberOfLines={1}>
            {col.title}
          </Text>
        ))}
      </View>
    ),
    [columns, headerRowStyle],
  );

  const renderBody = useMemo(() => {
    if (scrollable) {
      return (
        <ScrollView
          nestedScrollEnabled
          style={{height: bodyHeight}}
          contentContainerStyle={{paddingBottom: scale(10)}}
          showsVerticalScrollIndicator>
          {isLoading ? (
            <CustomTableSkeleton columns={columns} rowCount={6} />
          ) : (
            data.map(renderRow)
          )}
        </ScrollView>
      );
    }
    return isLoading ? (
      <CustomTableSkeleton columns={columns} rowCount={6} />
    ) : (
      data.map(renderRow)
    );
  }, [isLoading, data, renderRow, scrollable, bodyHeight, columns]);

  return (
    <View style={[styles.table, containerStyle]}>
      {renderHeader}
      {renderBody}
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {width: 0, height: 1},
      },
      android: {
        elevation: 1,
      },
    }),
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
