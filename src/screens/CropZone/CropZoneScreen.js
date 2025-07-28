import React from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

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

const farms = [
  {
    name: 'Trang trại Cà Phê Đắk Lắk',
    owner: 'Nguyễn Văn A',
    area: '120 ha',
    location: 'Buôn Ma Thuột, Đắk Lắk',
    crops: 'Cà phê Robusta',
  },
  {
    name: 'Farm Hồ Tiêu Gia Lai',
    owner: 'Trần Thị B',
    area: '35 ha',
    location: 'Chư Sê, Gia Lai',
    crops: 'Hồ tiêu hữu cơ',
  },
  {
    name: 'Cao su Lâm Đồng',
    owner: 'HTX Cao Su 27/7',
    area: '250 ha',
    location: 'Bảo Lộc, Lâm Đồng',
    crops: 'Cao su',
  },
  {
    name: 'Trang trại Chè Kon Tum',
    owner: 'Lê Văn C',
    area: '80 ha',
    location: 'Đắk Glei, Kon Tum',
    crops: 'Chè Shan tuyết',
  },
];

const CropZoneScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🏡 Các trang trại tiêu biểu</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}>
          {farms.map((farm, index) => (
            <View key={index} style={styles.farmCard}>
              <Text style={styles.farmName}>{farm.name}</Text>
              <Text style={styles.farmOwner}>👤 Chủ: {farm.owner}</Text>
              <Text style={styles.farmArea}>📏 Diện tích: {farm.area}</Text>
              <Text style={styles.farmLocation}>📍 {farm.location}</Text>
              <Text style={styles.farmCrops}>🌾 Cây trồng: {farm.crops}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Advantages & Challenges */}
      <View>
        <View style={[styles.card, styles.halfCard]}>
          <Text style={styles.sectionTitle}>✅ Ưu thế</Text>
          {cropZone.advantages.map((advantage, index) => (
            <Text key={index} style={styles.listItem}>
              • {advantage}
            </Text>
          ))}
        </View>

        <View style={[styles.card, styles.halfCard]}>
          <Text style={styles.sectionTitle}>⚠️ Thách thức</Text>
          {cropZone.challenges.map((challenge, index) => (
            <Text key={index} style={styles.listItem}>
              • {challenge}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default CropZoneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fffe',
  },
  header: {
    backgroundColor: 'linear-gradient(135deg, #2e7d32, #4caf50)',
    backgroundColor: '#2e7d32',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 16,
  },
  zoneName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: '#e8f5e8',
    textAlign: 'center',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    minWidth: 120,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#e8f5e8',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 16,
  },
  infoGrid: {
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#2e7d32',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  infoDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginTop: 8,
  },
  seasonText: {
    fontSize: 14,
    color: '#4caf50',
    fontStyle: 'italic',
    marginTop: 8,
    textAlign: 'center',
  },
  advantageText: {
    fontSize: 14,
    color: '#4caf50',
    fontWeight: '500',
    marginTop: 8,
  },
  cropCard: {
    backgroundColor: '#f9fff9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  cropHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cropName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  cropStats: {
    alignItems: 'flex-end',
  },
  cropArea: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  cropYield: {
    fontSize: 12,
    color: '#4caf50',
    fontWeight: '600',
  },
  cropDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 12,
  },
  cropDetails: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  detailRow: {
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4caf50',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItem: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    marginBottom: 6,
  },

  horizontalScroll: {
    paddingRight: 16,
  },

  farmCard: {
    width: 250,
    backgroundColor: '#f1fff5',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#81c784',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },

  farmName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 8,
  },

  farmOwner: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
  },

  farmArea: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
  },

  farmLocation: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
  },

  farmCrops: {
    fontSize: 13,
    color: '#4caf50',
    fontWeight: '600',
    marginTop: 4,
  },  
});
