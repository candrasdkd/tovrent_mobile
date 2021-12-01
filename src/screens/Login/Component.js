import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import socket from '../../components/Socket/SocketIo';
import Icon from 'react-native-vector-icons/Ionicons';
import style from './Style';
import {connect} from 'react-redux';
import {loginAction, resetStateAction} from '../../redux/ActionCreators/auth';
import PushNotification from 'react-native-push-notification';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showMessage: false,
      errorMessage: '',
    };
    this.myRef = React.createRef(true);
  }

  onSubmit = () => {
    if (this.state.email.length < 1) {
      return this.setState({
        showMessage: true,
        errorMessage: 'Email is Required',
      });
    }
    if (!this.state.email.includes('@')) {
      return this.setState({
        showMessage: true,
        errorMessage: 'Please input a Valid Email',
      });
    }
    if (this.state.password.length < 1) {
      return this.setState({
        showMessage: true,
        errorMessage: 'Password is Required',
      });
    }
    if (this.state.password.length < 6) {
      return this.setState({
        showMessage: true,
        errorMessage: 'Password must have 6 or more characters!',
      });
    }
    const body = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.urlLogin(body);
  };

  errorHandler = () => {
    this.setState({
      showMessage: true,
      errorMessage: 'Invalid E-mail or Password!',
    });
  };
  componentDidUpdate() {
    if (this.props.auth.isFulfilled === true) {
      const body = {isFulfilled: false, status: ''};
      socket.on('connect');
      socket.on(this.props.auth.userInfo.id, data => {
        PushNotification.localNotification({
          channelId: 'chat-channel',
          title: 'Chat from ' + data.senderName,
          message: data.message,
        });
      });
      // socket.on(`transaction_${this.props.auth.userInfo.id}`, data => {
      //   PushNotification.localNotification({
      //     channelId: 'transaction-channel',
      //     title: data.title,
      //     message: data.message,
      //   });
      // });
      this.props.navigation.reset({
        index: 0,
        routes: [{name: 'home'}],
      });
      this.props.resetState(body);
      ToastAndroid.show('Login has success', ToastAndroid.SHORT);
    }
    if (this.props.auth.status === 404) {
      const body = {isFulfilled: false, status: ''};
      this.errorHandler();
      this.props.resetState(body);
    }
  }
  render() {
    return (
      <>
        <StatusBar hidden={true} />
        <ImageBackground
          style={style.imageBackground}
          resizeMode="cover"
          source={require('../../../assets/images/bg-login.png')}>
          {/* <Text style={style.background}>text</Text> */}
          <View style={style.background}>
            <Text style={style.titleLogin}>LET’S EXPLORE THE WORLD</Text>
            {this.state.showMessage === true ? (
              <Text style={style.errorText}>{this.state.errorMessage}</Text>
            ) : null}
            <TextInput
              style={style.input}
              autoCorrect={false}
              placeholder="Email"
              placeholderTextColor="#fff"
              returnKeyType="next"
              onSubmitEditing={() => {
                this.secondTextInput.focus();
              }}
              blurOnSubmit={false}
              onChangeText={email => this.setState({email})}
            />
            <TextInput
              style={style.input}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor="#fff"
              ref={input => {
                this.secondTextInput = input;
              }}
              onSubmitEditing={() => this.onSubmit()}
              onChangeText={password => this.setState({password})}
            />
            <Text
              style={style.middleText}
              onPress={() => this.props.navigation.navigate('forget-password')}>
              Forget password
            </Text>
            {/* {showMessage ? <Text style={{color: 'red'}}>{errorMessage}</Text> : ''} */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={style.buttonLogin}
              onPress={this.onSubmit}>
              <Text style={style.textButton}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={style.buttonGoogle}>
              <Text style={style.textButton}>
                <Icon name="logo-google" size={25} /> Login with Google
              </Text>
            </TouchableOpacity>
            <Text style={style.subtitleText}>
              Don’t have account?{' '}
              <Text
                style={style.lineSubtitle}
                onPress={() => this.props.navigation.navigate('register')}>
                Sign up now
              </Text>
            </Text>
          </View>
        </ImageBackground>
      </>
    );
  }
}
const mapStateToProps = ({auth}) => {
  return {
    auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    urlLogin: body => {
      dispatch(loginAction(body));
    },
    resetState: body => {
      dispatch(resetStateAction(body));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
