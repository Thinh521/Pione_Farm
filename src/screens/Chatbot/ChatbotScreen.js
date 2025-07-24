import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const ChatbotScreen = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{uri: 'https://chat.openai.com'}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatbotScreen;
