import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
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
    if (this.props.auth.userInfo.authLevel === 3) {
      notification.configure();
      notification.sendChannel('1');
      notification.sendNotification(
        '1',
        'Payment Success',
        'You has success for payment',
      );
    }
    if (this.props.auth.userInfo.authLevel === 2) {
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
    const passedData = this.props.route.params.id;
    const token = this.props.auth.token;
    const body = {
      status_id:
        this.props.auth.userInfo.authLevel === 2
          ? this.state.ownerTransaction
          : this.state.userTransaction,
    };
    // console.log(this.props.history.data);
    this.props.updateTransaction(passedData, body, token);
    this.props.navigation.replace('history-detail', {id: passedData});
    if (this.props.auth.userInfo.authLevel === 3) {
      ToastAndroid.show(
        'Payment has success! Wait for approved',
        ToastAndroid.SHORT,
      );
    }
    if (this.props.auth.userInfo.authLevel === 2) {
      ToastAndroid.show('Payment has success', ToastAndroid.SHORT);
    }
    // this.notification();
  };
  submitHandler = () => {
    this.saveHandler();
    this.hideModal();
  };
  componentDidMount() {
    console.log(this.props.route.params);
    const passedData = this.props.route.params.id || this.props.history.data.id;
    if (passedData) {
      this.props.getHistory(passedData, this.props.auth.token);
    }
  }

  render() {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    const {hideModal, showModal, submitHandler} = this;
    const {modalVisible} = this.state;
    const data = this.props.history.data;
    return (
      <>
        <Header
          text="Payment"
          route={() => this.props.navigation.navigate('HistoryScreen')}
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
              <Text style={styles.bookingNumber}>&nbsp;{data.bookingCode}</Text>
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
                {data.totalQuantity}&nbsp;
                {data.vehicleName}
              </Text>
              <Text style={styles.textVehicle}>{data.paymentMethod}</Text>
              <Text style={styles.textVehicle}>
                {data.dayDuration}&nbsp;days
              </Text>
              <Text style={[styles.textVehicle, styles.borderBottom]}>
                {new Date(data.startDate).toLocaleDateString(
                  undefined,
                  options,
                )}
                &nbsp;to&nbsp;
                {new Date(data.expiredDate).toLocaleDateString(
                  undefined,
                  options,
                )}
              </Text>
            </View>
            <View style={styles.priceView}>
              <Text style={styles.textPrice}>
                Rp.{Number(data.totalPrice).toLocaleString('de-DE')}
              </Text>
              <Icon name="information-circle" style={styles.textPrice} />
            </View>
            {this.props.auth.userInfo.authLevel === 2 ? (
              <>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={
                    data.orderStatus === 1
                      ? styles.disabledButton
                      : styles.enabledButton
                  }
                  onPress={showModal}
                  disabled={data.orderStatus === 1 ? true : false}>
                  <Text style={styles.textButton}>
                    {data.orderStatus === 1
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
