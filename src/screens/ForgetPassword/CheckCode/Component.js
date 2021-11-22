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
  checkCodeAction,
  resetStateAction,
} from '.././../../redux/ActionCreators/user';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import style from '../Style';

const CheckCode = props => {
  const reduxUser = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [code, setCode] = React.useState('');
  const onSubmit = () => {
    const body = {
      email: props.route.params.email,
      code,
    };
    dispatch(checkCodeAction(body));
  };
  React.useEffect(() => {
    if (reduxUser.isFulfilled) {
      return (
        props.navigation.replace('change-password', {
          email: props.route.params.email,
        }) && dispatch(resetStateAction())
      );
    }
    if (reduxUser.status === 404) {
      ToastAndroid.show('Success', ToastAndroid.SHORT);
    }
  }, [
    dispatch,
    props.navigation,
    props.route.params.email,
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
              onPress={() => props.navigation.goBack('forget-password')}>
              Back
            </Text>
          </View>
          <Text style={style.titleForget}>THAT’S OKAY, WE GOT YOUR BACK</Text>
          <Text style={style.subtitleText}>
            Check your email box to get code
          </Text>
          <TextInput
            style={style.input}
            textAlign="center"
            placeholder="Enter your code"
            maxLength={6}
            keyboardType="number-pad"
            placeholderTextColor="#fff"
            onChangeText={text => setCode(text)}
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

export default CheckCode;
