import React from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';
import ProposeItem from './ProposeItem';
import {scale} from '../../utils/scaling';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';
import {useNavigation} from '@react-navigation/core';
import Background_2 from '../../components/Background/Background_2';

const AllProposeScreen = ({route}) => {
  const {data} = route.params;
  const navigation = useNavigation();

  const navigateToProposeDetail = id => {
    navigation.navigate('NoBottomTab', {
      screen: 'CropZoneDetail',
      params: {id},
    });
  };

  return (
    <>
      <Background_2 />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: scale(16)}}>
        <Text style={styles.headerTitle}>Vùng trồng</Text>

        {data.map(item => (
          <ProposeItem
            key={item.id}
            title={item.name}
            description={item.description}
            images={item.images}
            value={item.value}
            percent={item.percent}
            onPress={() => navigateToProposeDetail(item.id)}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default AllProposeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    color: Colors.title,
    fontSize: FontSizes.large,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(6),
    marginTop: scale(4),
  },
});
