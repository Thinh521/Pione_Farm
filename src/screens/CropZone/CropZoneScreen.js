import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './CropZone.styles';
import FeaturedFarms from './components/FeaturedFarms';
import {useQuery} from '@tanstack/react-query';
import {getFarmALl} from '../../api/farmAllApi';
import {scale} from '../../utils/scaling';
import LinearGradient from 'react-native-linear-gradient';

const cropZone = {
  id: '1',
  name: 'Tây Nguyên',
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
    characteristics: 'Giàu dinh dưỡng, thoát nước tốt, chứa nhiều khoáng chất',
    depth: '1-2m',
    advantages: 'Thích hợp cho cây công nghiệp lâu năm, độ phì nhiêu cao',
  },
  crops: [
    {
      name: 'Cà phê',
      season: 'Gieo: tháng 5-6, Thu hoạch: tháng 11-1',
      area: '690,000 ha',
      yield: '18-20 tấn/ha',
      description:
        'Cây trồng chủ lực, chiếm 60% diện tích canh tác. Chủ yếu là Robusta.',
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
};

const CropZoneScreen = () => {
  const {
    data: farms,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['FarmAll'],
    queryFn: getFarmALl,
    select: res => res.data,
    staleTime: 10 * 60 * 1000,
  });

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: scale(20)}}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.zoneName}>{cropZone.name}</Text>
        <Text style={styles.location}>{cropZone.location}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{cropZone.area}</Text>
            <Text style={styles.statLabel}>Diện tích</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{cropZone.population}</Text>
            <Text style={styles.statLabel}>Dân số</Text>
          </View>
        </View>
      </View>

      {/* Climate Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🌤 Khí hậu</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Loại khí hậu:</Text>
            <Text style={styles.infoValue}>{cropZone.climate.type}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Nhiệt độ:</Text>
            <Text style={styles.infoValue}>{cropZone.climate.temperature}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Lượng mưa:</Text>
            <Text style={styles.infoValue}>{cropZone.climate.rainfall}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Độ ẩm:</Text>
            <Text style={styles.infoValue}>{cropZone.climate.humidity}</Text>
          </View>
        </View>
        <Text style={styles.seasonText}>{cropZone.climate.seasons}</Text>
      </View>

      {/* Soil Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🌱 Đặc điểm đất đai</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Loại đất:</Text>
            <Text style={styles.infoValue}>{cropZone.soil.type}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Độ pH:</Text>
            <Text style={styles.infoValue}>{cropZone.soil.ph}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Độ sâu:</Text>
            <Text style={styles.infoValue}>{cropZone.soil.depth}</Text>
          </View>
        </View>
        <Text style={styles.infoDescription}>
          {cropZone.soil.characteristics}
        </Text>
        <Text style={styles.advantageText}>✓ {cropZone.soil.advantages}</Text>
      </View>

      {/* Crops Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🌾 Cây trồng chủ lực</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}>
          {cropZone.crops.map((crop, index) => (
            <View key={index} style={styles.cropCardHorizontal}>
              <View style={styles.cropHeader}>
                <Text style={styles.cropName}>{crop.name}</Text>
                <View style={styles.cropStats}>
                  <Text style={styles.cropArea}>{crop.area}</Text>
                  <Text style={styles.cropYield}>{crop.yield}</Text>
                </View>
              </View>

              <Text style={styles.cropDescription}>{crop.description}</Text>

              <View style={styles.cropDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>📅 Mùa vụ:</Text>
                  <Text style={styles.detailValue}>{crop.season}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>🌡 Yêu cầu:</Text>
                  <Text style={styles.detailValue}>{crop.requirements}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>🔧 Kỹ thuật:</Text>
                  <Text style={styles.detailValue}>{crop.techniques}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>⚠️ Sâu bệnh:</Text>
                  <Text style={styles.detailValue}>{crop.diseases}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <FeaturedFarms farms={farms} />

      {/* Advantages & Challenges */}
      <View>
        <View style={[styles.card, styles.halfCard]}>
          <Text style={styles.sectionTitle}>Ưu thế</Text>
          {cropZone.advantages.map((advantage, index) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: scale(6),
              }}>
              <View style={styles.highlightDot} />
              <Text key={index} style={styles.listItem}>
                {advantage}
              </Text>
            </View>
          ))}
        </View>

        <View style={[styles.card, styles.halfCard]}>
          <Text style={styles.sectionTitle}>Thách thức</Text>
          {cropZone.challenges.map((challenge, index) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: scale(6),
              }}>
              <View style={styles.highlightDot} />
              <Text key={index} style={styles.listItem}>
                {challenge}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default CropZoneScreen;
