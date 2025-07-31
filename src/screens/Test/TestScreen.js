import React from 'react';
import {View, Button} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import styles from './Test.styles';

const TestScreen = () => {
  const navigation = useNavigation();

  const navigateTo = screen => navigation.navigate('NoBottomTab', {screen});

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'column', gap: 20}}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
          <Button title="Trò chơi" onPress={() => navigateTo('QuizGame')} />
        </View>
      </View>
    </View>
  );
};

export default TestScreen;
