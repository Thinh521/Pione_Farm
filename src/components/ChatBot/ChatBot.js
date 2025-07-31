import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {scale} from '~/utils/scaling';
import Images from '~/assets/images/Images';
import {useNavigation} from '@react-navigation/core';

const ChatBot = ({style}) => {
  const navigation = useNavigation();

  const navigateToChatbot = () => {
    navigation.navigate('NoBottomTab', {
      screen: 'Chatbot',
    });
  };

  return (
    <TouchableOpacity
      style={[styles.chatBot, style]}
      onPress={navigateToChatbot}
      activeOpacity={0.8}>
      <FastImage
        source={Images.chat_bot}
        style={styles.image}
        resizeMode={FastImage.resizeMode.contain}
      />
    </TouchableOpacity>
  );
};

export default ChatBot;

const styles = StyleSheet.create({
  chatBot: {
    position: 'absolute',
    bottom: scale(40),
    right: scale(20),
    zIndex: 999,
  },
  image: {
    width: scale(48),
    height: scale(48),
  },
});
