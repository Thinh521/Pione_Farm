import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {View} from 'react-native';
import {scale} from '../../utils/scaling';

const WalletListSkeleton = ({itemCount = 3}) => {
  return (
    <SkeletonPlaceholder speed={1000}>
      {Array.from({length: itemCount}).map((_, index) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: scale(16),
          }}>
          <View
            style={{
              width: scale(50),
              height: scale(50),
              borderRadius: scale(25),
            }}
          />
          <View style={{marginLeft: scale(16)}}>
            <View
              style={{
                width: scale(100),
                height: scale(12),
                borderRadius: 4,
              }}
            />
            <View
              style={{
                marginTop: scale(6),
                width: scale(140),
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

export default WalletListSkeleton;
