import React from 'react';
import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';
import {
  DateIcon,
  SliceIcon,
  TemperatureIcon,
  WarningIcon,
} from '~/assets/icons/Icons';

const ITEM_SPACING = scale(16);

const CropsSection = ({cropZone}) => {
  const {width: windowWidth} = useWindowDimensions();
  const itemWidth = windowWidth * 0.9;
  const scrollX = new Animated.Value(0);

  const renderItem = ({item: crop, index}) => {
    const inputRange = [
      (index - 1) * (itemWidth + ITEM_SPACING),
      index * (itemWidth + ITEM_SPACING),
      (index + 1) * (itemWidth + ITEM_SPACING),
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 1, 0.7],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[
          {
            width: itemWidth,
            marginLeft: index === 0 ? 20 : 0,
            marginRight: index === cropZone.crops.length - 1 ? 0 : ITEM_SPACING,
            transform: [{scale}],
            opacity,
          },
        ]}>
        <TouchableOpacity activeOpacity={0.95}>
          <LinearGradient
            colors={[Colors.white, '#f8fffe']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.cropCard}>
            <LinearGradient
              colors={['#4CAF50', '#45a049']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.cropHeaderGradient}>
              <View style={styles.cropHeader}>
                <View style={styles.cropTitleContainer}>
                  <Text style={styles.cropName}>{crop.name}</Text>
                  <View style={styles.cropBadge}>
                    <Text style={styles.cropBadgeText}>Chủ lực</Text>
                  </View>
                </View>
                <View style={styles.cropStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{crop.area}</Text>
                    <Text style={styles.statLabel}>Diện tích</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{crop.yield}</Text>
                    <Text style={styles.statLabel}>Năng suất</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>

            <View style={styles.descriptionContainer}>
              <Text style={styles.cropDescription} numberOfLines={2}>
                {crop.description}
              </Text>
            </View>

            <View style={styles.cropDetails}>
              <DetailRow
                icon={<DateIcon />}
                label="Mùa vụ"
                value={crop.season}
              />
              <DetailRow
                icon={<TemperatureIcon />}
                label="Yêu cầu"
                value={crop.requirements}
              />
              <DetailRow
                icon={<SliceIcon />}
                label="Kỹ thuật"
                value={crop.techniques}
              />
              <DetailRow
                icon={<WarningIcon />}
                label="Sâu bệnh"
                value={crop.diseases}
              />
            </View>

            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <LinearGradient
                  colors={['#4CAF50', '#8BC34A']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={[styles.progressFill, {width: '75%'}]}
                />
              </View>
              <Text style={styles.progressText}>Phát triển tốt</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.sectionHeader]}>
        <View style={styles.sectionTitleContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.sectionIcon}>🌾</Text>
          </View>
          <View>
            <Text style={styles.sectionTitle}>Cây trồng chủ lực</Text>
            <Text style={styles.sectionSubtitle}>
              {cropZone.crops?.length || 0} loại cây trồng
            </Text>
          </View>
        </View>
      </View>

      <Animated.FlatList
        data={cropZone.crops}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth + ITEM_SPACING}
        decelerationRate="fast"
        snapToAlignment="start"
        contentContainerStyle={styles.listContainer}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
        getItemLayout={(_, index) => ({
          length: itemWidth + ITEM_SPACING,
          offset: (itemWidth + ITEM_SPACING) * index,
          index,
        })}
      />

      {/* Dots indicator */}
      <View style={styles.dotsContainer}>
        {cropZone.crops?.map((_, index) => (
          <View key={index} style={styles.dot} />
        ))}
      </View>
    </View>
  );
};

const DetailRow = ({icon, label, value}) => (
  <View style={styles.detailRow}>
    <View style={styles.detailIconContainer}>
      <View style={[styles.detailIconBg]}>
        <Text style={styles.detailIcon}>{icon}</Text>
      </View>
      <View style={styles.detailContent}>
        <Text style={[styles.detailLabel]} numberOfLines={1}>
          {label}
        </Text>
        <Text style={styles.detailValue} numberOfLines={1}>
          {value}
        </Text>
      </View>
    </View>
  </View>
);

export default CropsSection;

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(24),
  },
  sectionHeader: {
    backgroundColor: Colors.white,
    marginHorizontal: scale(16),
    marginBottom: scale(10),
    borderRadius: scale(12),
    padding: scale(16),
    borderWidth: 1,
    borderColor: Colors.border_3,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  sectionIcon: {
    fontSize: FontSizes.xlarge,
  },
  sectionTitle: {
    color: Colors.greenText,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.bold,
    marginBottom: scale(2),
  },
  sectionSubtitle: {
    color: Colors.grayText_2,
    fontSize: FontSizes.small,
  },
  listContainer: {
    paddingRight: scale(20),
  },
  cropCard: {
    borderRadius: scale(16),
    overflow: 'hidden',
    marginVertical: scale(8),
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cropHeaderGradient: {
    paddingTop: scale(20),
    paddingBottom: scale(16),
  },
  cropHeader: {
    paddingHorizontal: scale(20),
  },
  cropTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(12),
  },
  cropName: {
    flex: 1,
    color: Colors.white,
    fontSize: FontSizes.semiLarge,
    fontWeight: FontWeights.bold,
  },
  cropBadge: {
    borderWidth: 1,
    borderRadius: scale(12),
    paddingVertical: scale(4),
    paddingHorizontal: scale(8),
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  cropBadgeText: {
    color: Colors.white,
    fontSize: FontSizes.xsmall,
    fontWeight: FontWeights.semiBold,
  },
  cropStats: {
    flexDirection: 'row',
  },
  statItem: {
    alignItems: 'center',
    marginRight: scale(24),
  },
  statValue: {
    color: Colors.white,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.bold,
  },
  statLabel: {
    marginTop: scale(2),
    fontSize: FontSizes.xsmall,
    color: 'rgba(255,255,255,0.8)',
  },
  descriptionContainer: {
    paddingHorizontal: scale(20),
    paddingVertical: scale(16),
  },
  cropDescription: {
    fontSize: FontSizes.small,
    color: Colors.grayText_2,
    lineHeight: scale(20),
    textAlign: 'justify',
  },
  cropDetails: {
    paddingHorizontal: scale(20),
    paddingBottom: scale(16),
  },
  detailRow: {
    marginBottom: scale(12),
  },
  detailIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIconBg: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
    backgroundColor: 'rgba(225, 225, 225, 0.4)',
  },
  detailIcon: {
    fontSize: scale(16),
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(2),
  },
  detailValue: {
    fontSize: FontSizes.small,
    color: Colors.grayText_2,
    lineHeight: scale(18),
  },
  progressContainer: {
    paddingHorizontal: scale(20),
    paddingBottom: scale(20),
  },
  progressBar: {
    height: scale(6),
    backgroundColor: '#E0E0E0',
    borderRadius: scale(3),
    overflow: 'hidden',
    marginBottom: scale(8),
  },
  progressFill: {
    height: '100%',
    borderRadius: scale(3),
  },
  progressText: {
    fontSize: scale(11),
    color: '#4CAF50',
    fontWeight: FontWeights.medium,
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: scale(16),
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: '#4CAF50',
    marginHorizontal: scale(4),
    opacity: 0.3,
  },
});
