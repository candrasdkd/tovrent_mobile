import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './style';
import {patchPasswordAction} from '../../redux/ActionCreators/user';
import ModalScreen from '../../components/ModalScreen/Component';
import Header from '../../components/IconHeader/Component';
import ModalError from '../../components/ModalError/Component';

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // open: false,
      oldPass: '',
      newPass: '',
      confirmNewPass: '',
      errorMessage: '',
      showMessage: false,
      openModal: false,
      // openModalScreen: false,
      // modalVisible: false,
    };
  }

  onSubmit = () => {
    if (this.state.oldPass.length < 1) {
      return this.setState({
        showMessage: true,
        errorMessage: 'Old password must fill!',
      });
    }
    if (this.state.oldPass.length < 6) {
      return this.setState({
        showMessage: true,
        errorMessage: 'Old password must have min 6 character!',
      });
    }
    if (this.state.oldPass.length < 1) {
      return this.setState({
        showMessage: true,
        errorMessage: 'New password must fill!',
      });
    }
    if (this.state.oldPass.length < 6) {
      return this.setState({
        showMessage: true,
        errorMessage: 'New password must have min 6 character!',
      });
    }
    if (this.state.oldPass.length < 1) {
      return this.setState({
        showMessage: true,
        errorMessage: 'Confirm new password must fill!',
      });
    }
    if (this.state.newPass === this.state.oldPass) {
      return this.setState({
        showMessage: true,
        errorMessage: 'New password must different!',
      });
    }

    if (this.state.newPass !== this.state.confirmNewPass) {
      return this.setState({
        showMessage: true,
        errorMessage: 'Confirm new password not match!',
      });
    }
    if (this.state.showMessage === false) {
      this.setState({openModal: true});
    }
  };

  submitModal = () => {
    const body = {
      id: this.props.auth.userInfo.id,
      oldPass: this.state.oldPass,
      newPass: this.state.newPass,
    };
    const token = this.props.auth.token;
    this.props.updatePassword(this.props.auth.userInfo.id, body, token);
    this.setState({openModal: false});
  };

  oldPassError = () => {
    this.setState({
      showMessage: true,
      errorMessage: 'Confirm new password not match!',
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user.status === 200) {
      this.props.navigation.navigate('ProfileScreen');
      ToastAndroid.show('Password has Updated!', ToastAndroid.SHORT);
    }
    // if (prevProps.status === prevState.404) {
    //   this.oldPassError();
    // }
  }
  render() {
    const {
      oldPass,
      newPass,
      confirmNewPass,
      openModal,
      showMessage,
      errorMessage,
    } = this.state;
    const {submitModal, onSubmit} = this;
    return (
      <>
        <View>
          <Header
            text="Update Password"
            route={() => this.props.navigation.goBack('ProfileScreen')}
          />
          <View style={styles.textView}>
            <Image
              style={styles.imageProfile}
              source={require('../../../assets/images/pw.png')}
            />
            <Text style={styles.text}>Old Password : </Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={oldPass ? '#393939' : '#888888'}
              placeholder={'Input your old password'}
              secureTextEntry={true}
              onChangeText={value => this.setState({oldPass: value})}
            />
            <Text style={styles.text}>New Password : </Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={newPass ? '#393939' : '#888888'}
              placeholder={'Input your new password'}
              secureTextEntry={true}
              onChangeText={value => this.setState({newPass: value})}
            />
            <Text style={styles.text}>Confirm new password : </Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={confirmNewPass ? '#393939' : '#888888'}
              placeholder={'Input new password to confirm'}
              secureTextEntry={true}
              onChangeText={value => this.setState({confirmNewPass: value})}
            />

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={onSubmit}>
              <Text style={styles.textButton}>Confirm</Text>
            </TouchableOpacity>

            <ModalError
              modalVisible={showMessage}
              hideModal={() => this.setState({showMessage: false})}
              error={errorMessage}
              // submitHandler={submitHandler}
            />

            <ModalScreen
              modalVisible={openModal}
              hideModal={() => this.setState({openModal: false})}
              text="Are you sure update password?"
              submitHandler={submitModal}
            />
          </View>
        </View>
      </>
    );
  }
}

const mapStateToProps = ({auth, user}) => {
  return {
    auth,
    user,
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
