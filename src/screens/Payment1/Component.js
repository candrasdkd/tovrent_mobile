import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  // Pressable,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './Style';
import {getProfileAction, patchUser} from '../../redux/ActionCreators/user';
import IconHeader from '../../components/IconHeader/Component';
import {Picker} from '@react-native-picker/picker';
import {ProgressBar, Colors} from 'react-native-paper';

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: null,
      payment: null,
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      const token = this.props.auth.token;
      const reduxAuth = this.props.auth.userInfo;
      if (token) {
        this.props.getProfile(reduxAuth.id, token);
      }
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    let bodyData = this.props.route.params;
    console.log(bodyData);
    const reduxUser = this.props.user.data;
    return (
      <>
        <IconHeader
          text="Payment"
          route={() => this.props.navigation.goBack('reservation')}
        />
        {!reduxUser && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.progressView}>
            <Text style={styles.textProgress}>1</Text>
            <ProgressBar
              progress={0}
              color={Colors.red800}
              style={styles.progress}
            />
            <Text style={[styles.textProgress, styles.opacity]}>2</Text>
            <ProgressBar
              progress={0}
              color={Colors.red800}
              style={styles.progress}
            />
            <Text style={[styles.textProgress, styles.opacity]}>3</Text>
          </View>
          <View>
            <TextInput
              style={styles.input}
              defaultValue={reduxUser?.cardNumber}
              placeholder="ID card number"
              // placeholderTextColor={
              //   reduxUser.phoneNumber ? '#393939' : '#888888'
              // }
              editable={false}
              keyboardType="numeric"
              // onChangeText={value => this.setState({cardNumber: value})}
            />
            <TextInput
              style={styles.input}
              defaultValue={reduxUser?.fullName}
              placeholder="Full Name"
              placeholderTextColor="#999999"
              editable={false}
              // onChangeText={value => setEmail(value)}
            />
            <TextInput
              style={styles.input}
              defaultValue={reduxUser?.phoneNumber}
              placeholder="Mobile phone (must be active)"
              placeholderTextColor="#999999"
              keyboardType="number-pad"
              editable={false}
              // onChangeText={value => setPhone(value)}
            />
            <TextInput
              style={styles.input}
              defaultValue={reduxUser?.email}
              placeholder="Email address"
              placeholderTextColor="#999999"
              editable={false}
              // onChangeText={value => setPhone(value)}
            />
            <TextInput
              style={styles.input}
              defaultValue={reduxUser?.address}
              placeholder="Location (home, office, etc.)"
              placeholderTextColor="#999999"
              editable={false}
              // onChangeText={value => setPhone(value)}
            />
            <View style={styles.select}>
              <Picker
                selectedValue={this.state.payment}
                onValueChange={(itemValue, index) =>
                  this.setState({payment: itemValue})
                }>
                <Picker.Item
                  style={
                    this.state.payment
                      ? styles.textSelect
                      : styles.placeHolderSelected
                  }
                  label="Select Method Payment"
                  value=""
                />
                <Picker.Item
                  style={styles.textSelect}
                  label="Cash"
                  value="Cash"
                />
                <Picker.Item
                  style={styles.textSelect}
                  label="Transfer"
                  value="Transfer"
                />
                <Picker.Item
                  style={styles.textSelect}
                  label="Partial payment (include tax)"
                  value="Partial payment (include tax)"
                />
              </Picker>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate('second-payment', {
                  ...bodyData,
                  cardNumber: reduxUser.cardNumber,
                  fullName: reduxUser.fullName,
                  email: reduxUser.email,
                  phoneNumber: reduxUser.phoneNumber,
                  address: reduxUser.address,
                  paymentOption: this.state.payment,
                });
              }}>
              <Text style={styles.textButton}>See Order List</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    urlUpdate: (params, body, token) => {
      dispatch(patchUser(params, body, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
