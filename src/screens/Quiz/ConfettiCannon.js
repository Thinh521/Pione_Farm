import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';

const ConfettiCannon = ({show}) => {
  const animationRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
    }
  }, [show]);

  useEffect(() => {
    if (visible) {
      animationRef.current?.play();
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View style={styles.centered}>
        <LottieView
          ref={animationRef}
          source={require('../../assets/animation/happy_animation.json')}
          autoPlay={false}
          loop={false}
          style={styles.animation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 300,
    height: 300,
  },
});

export default ConfettiCannon;
