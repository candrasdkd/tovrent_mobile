import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import styles from './Style';
import {API_URL} from '@env';
import {getHistoryUserAction} from '../../redux/ActionCreators/history';
import {connect} from 'react-redux';

class History extends React.Component {
  // navigattionHandler = () => {
  //   if(authData.authLevel)
  // };
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      const params = this.props.auth.userInfo.id;
      const token = this.props.auth.token;
      if (!token) {
        this.props.navigation.replace('login');
      } else {
        this.props.getHistory(params, token);
      }
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  render() {
    // console.log(this.historyDetail());
    const currentDate = new Date();
    const historyData = this.props.history?.dataHistoryById;
    const authData = this.props.auth?.userInfo;
    return (
      <>
        {!historyData && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
        {historyData && (
          <View style={styles.container}>
            <Text style={styles.titleHeader}>History Order</Text>
            <ScrollView>
              <View style={styles.itemView}>
                <View style={styles.selectView}>
                  <Text style={styles.textDate}>Today</Text>
                  <Text>Select</Text>
                </View>
                {historyData.map((history, index) => {
                  if (
                    new Date(history.startDate).getTime() -
                      currentDate +
                      1 * 24 * 60 * 60 * 1000 >
                    0
                  ) {
                    return (
                      <View style={styles.dataContainer} key={index}>
                        {!history && (
                          <Text style={styles.textDate}>Data not found</Text>
                        )}
                        <TouchableOpacity
                          style={styles.cardContainer}
                          onPress={() => {
                            history.orderStatus === 1 ||
                            (authData.authLevel === 2 &&
                              history.orderStatus === 2)
                              ? this.props.navigation.navigate(
                                  'third-payment',
                                  {
                                    id: history.id,
                                  },
                                )
                              : this.props.navigation.navigate(
                                  'history-detail',
                                  {
                                    id: history.id,
                                  },
                                );
                          }}>
                          <Image
                            style={styles.card}
                            source={{
                              uri: `${API_URL}${history.picture.split(',')[0]}`,
                            }}
                          />
                        </TouchableOpacity>
                        <View style={styles.textContainer}>
                          <Text
                            style={styles.text}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            {history.vehicleName}
                          </Text>
                          <Text>
                            {new Date(history.startDate).toLocaleDateString()}{' '}
                            to{' '}
                            {new Date(history.expiredDate).toLocaleDateString()}
                          </Text>
                          <Text style={styles.text}>
                            Prepayment : Rp.
                            {Number(history.totalPrice).toLocaleString('de-DE')}
                          </Text>
                          <Text
                            style={
                              history.orderStatus !== 4
                                ? styles.status
                                : styles.returned
                            }>
                            {history.orderStatus === 1
                              ? 'Waiting for payment'
                              : ''}
                            {history.orderStatus === 2 &&
                            history.customerId === authData.id
                              ? 'Wait approved'
                              : ''}
                            {history.orderStatus === 2 &&
                            history.ownerId === authData.id
                              ? 'Has payment'
                              : ''}
                            {history.orderStatus === 3 ? 'Success payment' : ''}
                            {history.orderStatus === 4
                              ? 'Has been returned'
                              : ''}
                          </Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </View>
              <View style={styles.itemView}>
                <View style={styles.selectView}>
                  <Text style={styles.textDate}>A week ago</Text>
                  <Text>Select</Text>
                </View>
                {historyData.map((history, index) => {
                  if (
                    new Date(history.startDate).getTime() -
                      currentDate +
                      7 * 24 * 60 * 60 * 1000 >
                      0 &&
                    new Date(history.startDate).getTime() -
                      currentDate +
                      1 * 24 * 60 * 60 * 1000 <
                      0
                  ) {
                    return (
                      <View style={styles.dataContainer} key={index}>
                        <TouchableOpacity
                          style={styles.cardContainer}
                          onPress={() => {
                            history.orderStatus === 1 ||
                            (authData.authLevel === 2 &&
                              history.orderStatus === 2)
                              ? this.props.navigation.navigate(
                                  'third-payment',
                                  {
                                    id: history.id,
                                  },
                                )
                              : this.props.navigation.navigate(
                                  'history-detail',
                                  {
                                    id: history.id,
                                  },
                                );
                          }}>
                          <Image
                            style={styles.card}
                            source={{
                              uri: `${API_URL}${history.picture.split(',')[0]}`,
                            }}
                          />
                        </TouchableOpacity>
                        <View style={styles.textContainer}>
                          <Text
                            style={styles.text}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            {history.vehicleName}
                          </Text>
                          <Text>
                            {new Date(history.startDate).toLocaleDateString()}{' '}
                            to{' '}
                            {new Date(history.expiredDate).toLocaleDateString()}
                          </Text>
                          <Text style={styles.text}>
                            Prepayment : Rp.
                            {Number(history.totalPrice).toLocaleString('de-DE')}
                          </Text>
                          <Text
                            style={
                              history.orderStatus !== 4
                                ? styles.status
                                : styles.returned
                            }>
                            {history.orderStatus === 1
                              ? 'Waiting for payment'
                              : ''}
                            {history.orderStatus === 2 &&
                            history.customerId === authData.id
                              ? 'Wait approved'
                              : ''}
                            {history.orderStatus === 2 &&
                            history.ownerId === authData.id
                              ? 'Has payment'
                              : ''}
                            {history.orderStatus === 3 ? 'Success payment' : ''}
                            {history.orderStatus === 4
                              ? 'Has been returned'
                              : ''}
                          </Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </View>
              <View style={styles.itemView}>
                <View style={styles.selectView}>
                  <Text style={styles.textDate}>A month ago</Text>
                  <Text>Select</Text>
                </View>
                {historyData.map((history, index) => {
                  if (
                    new Date(history.startDate).getTime() -
                      currentDate +
                      1 * 24 * 60 * 60 * 1000 <
                    0
                  ) {
                    return (
                      <View style={styles.dataContainer} key={index}>
                        {/* {!history && (
                        <Text style={styles.textDate}>A month ago</Text>
                      )} */}
                        <TouchableOpacity
                          style={styles.cardContainer}
                          onPress={() => {
                            history.orderStatus === 1 ||
                            (authData.authLevel === 2 &&
                              history.orderStatus === 2)
                              ? this.props.navigation.navigate(
                                  'third-payment',
                                  {
                                    id: history.id,
                                  },
                                )
                              : this.props.navigation.navigate(
                                  'history-detail',
                                  {
                                    id: history.id,
                                  },
                                );
                          }}>
                          <Image
                            style={styles.card}
                            source={{
                              uri: `${API_URL}${history.picture.split(',')[0]}`,
                            }}
                          />
                        </TouchableOpacity>
                        <View style={styles.textContainer}>
                          <Text
                            style={styles.text}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            {history.vehicleName}
                          </Text>
                          <Text>
                            {new Date(history.startDate).toLocaleDateString()}{' '}
                            to{' '}
                            {new Date(history.expiredDate).toLocaleDateString()}
                          </Text>
                          <Text style={styles.text}>
                            Prepayment : Rp.
                            {Number(history.totalPrice).toLocaleString('de-DE')}
                          </Text>
                          <Text
                            style={
                              history.orderStatus !== 4
                                ? styles.status
                                : styles.returned
                            }>
                            {history.orderStatus === 1
                              ? 'Waiting for payment'
                              : ''}
                            {history.orderStatus === 2 &&
                            history.customerId === authData.id
                              ? 'Wait approved'
                              : ''}
                            {history.orderStatus === 2 &&
                            history.ownerId === authData.id
                              ? 'Has payment'
                              : ''}
                            {history.orderStatus === 3 ? 'Success payment' : ''}
                            {history.orderStatus === 4
                              ? 'Has been returned'
                              : ''}
                          </Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </View>
            </ScrollView>
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
      dispatch(getHistoryUserAction(params, token));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(History);
