import React from 'react';
import {View, Text, Image, ScrollView, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import styles from './Style';
import Icon from 'react-native-vector-icons/Ionicons';
import {historyByIdAction} from '../../redux/ActionCreators/history';
import {profileAction} from '../../redux/ActionCreators/auth';
import IconHeader from '../../components/IconHeader/Component';
import {API_URL} from '@env';

class Component extends React.Component {
  componentDidMount() {
    if (this.props.route.params.id) {
      this.props.getHistory(this.props.route.params.id, this.props.auth.token);
    }
  }

  render() {
    return (
      <>
        <IconHeader
          text="History Detail"
          route={() => this.props.navigation.goBack('HistoryScreen')}
        />
        {this.props.history.data ? (
          <ScrollView>
            <View style={styles.background}>
              <View style={styles.textView}>
                {this.props.history.data.orderStatus === 3 ? (
                  <Text style={styles.textCode}>Payment Success!</Text>
                ) : (
                  <Text style={styles.textCode}>Wait Approved!</Text>
                )}

                <Text style={styles.textTitleCode}>Your booking code :</Text>
                <Text style={styles.textCode}>
                  {this.props.history.data.bookingCode}
                </Text>
                <View style={styles.imageView}>
                  <Image
                    style={styles.imagesWrapper}
                    source={{
                      uri: `${API_URL}${
                        String(this.props.history.data.picture).split(',')[0]
                      }`,
                    }}
                  />
                </View>
                <View style={styles.textOrder}>
                  <Text style={styles.textVehicle}>
                    {this.props.history.data.totalQuantity}&nbsp;
                    {this.props.history.data.vehicleName}
                  </Text>
                  <Text style={styles.textVehicle}>
                    {this.props.history.data.paymentMethod}
                  </Text>
                  <Text style={styles.textVehicle}>
                    {this.props.history.data.dayDuration}&nbsp; days
                  </Text>
                  <Text style={[styles.textVehicle, styles.borderBottom]}>
                    {new Date(
                      this.props.history.data.startDate,
                    ).toLocaleDateString()}
                    &nbsp;to&nbsp;
                    {new Date(
                      this.props.history.data.expiredDate,
                    ).toLocaleDateString()}
                  </Text>
                </View>
                <Text style={styles.textUser}>
                  ID :&nbsp;{this.props.history.data.cardNumber}
                </Text>
                <Text style={styles.textUser}>
                  {this.props.history.data.customer} (
                  {this.props.history.data.email})
                </Text>
                <Text style={styles.textUser}>
                  {this.props.history.data.phoneNumber}
                </Text>
                <Text style={[styles.textUser, styles.borderBottom]}>
                  {this.props.history.data.vehicleLocation}
                </Text>
                <View style={styles.priceView}>
                  <Text style={styles.textPrice}>
                    Rp.{' '}
                    {Number(this.props.history.data.totalPrice).toLocaleString(
                      'de-DE',
                    )}
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
