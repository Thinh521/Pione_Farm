import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {scale} from '~/utils/scaling';

const CustomTableSkeleton = ({columns = [], rowCount = 5}) => {
  const columnFlex = useMemo(
    () => columns.map(col => col.flex || 1),
    [columns],
  );

  const renderBodySkeleton = useMemo(
    () => (
      <SkeletonPlaceholder.Item>
        {Array.from({length: rowCount}).map((_, rowIndex) => (
          <SkeletonPlaceholder.Item
            key={`row-${rowIndex}`}
            flexDirection="row"
            paddingVertical={scale(10)}
            borderBottomWidth={0.5}
            borderColor="#eee">
            {columnFlex.map((flex, colIndex) => (
              <SkeletonPlaceholder.Item
                key={`cell-${rowIndex}-${colIndex}`}
                flex={flex}
                height={scale(20)}
                borderRadius={4}
                marginHorizontal={scale(12)}
              />
            ))}
          </SkeletonPlaceholder.Item>
        ))}
      </SkeletonPlaceholder.Item>
    ),
    [columnFlex, rowCount],
  );

  return (
    <View style={styles.table}>
      <SkeletonPlaceholder
        backgroundColor="#dcdcdc"
        highlightColor="#eaeaea"
        speed={1000}>
        {renderBodySkeleton}
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    borderRadius: 6,
    overflow: 'hidden',
  },
});

export default CustomTableSkeleton;
