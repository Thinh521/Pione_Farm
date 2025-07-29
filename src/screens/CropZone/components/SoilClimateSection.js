import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, FontSizes, FontWeights} from '../../../theme/theme';
import {scale} from '../../../utils/scaling';

const SoilClimateSection = ({cropZone}) => {
  return (
    <>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Đặc điểm đất đai</Text>
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
        <Text style={styles.advantageText} numberOfLines={2}>
          ✓ {cropZone.soil.characteristics}
        </Text>
        <Text style={styles.advantageText} numberOfLines={2}>
          ✓ {cropZone.soil.advantages}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Khí hậu</Text>
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
    </>
  );
};

export default SoilClimateSection;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: scale(16),
    marginBottom: scale(16),
    borderRadius: scale(10),
    padding: scale(20),
    borderWidth: 1,
    borderColor: Colors.border_3,
  },
  sectionTitle: {
    color: Colors.greenText,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.bold,
    marginBottom: scale(10),
  },
  infoGrid: {
    marginBottom: scale(12),
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scale(6),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    color: Colors.title,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.medium,
  },
  infoValue: {
    flex: 1,
    textAlign: 'right',
    color: Colors.greenText,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
  },
  advantageText: {
    marginTop: scale(8),
    color: Colors.greenText,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.medium,
  },
  seasonText: {
    fontSize: 14,
    color: '#4caf50',
    fontStyle: 'italic',
    marginTop: 8,
    textAlign: 'center',
  },
});
