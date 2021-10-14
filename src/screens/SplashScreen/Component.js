import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import styles from './Style';

const Component = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('home');
    }, 3000);
  }, [navigation]);
  return (
    <View style={styles.background}>
      <Image source={require('../../../assets/images/splash.png')} />
      <Text style={styles.text}>TOV RENTAL</Text>
    </View>
  );
};

export default Component;
