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
import Icon from 'react-native-vector-icons/Ionicons';
import style from './Style';
import {connect} from 'react-redux';
import {loginAction} from '../../redux/ActionCreators/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showMessage: false,
      errorMessage: '',
    };
  }

  handleEmail = text => {
    this.setState({email: text});
  };
  handlePassword = text => {
    this.setState({password: text});
  };

  submitHandler = () => {
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
    if (this.props.auth.error) {
      this.setState({
        showMessage: true,
        errorMessage: 'Invalid E-mail or Password!',
      });
    }
    const form = new URLSearchParams();
    form.append('email', this.state.email);
    form.append('password', this.state.password);
    this.props.urlLogin(form);

    ToastAndroid.show('Login has success', ToastAndroid.SHORT);
  };
  componentDidUpdate() {
    if (this.props.auth.token !== '') {
      return this.props.navigation.replace('home');
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
              onChangeText={this.handleEmail}
            />
            <TextInput
              style={style.input}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor="#fff"
              onChangeText={this.handlePassword}
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
              onPress={this.submitHandler}>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
