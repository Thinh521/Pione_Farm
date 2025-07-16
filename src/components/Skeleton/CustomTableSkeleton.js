import React, {useMemo} from 'react';
import {View, StyleSheet, Platform, ScrollView} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {scale} from '~/utils/scaling';

const CustomTableSkeleton = ({
  columns = [],
  rowCount = 6,
  bodyHeight = scale(200),
  scrollable = false,
}) => {
  const columnFlex = useMemo(
    () => columns.map(col => col.flex || 1),
    [columns],
  );

  const renderHeaderSkeleton = useMemo(
    () => (
      <SkeletonPlaceholder.Item flexDirection="row" paddingVertical={scale(10)}>
        {columnFlex.map((flex, index) => (
          <SkeletonPlaceholder.Item
            key={`header-${index}`}
            flex={flex}
            height={scale(16)}
            borderRadius={4}
            marginHorizontal={scale(12)}
          />
        ))}
      </SkeletonPlaceholder.Item>
    ),
    [columnFlex],
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
                height={scale(16)}
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
    <View
      style={[
        styles.table,
        Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 2,
            shadowOffset: {width: 0, height: 1},
          },
          android: {elevation: 1},
        }),
      ]}>
      <SkeletonPlaceholder
        backgroundColor="#dcdcdc"
        highlightColor="#eaeaea"
        speed={1000}>
        {renderHeaderSkeleton}
        {scrollable ? (
          <ScrollView
            nestedScrollEnabled
            style={{height: bodyHeight}}
            contentContainerStyle={{paddingBottom: scale(10)}}
            showsVerticalScrollIndicator={false}>
            {renderBodySkeleton}
          </ScrollView>
        ) : (
          renderBodySkeleton
        )}
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
});

export default CustomTableSkeleton;
