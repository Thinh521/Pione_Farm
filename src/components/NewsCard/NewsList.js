import React, {useEffect, useRef} from 'react';
import {Animated, FlatList, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {scale} from '../../utils/scaling';
import {Colors} from '../../theme/theme';

const NewsList = ({data = []}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const renderItem = ({item}) => (
    <Animated.View
      style={[
        styles.card,
        {
          opacity,
          transform: [{translateY}, {scale: scaleValue}],
        },
      ]}>
      <FastImage source={item.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {item.description}
        </Text>

        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <View style={styles.metaIcon}>
              <Text style={styles.metaIconText}>📅</Text>
            </View>
            <Text style={styles.metaText}>{item.date}</Text>
          </View>

          <View style={styles.metaItem}>
            <View style={styles.metaIcon}>
              <Text style={styles.metaIconText}>⏱️</Text>
            </View>
            <Text style={styles.metaText}>{item.readTime}</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Tin tức & Thông tin</Text>
            <Text style={styles.headerSubtitle}>
              Cập nhật thông tin mới nhất về nông nghiệp
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default NewsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: scale(16),
  },
  headerContent: {
    marginBottom: scale(20),
  },
  headerTitle: {
    fontSize: scale(18),
    fontWeight: 'bold',
    marginBottom: scale(4),
    color: '#000',
  },
  headerSubtitle: {
    fontSize: scale(14),
    color: '#666',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(16),
    backgroundColor: Colors.white,
    borderRadius: scale(10),
    padding: scale(10),
    borderColor: Colors.border,
    borderWidth: 1,
  },
  image: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(10),
    marginRight: scale(12),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: scale(14),
    marginBottom: scale(4),
    color: '#000',
  },
  description: {
    fontSize: scale(12),
    color: '#555',
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(8),
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(10),
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(6),
  },
  metaIconText: {
    fontSize: scale(10),
  },
  metaText: {
    fontSize: scale(11),
    color: '#6c757d',
    fontWeight: '500',
  },
});
