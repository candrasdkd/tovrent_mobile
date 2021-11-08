import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {API_URL} from '@env';
import {connect} from 'react-redux';
import styles from './Style';
import {profileAction, logoutAction} from '../../redux/ActionCreators/auth';
import Modal from '../../components/ModalScreen/Component';

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
  };

  submitModal = () => {
    this.logoutHandler();
    this.hideModal();
  };

  componentDidMount() {
    const params = this.props.auth.userInfo.userId;
    const token = this.props.auth.token;
    if (!this.props.auth.token) {
      this.props.navigation.replace('login');
    } else {
      this.props.urlGet(params, token);
    }
  }
  componentDidUpdate() {
    if (this.props.auth.token === '') {
      this.props.navigation.replace('home');
    } 
  }
  render() {
    return (
      <>
        {this.props.auth.userInfo ? (
          <View>
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('edit-profile')}>
                {this.props.auth.userInfo.userImage ? (
                  <Image
                    style={styles.imageProfile}
                    source={{
                      uri: `${API_URL}${
                        this.props.auth.userInfo?.userImage.split(',')[0]
                      }`,
                    }}
                  />
                ) : (
                  <Image
                    style={styles.imageProfile}
                    source={require('../../../assets/images/default-pp.png')}
                  />
                )}
              </TouchableOpacity>
              <Text style={styles.titleProfile}>
                {this.props.auth.userInfo.userName}
              </Text>
              <Text> {this.props.auth.userInfo?.userEmail}</Text>
              <Text>{this.props.auth.userInfo?.userPhone}</Text>
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
              <TouchableOpacity onPress={this.showModal}>
                <Text style={styles.textMenu}>Log out</Text>
              </TouchableOpacity>
              <Modal
                modalVisible={this.state.modalVisible}
                hideModal={this.hideModal}
                text={'Do you want to Logout?'}
                submitHandler={this.submitModal}
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
    urlGet: (params, token) => {
      dispatch(profileAction(params, token));
    },
    logout: token => {
      dispatch(logoutAction(token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
