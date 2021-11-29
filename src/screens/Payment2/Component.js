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
  randomCode = () => {
    const min = Math.ceil(11111111);
    const max = Math.floor(99999999);
    const payment_code = Math.floor(Math.random() * (max - min) + min);
    return payment_code;
  };

  saveHandler = () => {
    const passedData = this.props.route.params;
    const token = this.props.auth.token;

    const body = {
      vehicle_id: passedData.itemId,
      user_id: passedData.userId,
      owner_id: passedData.ownerId,
      location: passedData.itemLocation,
      type: passedData.itemNameType,
      price: passedData.itemPrice,
      from_date: passedData.bookingDate,
      to_date: passedData.expiredDate,
      status_id: this.state.statusTransaction,
      quantity: passedData.itemAmountRented,
      method_payment: passedData.paymentOption,
      booking_code: this.randomCode(),
      days: passedData.itemAmountDay,
    };
    this.props.createHistory(body, token);
    this.props.navigation.replace('third-payment', {
      id: this.props.history.data.id,
    });
    ToastAndroid.show(
      'Successful, make payment immediately',
      ToastAndroid.SHORT,
    );
  };

  render() {
    console.log(this.state.bookingDate);
    const {
      itemPicture,
      itemName,
      itemAmountRented,
      itemAmountDay,
      itemPrice,
      paymentOption,
      bookingDate,
      expiredDate,
      cardNumber,
      fullName,
      email,
      phoneNumber,
      address,
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
              <Text style={styles.textCode}>{this.randomCode()}</Text>
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
              <Text style={styles.textUser}>ID : {cardNumber}</Text>
              <Text style={styles.textUser}>
                {fullName}&nbsp;({email})
              </Text>
              <Text style={styles.textUser}>{phoneNumber}</Text>
              <Text style={[styles.textUser, styles.borderBottom]}>
                {address}
              </Text>
              <View style={styles.priceView}>
                <Text style={styles.textPrice}>
                  Rp. {itemPrice.toLocaleString('de-DE')}
                </Text>
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
