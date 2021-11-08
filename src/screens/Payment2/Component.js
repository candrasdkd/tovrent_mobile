import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './Style';
import Icon from 'react-native-vector-icons/Ionicons';
import {postHistoryAction} from '../../redux/ActionCreators/history';
import IconHeader from '../../components/IconHeader/Component';
import {API_URL} from '@env';
import {ProgressBar, Colors} from 'react-native-paper';

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusTransaction: 1,
      bookingDate: new Date(this.props.route.params.bookingDate),
      expiredDate: new Date(this.props.route.params.expiredDate),
    };
  }
  generateCode = number => {
    number = 999;
    return (
      'TOV' +
      Math.floor(this.props.route.params.userId + Math.random() * number) +
      this.props.auth.token.slice(5, 7)
    );
  };
  saveHandler = () => {
    const bodyData = this.props.route.params;
    const token = this.props.auth.token;
    const body = {
      vehicle_id: this.props.route.params.itemId,
      user_id: this.props.route.params.userId,
      owner_id: this.props.route.params.ownerId,
      location: this.props.route.params.itemLocation,
      type: this.props.route.params.itemNameType,
      price: this.props.route.params.itemPrice,
      from_date: `${this.state.bookingDate.getFullYear()}-${this.state.bookingDate.getMonth()}-${this.state.bookingDate.getDate()}`,
      to_date: `${this.state.expiredDate.getFullYear()}-${this.state.expiredDate.getMonth()}-${this.state.expiredDate.getDate()}`,
      status_id: this.state.statusTransaction,
      quantity: this.props.route.params.itemAmountRented,
      method_payment: this.props.route.params.paymentOption,
      booking_code: this.generateCode,
      days: this.props.route.params.itemAmountDay,
    };
    this.props.createHistory(body, token);
    this.props.navigation.navigate('third-payment', {
      ...bodyData,
      transactionId: this.props.history.data.result,
      booking_code: this.generateCode(),
    });
    ToastAndroid.show(
      'Successful, make payment immediately',
      ToastAndroid.SHORT,
    );
  };

  render() {
    // let bodyData = {...this.props.route.params};
    const convertPrice =
      this.props.route.params.itemPrice.toLocaleString('de-DE');
    // console.log(this.props.history.data);
    const {
      itemPicture,
      itemName,
      itemAmountRented,
      itemAmountDay,
      paymentOption,
      bookingDate,
      expiredDate,
      idCard,
      userFullName,
      userEmail,
      userPhone,
      userAddress,
    } = this.props.route.params;
    return (
      <>
        <IconHeader
          text="Payment"
          route={() => this.props.navigation.goBack('first-payment')}
        />
        <ScrollView>
          <View style={styles.background}>
            <View style={styles.progressView}>
              <Text style={styles.textProgress}>1</Text>
              <ProgressBar
                progress={1}
                color={Colors.red800}
                style={styles.progress}
              />
              <Text style={styles.textProgress}>2</Text>
              <ProgressBar
                progress={0}
                color={Colors.red800}
                style={styles.progress}
              />
              <Text style={[styles.textProgress, styles.opacity]}>3</Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.textTitleCode}>Your booking code :</Text>
              <Text style={styles.textCode}>{this.generateCode()}</Text>
              <View style={styles.imageView}>
                <Image
                  style={styles.imagesWrapper}
                  source={{uri: `${API_URL}${itemPicture}`}}
                />
              </View>
              <View style={styles.textOrder}>
                <Text style={styles.textVehicle}>
                  {itemAmountRented} {itemName}
                </Text>
                <Text style={styles.textVehicle}>{paymentOption}</Text>
                <Text style={styles.textVehicle}>{itemAmountDay} days</Text>
                <Text style={[styles.textVehicle, styles.borderBottom]}>
                  {bookingDate} to {expiredDate}
                </Text>
              </View>
              <Text style={styles.textUser}>ID : {idCard}</Text>
              <Text style={styles.textUser}>
                {userFullName}({userEmail})
              </Text>
              <Text style={styles.textUser}>{userPhone}</Text>
              <Text style={[styles.textUser, styles.borderBottom]}>
                {userAddress}
              </Text>
              <View style={styles.priceView}>
                <Text style={styles.textPrice}>Rp. {convertPrice}</Text>
                <Icon name="information-circle" style={styles.textPrice} />
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={this.saveHandler}>
              <Text style={styles.textButton}>Get Payment Code</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </>
    );
  }
}

const mapStateToProps = ({auth, history}) => {
  return {
    auth,
    history,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createHistory: (body, token) => {
      dispatch(postHistoryAction(body, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
