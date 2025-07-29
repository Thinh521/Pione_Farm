import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Images from '../../assets/images/Images';

const {width, height} = Dimensions.get('window');

const regionData = [
  {
    id: '1',
    name: 'Đồng bằng sông Cửu Long',
    image: Images.mekong,
    value: '10.2',
    percent: '+89.01% this week',
    description:
      'Là vùng cực nam của Việt Nam, có hệ thống sông ngòi chằng chịt, đất đai màu mỡ và là vựa lúa lớn nhất cả nước.',
    location:
      'Bao gồm 13 tỉnh, thành: An Giang, Đồng Tháp, Tiền Giang, Vĩnh Long, Bến Tre, Trà Vinh, Sóc Trăng, Bạc Liêu, Cà Mau, Kiên Giang, Hậu Giang, Long An, Cần Thơ',
    area: '40,577 km²',
    population: '17.2 triệu người',
    climate: {
      type: 'Khí hậu nhiệt đới gió mùa',
      temperature: '26-28°C',
      rainfall: '1,200-1,800mm/năm',
      seasons: 'Mùa khô: tháng 12-4, Mùa mưa: tháng 5-11',
      humidity: '80-85%',
    },
    soil: {
      type: 'Đất phù sa',
      ph: '6.0-7.5',
      characteristics: 'Màu mỡ, giàu chất hữu cơ, được bồi đắp hàng năm',
      depth: '2-3m',
      advantages: 'Cung cấp dưỡng chất tự nhiên, dễ canh tác',
    },
    address: {
      latitude: 10.2,
      longitude: 105.2,
      latitudeDelta: 2.0,
      longitudeDelta: 2.0,
    },
    crops: [
      {
        name: 'Lúa',
        season:
          'Vụ đông xuân: tháng 12-4, Vụ hè thu: tháng 6-10, Vụ mùa: tháng 8-12',
        area: '2.5 triệu ha',
        yield: '6-7 tấn/ha',
        description: 'Cây trồng chủ lực, cung cấp 50% lượng gạo cả nước.',
        requirements: 'Nhiệt độ 23-30°C, ngập nước 10-15cm',
        techniques: '1 gieo 2 cấy, gieo sạ, tưới tiêu theo nhu cầu',
        diseases: 'Bệnh đạo ôn, sâu cuốn lá, rầy nâu',
      },
      {
        name: 'Mía',
        season: 'Trồng: tháng 2-4, Thu hoạch: tháng 11-3',
        area: '200,000 ha',
        yield: '70-80 tấn/ha',
        description: 'Cây công nghiệp quan trọng, nguyên liệu sản xuất đường.',
        requirements: 'Nhiệt độ 26-32°C, đất thoát nước tốt',
        techniques: 'Trồng luống cao, bón phân 3 lần/vụ',
        diseases: 'Bệnh đốm đỏ, sâu đục thân, rệp sáp',
      },
      {
        name: 'Dừa',
        season: 'Trồng: tháng 5-6, Thu quanh năm',
        area: '140,000 ha',
        yield: '80-100 quả/cây/năm',
        description: 'Cây đặc sản vùng ven biển, chế biến nhiều sản phẩm.',
        requirements: 'Gần nguồn nước, chịu mặn tốt',
        techniques: 'Trồng theo hàng, tưới nhỏ giọt',
        diseases: 'Bệnh vàng lá, rệp dừa, sâu đục ngọn',
      },
      {
        name: 'Thanh long',
        season: 'Trồng: tháng 5-6, Thu: tháng 6-11',
        area: '35,000 ha',
        yield: '25-30 tấn/ha',
        description: 'Cây ăn quả có giá trị kinh tế cao, xuất khẩu nhiều.',
        requirements: 'Nhiệt độ 25-30°C, thoát nước tốt',
        techniques: 'Trồng leo giàn, cắt tỉa thường xuyên',
        diseases: 'Bệnh thối gốc, sâu đục thân, nấm đốm lá',
      },
      {
        name: 'Rau màu',
        season: 'Trồng quanh năm',
        area: '180,000 ha',
        yield: '20-25 tấn/ha',
        description: 'Đa dạng loại rau: cải, rau muống, bầu bí, dưa chuột.',
        requirements: 'Đất tơi xốp, nhiều chất hữu cơ',
        techniques: 'Luân canh, sử dụng màng phủ',
        diseases: 'Bệnh héo xanh, sâu khoang, rệp mềm',
      },
    ],
    advantages: [
      'Đất phù sa màu mỡ, tự bồi đắp',
      'Hệ thống sông ngòi chằng chịt',
      'Khí hậu ổn định, thuận lợi nông nghiệp',
      'Kinh nghiệm canh tác lúa nước lâu đời',
      'Cơ sở hạ tầng phát triển',
    ],
    challenges: [
      'Xâm nhập mặn ngày càng sâu',
      'Hạn hán và lũ lụt thất thường',
      'Suy thoái đất do thâm canh',
      'Thiếu nước ngọt mùa khô',
      'Ô nhiễm môi trường nước',
    ],
  },
  {
    id: '2',
    name: 'Đồng bằng Bắc Bộ',
    description:
      'Là cái nôi văn minh lúa nước, vùng này có hệ thống sông Hồng và điều kiện thuận lợi cho trồng lúa, rau màu.',
    image: Images.mekong,
    value: '8.4',
    percent: '+72.15% this week',
    location:
      'Bao gồm: Hà Nội, Hải Phòng, Hải Dương, Hưng Yên, Hà Nam, Nam Định, Thái Bình, Ninh Bình, Vĩnh Phúc',
    area: '14,900 km²',
    population: '14.5 triệu người',
    climate: {
      type: 'Khí hậu cận nhiệt đới gió mùa',
      temperature: '16-28°C',
      rainfall: '1,600-1,800mm/năm',
      seasons: 'Mùa đông: tháng 11-3, Mùa hè: tháng 4-10',
      humidity: '75-85%',
    },
    soil: {
      type: 'Đất phù sa sông Hồng',
      ph: '6.5-7.0',
      characteristics: 'Màu mỡ, tầng đất dày, giàu khoáng chất',
      depth: '1.5-2.5m',
      advantages: 'Cấu trúc tốt, thoát nước vừa phải',
    },
    address: {
      latitude: 15.4,
      longitude: 108.3,
      latitudeDelta: 3.0,
      longitudeDelta: 3.0,
    },
    crops: [
      {
        name: 'Lúa',
        season: 'Vụ chiêm: tháng 6-10, Vụ mùa: tháng 12-5',
        area: '1.2 triệu ha',
        yield: '5.5-6.5 tấn/ha',
        description: 'Cây trồng truyền thống, cung cấp 20% lượng gạo cả nước.',
        requirements: 'Nhiệt độ 20-30°C, đủ nước tưới',
        techniques: 'Cấy thẳng hàng, sử dụng giống chất lượng cao',
        diseases: 'Bệnh đạo ôn, sâu cuốn lá, rầy nâu',
      },
      {
        name: 'Ngô',
        season: 'Vụ xuân: tháng 2-6, Vụ mùa: tháng 7-11',
        area: '250,000 ha',
        yield: '5-6 tấn/ha',
        description: 'Cây lương thực thứ hai, làm thức ăn chăn nuôi.',
        requirements: 'Nhiệt độ 18-30°C, đất thoát nước tốt',
        techniques: 'Gieo thẳng hàng, bón phân cân đối',
        diseases: 'Bệnh cháy lá, sâu khoang, rệp',
      },
      {
        name: 'Rau màu',
        season: 'Trồng quanh năm',
        area: '200,000 ha',
        yield: '15-20 tấn/ha',
        description: 'Đa dạng: rau cải, su hào, cà chua, ớt.',
        requirements: 'Đất tơi xốp, phì nhiêu',
        techniques: 'Nhà kính, thủy canh, canh tác hữu cơ',
        diseases: 'Bệnh héo xanh, nấm rễ, sâu ăn lá',
      },
      {
        name: 'Đậu phộng',
        season: 'Vụ xuân: tháng 2-6, Vụ mùa: tháng 8-12',
        area: '120,000 ha',
        yield: '2.5-3 tấn/ha',
        description: 'Cây họ đậu, cải tạo đất và cung cấp protein.',
        requirements: 'Nhiệt độ 25-30°C, đất cát pha',
        techniques: 'Gieo thẳng, vun luống cao',
        diseases: 'Bệnh héo xanh, sâu khoang, nấm rễ',
      },
      {
        name: 'Khoai lang',
        season: 'Trồng: tháng 3-4 và 7-8, Thu: sau 4-5 tháng',
        area: '80,000 ha',
        yield: '18-22 tấn/ha',
        description: 'Cây lương thực chịu hạn, thích ứng tốt.',
        requirements: 'Đất thoát nước tốt, ít phân đạm',
        techniques: 'Trồng luống cao, tỉa bỏ dây thừa',
        diseases: 'Bệnh thối củ, sâu khoang, nứt củ',
      },
    ],
    advantages: [
      'Đất phù sa màu mỡ của sông Hồng',
      'Khí hậu 4 mùa rõ rệt',
      'Kinh nghiệm canh tác lúa nước cổ xưa',
      'Mạng lưới thủy lợi phát triển',
      'Gần thị trường tiêu thụ lớn',
    ],
    challenges: [
      'Thiếu đất sản xuất do đô thị hóa',
      'Ô nhiễm môi trường công nghiệp',
      'Thời tiết cực đoan tăng',
      'Chi phí sản xuất cao',
      'Cạnh tranh nguồn nước với công nghiệp',
    ],
  },
  {
    id: '3',
    name: 'Tây Nguyên',
    description:
      'Vùng cao nguyên đất đỏ bazan nổi tiếng với cây công nghiệp như cà phê, hồ tiêu, cao su.',
    image: Images.mekong,
    value: '9.1',
    percent: '+66.90% this week',
    location: 'Bao gồm các tỉnh: Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông, Lâm Đồng',
    area: '54,474 km²',
    population: '5.8 triệu người',
    climate: {
      type: 'Khí hậu nhiệt đới gió mùa',
      temperature: '18-25°C',
      rainfall: '1,800-2,500mm/năm',
      seasons: 'Mùa khô: tháng 11-4, Mùa mưa: tháng 5-10',
      humidity: '75-85%',
    },
    soil: {
      type: 'Đất đỏ bazan',
      ph: '5.5-6.5',
      characteristics:
        'Giàu dinh dưỡng, thoát nước tốt, chứa nhiều khoáng chất',
      depth: '1-2m',
      advantages: 'Thích hợp cho cây công nghiệp lâu năm, độ phì nhiêu cao',
    },
    address: {
      latitude: 12.6667,
      longitude: 108.05,
      latitudeDelta: 1.5,
      longitudeDelta: 1.5,
    },
    crops: [
      {
        name: 'Cà phê',
        season: 'Gieo: tháng 5-6, Thu hoạch: tháng 11-1',
        area: '690,000 ha',
        yield: '18-20 tấn/ha',
        description:
          'Cây trồng chủ lực, chiếm 60% diện tích canh tác. Chủ yếu là cà phê Robusta.',
        requirements: 'Nhiệt độ 18-24°C, lượng mưa 1,500-2,000mm',
        techniques: 'Trồng theo hàng, tỉa cành, bón phân định kỳ',
        diseases: 'Bệnh gỉ sắt, sâu đục cành, sâu đục quả',
      },
      {
        name: 'Hồ tiêu',
        season: 'Gieo: tháng 6-7, Thu hoạch: tháng 12-2',
        area: '85,000 ha',
        yield: '3-4 tấn/ha',
        description: 'Cây gia vị có giá trị kinh tế cao, xuất khẩu chủ yếu.',
        requirements: 'Nhiệt độ 24-28°C, độ ẩm 80-85%',
        techniques: 'Trồng leo giàn, tưới nhỏ giọt, cắt tỉa thường xuyên',
        diseases: 'Bệnh héo xanh, nấm rễ, sâu đục thân',
      },
      {
        name: 'Cao su',
        season: 'Trồng: tháng 5-6, Khai thác: sau 7 năm',
        area: '450,000 ha',
        yield: '2.5-3 tấn mủ/ha/năm',
        description: 'Cây công nghiệp lâu năm, tuổi thọ 25-30 năm.',
        requirements: 'Nhiệt độ 25-30°C, lượng mưa 2,000mm',
        techniques: 'Cạo mủ sáng sớm, bón phân theo chu kỳ',
        diseases: 'Bệnh lá khô, nấm rễ, sâu ăn lá',
      },
      {
        name: 'Điều',
        season: 'Trồng: tháng 5-6, Thu hoạch: tháng 2-4',
        area: '120,000 ha',
        yield: '1.5-2 tấn/ha',
        description: 'Cây chịu hạn tốt, thích hợp với vùng đồi núi.',
        requirements: 'Nhiệt độ 20-30°C, chịu được hạn hán',
        techniques: 'Tỉa cành tạo tán, phòng trừ sâu bệnh',
        diseases: 'Bệnh đốm lá, sâu đục quả, rệp sáp',
      },
      {
        name: 'Chè',
        season: 'Trồng: tháng 6-7, Hái: quanh năm',
        area: '25,000 ha',
        yield: '8-12 tấn lá tươi/ha/năm',
        description: 'Thích hợp với vùng cao, sương mù nhiều.',
        requirements: 'Độ cao >800m, nhiệt độ 18-25°C',
        techniques: 'Hái non liên tục, tỉa cành định kỳ',
        diseases: 'Bệnh đốm nâu, sâu đo, nhện đỏ',
      },
    ],
    advantages: [
      'Đất đai phì nhiêu, thích hợp cây công nghiệp',
      'Khí hậu ổn định, 2 mùa rõ rệt',
      'Địa hình đồi núi, thuận lợi thoát nước',
      'Nguồn nhân công dồi dào',
      'Kinh nghiệm canh tác lâu đời',
    ],
    challenges: [
      'Biến đổi khí hậu ảnh hưởng năng suất',
      'Sâu bệnh phát triển mạnh',
      'Giá cả thế giới biến động',
      'Cần đầu tư công nghệ hiện đại',
      'Bảo vệ môi trường sinh thái',
    ],
  },
  {
    id: '4',
    name: 'Đông Nam Bộ',
    description:
      'Vùng kinh tế trọng điểm với khí hậu ôn hòa, thuận lợi cho phát triển cây ăn quả, cao su, điều.',
    image: Images.mekong,
    value: '7.6',
    percent: '+71.88% this week',
    location:
      'Bao gồm: TP.HCM, Bình Dương, Đồng Nai, Bà Rịa-Vũng Tàu, Tây Ninh, Bình Phước',
    area: '23,598 km²',
    population: '16.5 triệu người',
    climate: {
      type: 'Khí hậu nhiệt đới gió mùa',
      temperature: '25-29°C',
      rainfall: '1,400-2,000mm/năm',
      seasons: 'Mùa khô: tháng 12-4, Mùa mưa: tháng 5-11',
      humidity: '70-80%',
    },
    soil: {
      type: 'Đất xám, đất đỏ vàng',
      ph: '5.0-6.5',
      characteristics: 'Đa dạng loại đất, từ cát đến sét',
      depth: '0.8-1.5m',
      advantages: 'Thích hợp cho nhiều loại cây trồng',
    },
    address: {
      latitude: 11.0,
      longitude: 106.5,
      latitudeDelta: 1.5,
      longitudeDelta: 1.5,
    },
    crops: [
      {
        name: 'Cao su',
        season: 'Trồng: tháng 5-6, Khai thác: sau 6-7 năm',
        area: '780,000 ha',
        yield: '2.8-3.2 tấn mủ/ha/năm',
        description: 'Cây công nghiệp chủ lực, chiếm 35% diện tích canh tác.',
        requirements: 'Nhiệt độ 24-28°C, lượng mưa 1,800mm',
        techniques: 'Cạo mủ theo chu kỳ, bón phân cân đối',
        diseases: 'Bệnh thối rễ, nấm lá, sâu ăn lá',
      },
      {
        name: 'Điều',
        season: 'Trồng: tháng 4-5, Thu hoạch: tháng 1-3',
        area: '280,000 ha',
        yield: '1.8-2.2 tấn/ha',
        description: 'Cây đặc sản xuất khẩu, chế biến giá trị cao.',
        requirements: 'Chịu hạn tốt, đất thoát nước',
        techniques: 'Tỉa cành thông thoáng, phòng trừ tổng hợp',
        diseases: 'Bệnh thối quả, sâu đục quả, rệp sáp',
      },
      {
        name: 'Lúa',
        season: 'Vụ đông xuân: tháng 12-4, Vụ hè thu: tháng 6-10',
        area: '650,000 ha',
        yield: '5.5-6.5 tấn/ha',
        description: 'Lương thực chính, canh tác thâm canh.',
        requirements: 'Đủ nước tưới, nhiệt độ 25-30°C',
        techniques: 'Gieo sạ, cấy máy, thu hoạch cơ giới',
        diseases: 'Bệnh đạo ôn, rầy nâu, sâu cuốn lá',
      },
      {
        name: 'Thanh long',
        season: 'Trồng: tháng 4-5, Thu: tháng 6-12',
        area: '45,000 ha',
        yield: '28-35 tấn/ha',
        description: 'Cây ăn quả xuất khẩu, giá trị kinh tế cao.',
        requirements: 'Thoát nước tốt, nhiệt độ 26-30°C',
        techniques: 'Trồng leo giàn, chiếu sáng bổ sung',
        diseases: 'Bệnh thối thân, nấm đốm, sâu đục quả',
      },
      {
        name: 'Rau màu',
        season: 'Trồng quanh năm',
        area: '120,000 ha',
        yield: '22-28 tấn/ha',
        description: 'Cung cấp rau xanh cho các thành phố lớn.',
        requirements: 'Đất tơi xốp, tưới đủ nước',
        techniques: 'Nhà lưới, thủy canh, hữu cơ',
        diseases: 'Bệnh héo xanh, sâu khoang, rệp',
      },
    ],
    advantages: [
      'Gần thị trường tiêu thụ lớn',
      'Hạ tầng giao thông phát triển',
      'Nguồn vốn đầu tư dồi dào',
      'Công nghệ canh tác hiện đại',
      'Chuỗi giá trị hoàn chỉnh',
    ],
    challenges: [
      'Áp lực chuyển đổi mục đích sử dụng đất',
      'Ô nhiễm môi trường công nghiệp',
      'Chi phí đất và nhân công cao',
      'Cạnh tranh nguồn nước',
      'Thiếu lao động nông nghiệp',
    ],
  },
];

const PlantRegionMapScreen = () => {
  const [selectedRegion, setSelectedRegion] = useState(regionData[0]);
  const [showFilter, setShowFilter] = useState(false);

  const renderRegionCard = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setSelectedRegion(item)}>
      <Image source={item.image} style={styles.cardImage} />

      {/* Feature tag */}
      <View style={styles.featureTag}>
        <Text style={styles.featureText}></Text>
      </View>

      {/* Bed count */}
      <View style={styles.bedCount}>
        <Text style={styles.bedCountText}>🌾 1</Text>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.name}
        </Text>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <Text style={styles.starIcon}>⭐</Text>
          <Text style={styles.ratingText}>Chưa có đánh giá</Text>
        </View>

        {/* Price */}
        <Text style={styles.price} numberOfLines={2}>{item.description}</Text>

        {/* Location */}
        <View style={styles.locationContainer}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.locationText} numberOfLines={1}>
            Vietnam, Ho Chi Minh City
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Map */}
      <MapView
        style={styles.map}
        initialRegion={selectedRegion.address}
        region={selectedRegion.address}>
        {regionData.map(region => (
          <Marker
            key={region.id}
            coordinate={{
              latitude: region.address.latitude,
              longitude: region.address.longitude,
            }}
            onPress={() => setSelectedRegion(region)}>
            <View style={styles.customMarker}>
              <View style={styles.markerContent}>
                <Text style={styles.markerIcon}>🏨</Text>
              </View>
              <View style={styles.markerTriangle} />
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Price bubble on map */}
      <View style={styles.priceBubble}>
        <Text style={styles.priceBubbleText}>Nông nghiệp đ900,000</Text>
      </View>

      {/* Filter button */}
      <TouchableOpacity style={styles.filterButton}>
        <Text style={styles.filterButtonText}>🔽 Bộ lọc</Text>
      </TouchableOpacity>

      {/* Location button */}
      <TouchableOpacity style={styles.locationButton}>
        <Text style={styles.locationButtonIcon}>🎯</Text>
      </TouchableOpacity>

      {/* Cards */}
      <View style={styles.cardContainer}>
        <FlatList
          horizontal
          data={regionData}
          keyExtractor={item => item.id}
          renderItem={renderRegionCard}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardList}
          snapToInterval={width * 0.85}
          decelerationRate="fast"
        />
      </View>

      {/* Add button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height,
  },
  customMarker: {
    alignItems: 'center',
  },
  markerContent: {
    backgroundColor: '#FF6B35',
    padding: 8,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#fff',
  },
  markerIcon: {
    fontSize: 16,
    color: '#fff',
  },
  markerTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FF6B35',
    marginTop: -2,
  },
  priceBubble: {
    position: 'absolute',
    top: height * 0.35,
    left: width * 0.35,
    backgroundColor: '#FF9500',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  priceBubbleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  filterButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  locationButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  locationButtonIcon: {
    fontSize: 18,
  },
  cardContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    height: 280,
  },
  cardList: {
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 5,
    width: width * 0.8,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  cardImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  featureTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF9500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featureText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  bedCount: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bedCountText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF9500',
    marginBottom: 6,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  activeNavItem: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  activeNavText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 2,
  },
  addButton: {
    position: 'absolute',
    bottom: 120,
    right: 20,
    backgroundColor: '#666',
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default PlantRegionMapScreen;
