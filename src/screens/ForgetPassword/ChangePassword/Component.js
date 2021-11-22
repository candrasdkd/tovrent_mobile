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
  changePasswordAction,
  resetStateAction,
} from '.././../../redux/ActionCreators/user';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import style from '../Style';

const ChangePassword = props => {
  const reduxUser = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const onSubmit = () => {
    if (password === confirmPassword) {
      const body = {
        email: props.route.params.email,
        password,
      };
      dispatch(changePasswordAction(body));
    }
  };
  React.useEffect(() => {
    if (reduxUser.isFulfilled) {
      ToastAndroid.show('Password has changed', ToastAndroid.SHORT);
      return props.navigation.replace('login') && dispatch(resetStateAction());
    }
    // if (reduxUser.status === 404) {
    //   ToastAndroid.show('Pass', ToastAndroid.SHORT);
    // }
  }, [
    dispatch,
    props.navigation,
    props.route.params.email,
    reduxUser.isFulfilled,
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
          <TextInput
            style={style.input}
            placeholder="Enter your new password"
            secureTextEntry={true}
            placeholderTextColor="#fff"
            onChangeText={text => setPassword(text)}
          />
          <TextInput
            style={style.input}
            placeholder="Confirm your new password"
            secureTextEntry={true}
            placeholderTextColor="#fff"
            onChangeText={text => setConfirmPassword(text)}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={style.buttonSend}
            onPress={onSubmit}>
            <Text style={style.textButton}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
};

export default ChangePassword;
