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
import Modal from '../../components/ModalScreen/Component';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Style';
import {connect} from 'react-redux';
import {registerAction} from '../../redux/ActionCreators/auth';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      phone: '',
      password: '',
      visible: false,
      showMessage: false,
      errorMessage: '',
      modalVisible: false,
    };
  }
  showModal = () => {
    this.setState({modalVisible: true});
  };
  hideModal = () => {
    this.setState({modalVisible: false});
  };
  setEmail = text => {
    this.setState({email: text});
  };
  setPhone = text => {
    this.setState({phone: text});
  };
  setPassword = text => {
    this.setState({password: text});
  };

  errorHandler = () => {
    if (
      this.state.email === '' ||
      this.state.phone === '' ||
      this.state.password === ''
    ) {
      return this.submitHandler();
    } else {
      return this.showModal();
    }
  };
  submitHandler = () => {
    if (this.state.email.length < 1) {
      return this.setState({
        showMessage: true,
        errorMessage: 'Email is required',
      });
    }
    if (!this.state.email.includes('@')) {
      return this.setState({
        showMessage: true,
        errorMessage: 'Please input a valid email',
      });
    }
    if (this.state.phone.length < 1) {
      return this.setState({
        showMessage: true,
        errorMessage: 'Number phone is required',
      });
    }
    if (this.state.password.length < 1) {
      return this.setState({
        showMessage: true,
        errorMessage: 'Password is required',
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
        errorMessage: 'Email has registered',
      });
    }
    const form = new URLSearchParams();
    form.append('email', this.state.email);
    form.append('phone_number', this.state.phone);
    form.append('password', this.state.password);
    this.props.urlRegister(form);
    this.props.navigation.replace('login');
    ToastAndroid.show('Register has success', ToastAndroid.SHORT);
  };

  submitModal = () => {
    this.submitHandler();
    this.hideModal();
  };

  render() {
    const {
      hideModal,
      setEmail,
      setPhone,
      setPassword,
      errorHandler,
      submitModal,
    } = this;
    return (
      <>
        <StatusBar hidden={true} />
        <ImageBackground
          style={styles.imageBackground}
          resizeMode="cover"
          //We are using online image to set background
          source={require('../../../assets/images/bg-register.png')}>
          <View style={styles.background}>
            <Text style={styles.titleRegister}>LET’S HAVE SOME RIDE</Text>
            {this.state.showMessage === true ? (
              <Text style={styles.errorText}>{this.state.errorMessage}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#fff"
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Mobile Phone"
              placeholderTextColor="#fff"
              onChangeText={setPhone}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#fff"
              secureTextEntry={true}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.buttonRegister}
              // onPress={this.submitHandler}>
              onPress={errorHandler}>
              <Text style={styles.textButton}>Sign up</Text>
            </TouchableOpacity>
            <Modal
              modalVisible={this.state.modalVisible}
              hideModal={hideModal}
              text={'Are you sure save data?'}
              submitHandler={submitModal}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.buttonGoogle}
              onPress={() => this.props.navigation.navigate('home')}>
              <Text style={styles.textButton}>
                <Icon name="logo-google" size={25} /> Sign up with Google
              </Text>
            </TouchableOpacity>
            <Text style={styles.subtitleText}>
              Already have account?{' '}
              <Text
                style={styles.lineSubtitle}
                onPress={() => this.props.navigation.navigate('login')}>
                Login now
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
    urlRegister: body => {
      dispatch(registerAction(body));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
