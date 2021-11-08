import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './Style';
import {
  historyByIdAction,
  patchHistoryAction,
} from '../../redux/ActionCreators/history';
import {ProgressBar, Colors} from 'react-native-paper';
import Header from '../../components/IconHeader/Component';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from '../../components/ModalScreen/Component';
import {notification} from '../../components/Notification/Component';

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      userTransaction: 2,
      ownerTransaction: 3,
      // itemQuantity: this.props.history.historyId[0].quantity,
      // bookingDate: new Date(this.props.history.historyId[0].from_date),
      // expiredDate: new Date(this.props.history.historyId[0].to_date),
      // itemPrice: this.props.history.historyId[0].price,
      // email: this.props.auth.data[0].userEmail,
      // itemDay: this.props.history.historyId[0].days,
      // paymentOption: this.props.history.historyId[0].method_payment,
    };
  }
  showModal = () => {
    this.setState({modalVisible: true});
  };
  hideModal = () => {
    this.setState({modalVisible: false});
  };
  userTransaction = () => {
    this.setState({statusTransaction: 2});
  };
  ownerTransaction = () => {
    this.setState({statusTransaction: 3});
  };
  notification = () => {
    if (this.props.auth.userInfo.statusLevel === 3) {
      notification.configure();
      notification.sendChannel('1');
      notification.sendNotification(
        '1',
        'Payment Success',
        'You has success for payment',
      );
    } else {
      notification.configure();
      notification.sendChannel('2');
      notification.sendNotification(
        '2',
        'Payment Has Aceept',
        'You has accept for history',
      );
    }
  };
  saveHandler = () => {
    const bodyData = this.props.route.params;
    const params = this.props.route.params.historyId
      ? this.props.route.params.historyId
      : this.props.route.params.itemId;
    const token = this.props.auth.token;
    const body = {
      status_id:
        this.props.auth.userInfo.statusLevel === 2
          ? this.state.ownerTransaction
          : this.state.userTransaction,
    };
    // console.log(this.props.history.data);
    this.props.updateTransaction(params, body, token);
    this.props.navigation.replace('history-detail', {
      ...bodyData,
      transactionId: this.props.history.data
        ? this.props.history.data
        : this.props.route.params.historyId,
      userId: this.props.route.params.userId,
    });
    this.notification();
    ToastAndroid.show(
      'Payment has success! Wait for approved',
      ToastAndroid.SHORT,
    );
  };
  submitHandler = () => {
    this.saveHandler();
    this.hideModal();
  };
  componentDidMount() {
    console.log(this.props.route.params)
    if (this.props.route.params.historyId || this.props.history.data) {
      this.props.getHistory(
        this.props.route.params.historyId,
        this.props.auth.token,
      );
    }
  }

  render() {
    // console.log(this.props.route.params);
    const {hideModal, showModal, submitHandler} = this;
    const {modalVisible} = this.state;
    const {
      bookingCode,
      itemAmountRented,
      itemAmountDay,
      itemName,
      itemPrice,
      paymentOption,
      bookingDate,
      expiredDate,
    } = this.props.route.params;
    return (
      <>
        <Header
          text="Payment"
          route={() => this.props.navigation.navigate('HistoryScreen')}
        />
        {this.props.history.historyId.length || this.props.route.params ? (
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
                  progress={1}
                  color={Colors.red800}
                  style={styles.progress}
                />
                <Text style={styles.textProgress}>3</Text>
              </View>
              <Text style={[styles.textTitleCode, styles.textCentered]}>
                Payment Code :
              </Text>
              <Text style={[styles.numberPayment, styles.textCentered]}>
                90887620
              </Text>
              <Text style={[styles.textTime, styles.textCentered]}>
                Insert your payment code while you transfer booking order Pay
                before :
              </Text>
              <Text style={[styles.timer, styles.textCentered]}>1:59:34</Text>
              <Text style={[styles.textTitleCode, styles.textCentered]}>
                Bank account information :
              </Text>
              <Text style={[styles.bankNumber, styles.textCentered]}>
                0290-90203-345-2
              </Text>
              <Text
                style={[
                  styles.textTitleCode,
                  styles.textCentered,
                  styles.borderBottom,
                ]}>
                Vespa Rental Jogja
              </Text>
              <Text style={[styles.textTitleCode, styles.textCentered]}>
                Booking code :
                <Text style={styles.bookingNumber}>
                  {' '}
                  {this.props.history.historyId.length
                    ? this.props.history.historyId[0].booking_code
                    : bookingCode}
                </Text>
              </Text>
              <Text style={[styles.textCopy, styles.textCentered]}>
                Use booking code to pick up your vespa
              </Text>
              <TouchableOpacity activeOpacity={0.7} style={styles.buttonCopy}>
                <Text
                  style={styles.textButtonCopy}
                  onPress={() => {
                    this.props.navigation.replace('history-detail');
                  }}>
                  Copy Payment & Booking Code
                </Text>
              </TouchableOpacity>
              <View style={styles.textOrder}>
                <Text style={styles.textVehicle}>Order details :</Text>
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
              <View style={styles.priceView}>
                <Text style={styles.textPrice}>
                  Rp.{' '}
                  {this.props.history.historyId.length
                    ? Number(
                        this.props.history.historyId[0].price,
                      ).toLocaleString('de-DE')
                    : Number(itemPrice).toLocaleString('de-DE')}
                </Text>
                <Icon name="information-circle" style={styles.textPrice} />
              </View>
              {this.props.auth.userInfo.statusLevel === 2 ? (
                <>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={
                      this.props.route.params.statusHistory === 1
                        ? styles.disabledButton
                        : styles.enabledButton
                    }
                    onPress={showModal}
                    disabled={
                      this.props.route.params.statusHistory === 1 ? true : false
                    }>
                    <Text style={styles.textButton}>
                      {this.props.route.params.statusHistory === 1
                        ? 'Not Payment'
                        : 'Approved Payment'}
                    </Text>
                  </TouchableOpacity>
                  <Modal
                    modalVisible={modalVisible}
                    hideModal={hideModal}
                    text="Accept payment ?"
                    submitHandler={submitHandler}
                  />
                </>
              ) : (
                <>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.enabledButton}
                    onPress={showModal}>
                    <Text style={styles.textButton}>Finish Payment</Text>
                  </TouchableOpacity>
                  <Modal
                    modalVisible={modalVisible}
                    hideModal={hideModal}
                    text="Confirm payment ?"
                    submitHandler={submitHandler}
                  />
                </>
              )}
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
    updateTransaction: (params, body, token) => {
      dispatch(patchHistoryAction(params, body, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
