import {View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {scale} from '~/utils/scaling';

const NewsSkeleton = ({itemCount = 3}) => {
  return (
    <SkeletonPlaceholder speed={1000}>
      {Array.from({length: itemCount}).map((_, index) => (
        <View
          key={index}
          style={{
            borderRadius: scale(10),
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: scale(8),
            marginBottom: scale(10),
            borderWidth: 1,
            padding: scale(10),
          }}>
          <View
            style={{
              width: scale(80),
              height: scale(80),
              borderRadius: scale(10),
            }}
          />
          <View style={{flex: 1, marginLeft: scale(16)}}>
            <View
              style={{
                width: '100%',
                height: scale(12),
                borderRadius: 4,
              }}
            />
            <View
              style={{
                marginTop: scale(6),
                width: '100%',
                height: scale(15),
                borderRadius: 4,
              }}
            />
            <View
              style={{
                marginTop: scale(6),
                width: '100%',
                height: scale(15),
                borderRadius: 4,
              }}
            />
          </View>
        </View>
      ))}
    </SkeletonPlaceholder>
  );
};

export default NewsSkeleton;
