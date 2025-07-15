import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {View} from 'react-native';
import {scale} from '../../utils/scaling';

const FruitPriceListSkeleton = ({itemCount = 3}) => {
  return (
    <SkeletonPlaceholder speed={1000}>
      {Array.from({length: itemCount}).map((_, index) => (
        <View
          key={index}
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: scale(8),
            marginBottom: scale(15),
          }}>
          <View style={{flex: 1}}>
            <View
              style={{
                width: '100%',
                height: scale(40),
                borderRadius: scale(10),
              }}
            />
          </View>
        </View>
      ))}
    </SkeletonPlaceholder>
  );
};

export default FruitPriceListSkeleton;
