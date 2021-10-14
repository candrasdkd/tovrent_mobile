import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './style';
import {patchPasswordAction} from '../../redux/ActionCreators/auth';
import ModalScreen from '../../components/ModalScreen/Component';
import Header from '../../components/IconHeader/Component';

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      oldPass: '',
      newPass: '',
      showMessage: false,
      errorMessage: '',
      openModalUpload: false,
      openModalScreen: false,
      modalVisible: false,
    };
  }
  showModalUpload = () => {
    this.setState({openModalUpload: true});
  };
  hideModalUpload = () => {
    this.setState({openModalUpload: false});
  };
  showModalScreen = () => {
    this.setState({openModalScreen: true});
  };
  hideModalScreen = () => {
    this.setState({openModalScreen: false});
  };
  setOldPassword = value => {
    this.setState({oldPass: value});
  };
  setNewPassword = value => {
    this.setState({newPass: value});
  };

  updateHandler = () => {
    if (this.state.oldPass.length < 6) {
      return this.setState({
        showMessage: true,
        errorMessage: 'Password must have min 6 character!',
      });
    }
    const data = {
      id: this.props.auth.userInfo.Id,
      oldPass: this.state.oldPass,
      newPass: this.state.newPass,
    };
    const token = this.props.auth.token;
    this.props.updatePassword(this.props.auth.userInfo.Id, data, token);
    ToastAndroid.show('Password has Updated!', ToastAndroid.SHORT);
  };

  submitHandler = () => {
    this.updateHandler();
    this.hideModalScreen();
  };
  render() {
    // console.log(this.props.auth.data[0].userIdCard)
    const {
      showModalScreen,
      hideModalScreen,
      setNewPassword,
      setOldPassword,
      submitHandler,
    } = this;
    return (
      <>
        {this.props.auth.data.length ? (
          <View>
            <Header text="Update Password" />
            <View style={styles.textView}>
              <Image
                style={styles.imageProfile}
                source={require('../../../assets/images/pw.png')}
              />
              <Text style={styles.text}>Old Password : </Text>
              <TextInput
                style={styles.input}
                placeholder="Please input your old password"
                placeholderTextColor="#393939"
                secureTextEntry={true}
                onChangeText={value => setOldPassword(value)}
              />
              <Text style={styles.text}>New Password : </Text>
              <TextInput
                style={styles.input}
                placeholder="Please input your new password"
                placeholderTextColor="#393939"
                secureTextEntry={true}
                onChangeText={value => setNewPassword(value)}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={showModalScreen}>
                <Text style={styles.textButton}>Change Password</Text>
              </TouchableOpacity>
              <ModalScreen
                modalVisible={this.state.openModalScreen}
                hideModal={hideModalScreen}
                text="Are you sure update password?"
                submitHandler={submitHandler}
              />
            </View>
          </View>
        ) : (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
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
    updatePassword: (params, body, token) => {
      dispatch(patchPasswordAction(params, body, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
