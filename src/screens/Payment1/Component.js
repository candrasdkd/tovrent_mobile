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
import {patchUser} from '../../redux/ActionCreators/auth';
import IconHeader from '../../components/IconHeader/Component';
import {Picker} from '@react-native-picker/picker';
import {ProgressBar, Colors} from 'react-native-paper';

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idCard: null,
      payment: null,
    };
  }

  setIdCard = value => {
    this.setState({idCard: value});
  };
  setPayment = value => {
    this.setState({payment: value});
  };
  // componentDidUpdate = () => {
  //   this.props.getProfile(this.props.auth.userInfo.Id, this.props.auth.token);
  // };

  render() {
    let bodyData = {...this.props.route.params};
    // console.log(this.props.auth.data);
    // const {setName, setEmail, setPhone} = this;
    return (
      <>
        <IconHeader
          text="Payment"
          route={() => this.props.navigation.goBack('reservation')}
        />
        {this.props.auth.userInfo ? (
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
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                defaultValue={this.props.auth.userInfo.userCardNumber}
                placeholder="ID card number"
                placeholderTextColor="#999999"
                keyboardType="numeric"
                onChangeText={value => this.setIdCard(value)}
              />
              <TextInput
                style={styles.input}
                defaultValue={this.props.auth.userInfo.userFullName}
                placeholder="Full Name"
                placeholderTextColor="#999999"
                // onChangeText={value => setEmail(value)}
              />
              <TextInput
                style={styles.input}
                defaultValue={this.props.auth.userInfo.userPhone}
                placeholder="Mobile phone (must be active)"
                placeholderTextColor="#999999"
                keyboardType="number-pad"
                // onChangeText={value => setPhone(value)}
              />
              <TextInput
                style={styles.input}
                defaultValue={this.props.auth.userInfo.userEmail}
                placeholder="Email address"
                placeholderTextColor="#999999"
                // onChangeText={value => setPhone(value)}
              />
              <TextInput
                style={styles.input}
                defaultValue={this.props.auth.userInfo.userAddress}
                placeholder="Location (home, office, etc.)"
                placeholderTextColor="#999999"
                // onChangeText={value => setPhone(value)}
              />
              <View style={styles.select}>
                <Picker
                  selectedValue={this.state.payment}
                  onValueChange={(itemValue, index) =>
                    this.setPayment(itemValue)
                  }>
                  <Picker.Item
                    style={styles.textSelect}
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
              <TouchableOpacity activeOpacity={0.7} style={styles.button}>
                <Text
                  style={styles.textButton}
                  onPress={() => {
                    this.props.navigation.navigate('second-payment', {
                      ...bodyData,
                      userId: this.props.auth.userInfo.userId,
                      idCard: this.props.auth.userInfo.userCardNumber,
                      userFullName: this.props.auth.userInfo.userFullName,
                      userEmail: this.props.auth.userInfo.userEmail,
                      userPhone: this.props.auth.userInfo.userPhone,
                      userAddress: this.props.auth.userInfo.userAddress,
                      paymentOption: this.state.payment,
                    });
                  }}>
                  See Order List
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
    urlUpdate: (params, body, token) => {
      dispatch(patchUser(params, body, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
