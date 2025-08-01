import React from 'react';
import {View} from 'react-native';
import {scale} from '~/utils/scaling';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

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
            padding: scale(10),
            borderWidth: 1,
            borderColor: '#E1E9EE',
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
                height: scale(15),
                borderRadius: scale(4),
              }}
            />
            <View
              style={{
                marginTop: scale(8),
                width: '90%',
                height: scale(15),
                borderRadius: scale(4),
              }}
            />
            <View
              style={{
                marginTop: scale(8),
                width: '80%',
                height: scale(15),
                borderRadius: scale(4),
              }}
            />
          </View>
        </View>
      ))}
    </SkeletonPlaceholder>
  );
};

export default NewsSkeleton;
