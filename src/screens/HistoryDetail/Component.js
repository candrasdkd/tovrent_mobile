import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './Style';
import Icon from 'react-native-vector-icons/Ionicons';
import {historyByIdAction} from '../../redux/ActionCreators/history';
import {profileAction} from '../../redux/ActionCreators/auth';
import IconHeader from '../../components/IconHeader/Component';
import {API_URL} from '@env';

class Component extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   };
  // }

  componentDidMount() {
    if (
      this.props.route.params.historyId ||
      this.props.route.params.transactionId
    ) {
      this.props.getHistory(
        this.props.route.params.historyId ||
          this.props.route.params.transactionId,
        this.props.auth.token,
      );
    }
    this.props.getProfile(
      this.props.route.params.userId,
      this.props.auth.token,
    );
  }

  render() {
    // const convertPrice = this.props.route.params.price.toLocaleString('de-DE');
    // console.log(
    //   'test',
    //   this.props.route.params.itemPicture,
    //   this.props.history.historyId[0].picture,
    // );

    const {
      bookingCode,
      itemAmountRented,
      itemAmountDay,
      itemPicture,
      itemName,
      itemPrice,
      paymentOption,
      bookingDate,
      expiredDate,
    } = this.props.route.params;
    return (
      <>
        <IconHeader
          text="History Detail"
          route={() => this.props.navigation.goBack('HistoryScreen')}
        />
        {this.props.history.historyId.length && this.props.auth.data.length ? (
          <ScrollView>
            <View style={styles.background}>
              <View style={styles.textView}>
                {this.props.history.historyId[0].status_number === 3 ? (
                  <Text style={styles.textCode}>Payment Success!</Text>
                ) : (
                  <Text style={styles.textCode}>Wait Approved!</Text>
                )}

                <Text style={styles.textTitleCode}>Your booking code :</Text>
                <Text style={styles.textCode}>
                  {' '}
                  {this.props.history.historyId.length
                    ? this.props.history.historyId[0].booking_code
                    : bookingCode}
                </Text>
                <View style={styles.imageView}>
                  {this.props.history.historyId.length ? (
                    <Image
                      style={styles.imagesWrapper}
                      source={{
                        uri: `${API_URL}${
                          this.props.history.historyId[0].picture.split(',')[0]
                        }`,
                      }}
                    />
                  ) : (
                    <Image
                      style={styles.imagesWrapper}
                      source={{
                        uri: `${API_URL}${itemPicture}`,
                      }}
                    />
                  )}
                </View>
                <View style={styles.textOrder}>
                  <Text style={styles.textVehicle}>
                    {this.props.history.historyId.length
                      ? this.props.history.historyId[0].quantity
                      : itemAmountRented}{' '}
                    {this.props.history.historyId.length
                      ? this.props.history.historyId[0].name
                      : itemName}
                  </Text>
                  <Text style={styles.textVehicle}>
                    {this.props.history.historyId.length
                      ? this.props.history.historyId[0].method_payment
                      : paymentOption}
                  </Text>
                  <Text style={styles.textVehicle}>
                    {this.props.history.historyId.length
                      ? this.props.history.historyId[0].days
                      : itemAmountDay}{' '}
                    days
                  </Text>
                  <Text style={[styles.textVehicle, styles.borderBottom]}>
                    {this.props.history.historyId.length
                      ? new Date(
                          this.props.history.historyId[0].from_date,
                        ).toLocaleDateString()
                      : bookingDate}{' '}
                    to{' '}
                    {this.props.history.historyId.length
                      ? new Date(
                          this.props.history.historyId[0].to_date,
                        ).toLocaleDateString()
                      : expiredDate}
                  </Text>
                </View>
                <Text style={styles.textUser}>
                  ID : {this.props.auth.data[0].userIdCard}
                </Text>
                <Text style={styles.textUser}>
                  {this.props.auth.data[0].userName} (
                  {this.props.auth.data[0].userEmail})
                </Text>
                <Text style={styles.textUser}>
                  {this.props.auth.data[0].userPhone}
                </Text>
                <Text style={[styles.textUser, styles.borderBottom]}>
                  {this.props.auth.data[0].userAddress}
                </Text>
                <View style={styles.priceView}>
                  <Text style={styles.textPrice}>
                    Rp.{' '}
                    {this.props.history.historyId.length
                      ? Number(
                          this.props.history.historyId[0].price,
                        ).toLocaleString('de-DE')
                      : itemPrice}
                  </Text>
                  <Icon name="information-circle" style={styles.textPrice} />
                </View>
              </View>
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

const mapStateToProps = ({auth, history}) => {
  return {
    auth,
    history,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getHistory: (params, token) => {
      dispatch(historyByIdAction(params, token));
    },
    getProfile: (params, token) => {
      dispatch(profileAction(params, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
