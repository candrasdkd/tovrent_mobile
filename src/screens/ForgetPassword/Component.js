import React from 'react';
import {
  Text,
  StatusBar,
  ImageBackground,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import style from './Style';

const Component = props => {
  return (
    <>
      <StatusBar hidden={true} />
      <ImageBackground
        style={style.imageBackground}
        resizeMode="cover"
        //We are using online image to set background
        source={require('../../../assets/images/bg-forget.png')}>
        <View style={style.background}>
          <View style={style.icon}>
            <Icon name="chevron-back-outline" color={'#fff'} size={30} />
            <Text
              style={style.iconText}
              onPress={() => props.navigation.goBack('login')}>
              Back
            </Text>
          </View>
          <Text style={style.titleForget}>THAT’S OKAY, WE GOT YOUR BACK</Text>
          <Text style={style.subtitleText}>
            Enter your email to get reset password code
          </Text>
          <TextInput
            style={style.input}
            placeholder="Enter your email adress"
            secureTextEntry={true}
            placeholderTextColor="#fff"
          />
          <TouchableOpacity activeOpacity={0.7} style={style.buttonSend}>
            <Text style={style.textButton}>Send Code</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={style.buttonResend}>
            <Text style={style.textButton}>Resend Code</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
};

export default Component;
