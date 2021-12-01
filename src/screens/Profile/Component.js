import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {API_URL} from '@env';
import {connect} from 'react-redux';
import styles from './Style';
import {logoutAction, resetStateAction} from '../../redux/ActionCreators/auth';
import {getProfileAction} from '../../redux/ActionCreators/user';
import Modal from '../../components/ModalScreen/Component';
import socket from '../../components/Socket/SocketIo';
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  showModal = () => {
    this.setState({modalVisible: true});
  };

  hideModal = () => {
    this.setState({modalVisible: false});
  };

  logoutHandler = () => {
    const token = this.props.auth.token;
    this.props.logout(token);
    // this.props.navigation.replace('login');
  };

  submitHandler = () => {
    socket.off(this.props.auth.userInfo.id);
    // socket.off(`transaction_${this.props.auth.userInfo.id}`);
    this.logoutHandler();
    this.hideModal();
  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      const token = this.props.auth.token;
      const reduxAuth = this.props.auth.userInfo;
      if (token === '') {
        this.props.navigation.replace('login');
        const body = {isFulfilled: false, status: ''};
        return this.props.resetState(body);
      }
      if (token !== '') {
        this.props.getProfile(reduxAuth.id, token);

        // setTimeout(() => {
        //   this.props.resetState();
        // }, 1000);
      }
    });
  }
  componentDidUpdate() {
    if (this.props.auth.isFulfilled === true) {
      const body = {isFulfilled: false, status: ''};
      this.props.navigation.reset({
        index: 0,
        routes: [{name: 'login'}],
      });
      ToastAndroid.show('Logout has success', ToastAndroid.SHORT);
      return this.props.resetState(body);
    }
  }
  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    const reduxUser = this.props.user?.data;
    const {modalVisible} = this.state;
    const {showModal, hideModal, submitHandler} = this;
    const {
      image,
      fullName,
      email,
      gender,
      phoneNumber,
      address,
      DOB,
      cardNumber,
    } = reduxUser;
    return (
      <>
        {reduxUser ? (
          <View>
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('edit-profile', {
                    image,
                    fullName,
                    email,
                    gender,
                    phoneNumber,
                    address,
                    DOB,
                    cardNumber,
                  })
                }>
                {image ? (
                  <Image
                    style={styles.imageProfile}
                    source={{
                      uri: `${API_URL}${image.split(',')[0]}`,
                    }}
                  />
                ) : (
                  <Image
                    style={styles.imageProfile}
                    source={require('../../../assets/images/default-pp.png')}
                  />
                )}
                <Text style={styles.textEditImage}>+</Text>
              </TouchableOpacity>
              <Text style={styles.titleProfile}>
                {fullName ? fullName : email}
              </Text>
              <Text> {email}</Text>
              <Text>{phoneNumber}</Text>
            </View>
            <View style={styles.menuContainer}>
              <TouchableOpacity
                style={styles.touchContainer}
                onPress={() => this.props.navigation.navigate('favorite')}>
                <Text style={styles.textMenu}>Your favourites</Text>
                <Icon name="chevron-forward-outline" style={styles.iconMenu} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchContainer}>
                <Text style={styles.textMenu}>FAQ</Text>
                <Icon name="chevron-forward-outline" style={styles.iconMenu} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchContainer}>
                <Text style={styles.textMenu}>Help</Text>
                <Icon name="chevron-forward-outline" style={styles.iconMenu} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={styles.textMenu}
                  onPress={() => {
                    this.props.navigation.navigate('update-password');
                  }}>
                  Update password
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={showModal}>
                <Text style={styles.textMenu}>Log out</Text>
              </TouchableOpacity>
              <Modal
                modalVisible={modalVisible}
                hideModal={hideModal}
                text={'Do you want to Logout?'}
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
const mapStateToProps = ({auth, user}) => {
  return {
    auth,
    user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile: (params, token) => {
      dispatch(getProfileAction(params, token));
    },
    logout: token => {
      dispatch(logoutAction(token));
    },
    resetState: body => {
      dispatch(resetStateAction(body));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
