import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Dimensions, FlatList, View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import {storage} from '../../utils/storage/onboardingStorage';
import {onboardingData} from '../../data/onboardingData';
import styles from './Onboarding.styles';
import Button from '../../components/ui/Button/ButtonComponent';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = width;

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dataLength = useMemo(() => onboardingData.length, []);

  const checkOnboarding = useCallback(async () => {
    try {
      // const completed = await storage.getBoolean('hasCompletedOnboarding');
      const completed = await storage.delete('hasCompletedOnboarding');
      if (completed) {
        navigation.replace('BottomTab', {screen: 'Home'});
      }
    } catch (error) {
      console.error('Lỗi khi kiểm tra onboarding:', error);
    }
  }, [navigation]);

  useEffect(() => {
    checkOnboarding();
  }, [checkOnboarding]);

  const handleScroll = useCallback(
    ({nativeEvent}) => {
      const index = Math.round(nativeEvent.contentOffset.x / ITEM_WIDTH);
      if (index !== currentIndex) {
        setCurrentIndex(index);
      }
    },
    [currentIndex],
  );

  const goToSlide = useCallback(
    index => {
      if (index >= 0 && index < dataLength) {
        flatListRef.current?.scrollToIndex({index, animated: true});
      }
    },
    [dataLength],
  );

  const completeOnboarding = useCallback(() => {
    storage.set('hasCompletedOnboarding', true);
    navigation.replace('BottomTab', {screen: 'Home'});
  }, [navigation]);

  const renderGradientText = (text, style) => (
    <MaskedView maskElement={<Text style={style}>{text}</Text>}>
      <LinearGradient
        colors={['#00d2ff', '#f46b45']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text style={[style, {opacity: 0}]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );

  const renderItem = useCallback(
    ({item}) => (
      <View style={styles.slide}>
        <Text style={styles.welcomeText}>{item.title}</Text>
        {renderGradientText(item.title_2, styles.titleGradient)}
        <View style={styles.content}>
          <FastImage
            source={item.image}
            style={styles.image}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        keyExtractor={(_, index) => `slide-${index}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={renderItem}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        windowSize={3}
        removeClippedSubviews
      />

      <View style={styles.fixedFooter}>
        <Button.Main
          title={currentIndex === dataLength - 1 ? 'Get Started' : 'Continue'}
          onPress={
            currentIndex === dataLength - 1
              ? completeOnboarding
              : () => goToSlide(currentIndex + 1)
          }
          style={styles.continueButton}
          textStyle={styles.continueButtonText}
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;
