import React from 'react';
import {View, StyleSheet} from 'react-native';
import Background from '~/components/Background/Background';

const MainLayout = ({children}) => {
  return (
    <View style={styles.container}>
      <Background>{children}</Background>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainLayout;
