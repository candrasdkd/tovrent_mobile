import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './Style';
import Icon from 'react-native-vector-icons/Ionicons';
// import {useNavigation} from '@react-navigation/native';

const Component = props => {
  const {text, route} = props;
  return (
    <TouchableOpacity style={styles.header} onPress={route}>
      <Icon name="chevron-back-outline" style={styles.iconHeader} />
      <Text style={styles.textHeader}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Component;
