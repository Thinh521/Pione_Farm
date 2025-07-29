import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Images from '../../assets/images/Images';
import ProposeItem from './ProposeItem';
import {useNavigation} from '@react-navigation/core';
import {scale} from '../../utils/scaling';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';

const data = [
  {
    id: 1,
    title: 'Đồng bằng sông Cửu Long',
    description:
      'Là vùng cực nam của Việt Nam, có hệ thống sông ngòi chằng chịt, đất đai màu mỡ và là vựa lúa lớn nhất cả nước.',
    image: Images.mekong,
    value: '10.2',
    percent: '+89.01% this week',
  },
  {
    id: 2,
    title: 'Đồng bằng Bắc Bộ',
    description:
      'Là cái nôi văn minh lúa nước, vùng này có hệ thống sông Hồng và điều kiện thuận lợi cho trồng lúa, rau màu.',
    image: Images.mekong,
    value: '8.4',
    percent: '+72.15% this week',
  },
  {
    id: 3,
    title: 'Tây Nguyên',
    description:
      'Vùng cao nguyên đất đỏ bazan nổi tiếng với cây công nghiệp như cà phê, hồ tiêu, cao su.',
    image: Images.mekong,
    value: '9.1',
    percent: '+66.90% this week',
  },
  {
    id: 4,
    title: 'Đông Nam Bộ',
    description:
      'Vùng kinh tế trọng điểm với khí hậu ôn hòa, thuận lợi cho phát triển cây ăn quả, cao su, điều.',
    image: Images.mekong,
    value: '7.6',
    percent: '+71.88% this week',
  },
  {
    id: 5,
    title: 'Bắc Trung Bộ',
    description:
      'Vùng có địa hình đa dạng, nhiều sông ngòi, thích hợp cho cả nông nghiệp và thủy sản.',
    image: Images.mekong,
    value: '6.7',
    percent: '+55.20% this week',
  },
  {
    id: 6,
    title: 'Nam Trung Bộ',
    description:
      'Khí hậu khô hạn nhưng thuận lợi cho trồng nho, táo, hành tỏi và phát triển nghề nuôi trồng thủy sản ven biển.',
    image: Images.mekong,
    value: '6.1',
    percent: '+48.03% this week',
  },
  {
    id: 7,
    title: 'Trung du và miền núi Bắc Bộ',
    description:
      'Vùng có địa hình núi cao, nhiều đồi chè, cây ăn quả và thảo dược quý hiếm.',
    image: Images.mekong,
    value: '8.8',
    percent: '+78.42% this week',
  },
  {
    id: 8,
    title: 'Biển Đông và Hải đảo',
    description:
      'Vùng ven biển và hải đảo, thích hợp cho nuôi trồng thủy sản, phát triển kinh tế biển và du lịch sinh thái.',
    image: Images.mekong,
    value: '5.3',
    percent: '+39.77% this week',
  },
];

const ProposeScreen = () => {
  const navigation = useNavigation();

  const navigateToAllPropose = () => {
    navigation.navigate('NoBottomTab', {
      screen: 'CropZoneAll',
      params: {
        title: 'Thông tin vùng trồng',
        data: data,
      },
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Propose</Text>
        <TouchableOpacity onPress={navigateToAllPropose}>
          <Text>Xem tất cả</Text>
        </TouchableOpacity>
      </View>
      {data.slice(0, 3).map(item => (
        <ProposeItem
          key={item.id}
          title={item.title}
          description={item.description}
          image={item.image}
          value={item.value}
          percent={item.percent}
        />
      ))}
    </ScrollView>
  );
};

export default ProposeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: scale(20),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: Colors.title,
    fontSize: FontSizes.large,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(10),
  },
});
