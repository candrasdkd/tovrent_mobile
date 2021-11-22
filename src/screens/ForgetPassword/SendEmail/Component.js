import React from 'react';
import {
  Text,
  StatusBar,
  ImageBackground,
  View,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {
  sendEmailAction,
  resetStateAction,
} from '.././../../redux/ActionCreators/user';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import style from '../Style';

const SendEmail = props => {
  const reduxUser = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');

  const onSubmit = () => {
    const body = {
      email,
    };
    dispatch(sendEmailAction(body));
  };

  React.useEffect(() => {
    if (reduxUser.isFulfilled) {
      return (
        props.navigation.navigate('check-code', {
          email,
        }) && dispatch(resetStateAction())
      );
    }
    if (reduxUser.status === 404) {
      ToastAndroid.show('Email not found', ToastAndroid.SHORT);
    }
  }, [
    dispatch,
    email,
    props.navigation,
    reduxUser.isFulfilled,
    reduxUser.status,
  ]);
  return (
    <>
      <StatusBar hidden={true} />
      <ImageBackground
        style={style.imageBackground}
        resizeMode="cover"
        //We are using online image to set background
        source={require('../../../../assets/images/bg-forget.png')}>
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
            autoCorrect={false}
            placeholder="Enter your email adress"
            placeholderTextColor="#fff"
            keyboardType="email-address"
            onChangeText={text => setEmail(text)}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={style.buttonSend}
            onPress={onSubmit}>
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

export default SendEmail;
