import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  Pressable,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Style';
import {API_URL} from '@env';
import {connect} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import {getVehicleByIdAction} from '../../redux/ActionCreators/vehicle';
import {io} from 'socket.io-client';
import ModalError from '../../components/ModalError/Component';

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ReserveDate: 'Select Date',
      duration: 1,
      count: 1,
      open: false,
      name: '',
      room: '',
      showMessage: false,
      errorMessage: '',
    };
  }
  showModalError = () => {
    this.setState({showMessage: true});
  };
  hideModalError = () => {
    this.setState({showMessage: false});
  };
  setCloseDate = () => {
    this.setState({open: false});
  };
  setOpenDate = () => {
    this.setState({open: true});
  };
  setDuration = value => {
    this.setState({duration: value});
  };
  setReserveDate = value => {
    this.setState({ReserveDate: value});
  };
  incrementCount = () => {
    this.setState({
      count: this.state.count + 1,
    });
    if (this.state.count === this.props.vehicle.dataById[0].quantity) {
      return this.setState({showMessage: true});
    }
  };
  decrementCount = () => {
    this.setState({
      count: this.state.count - 1,
    });
  };
  // errorHandler = () => {
  //   if (this.state.count === this.props.vehicle.dataById[0].quantity) {
  //     this.setState({showMessage: true});
  //   }
  // };
  // [room] = useState(`${props.vehicle.dataById[0].id}`);
  // [name] = useState(`${props.auth.data[0].userName}`);

  joinRoom = () => {
    if (this.state.name !== '' && this.state.room !== '') {
      this.socket.emit('join_room', this.state.room);
    }
    if (!this.props.auth.token) {
      this.props.navigation.navigate('login');
    } else {
      this.props.navigation.navigate('detail-chat');
    }
  };

  addDays = (date, days) => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  formatDate = date => {
    return (
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    );
  };
  onPressHandler = () => {
    if (typeof ReserveDate === 'string') {
      return ToastAndroid.show(
        'Please select date to reserve!',
        ToastAndroid.SHORT,
      );
    }
    if (!this.props.auth.token) {
      return this.props.navigation.navigate('login');
    } else {
      return this.props.navigation.navigate('first-payment', {
        userId: this.props.auth.userInfo.Id,
        itemId: this.props.vehicle.dataById[0].id,
        itemName: this.props.vehicle.dataById[0].name,
        itemAmountRented: this.state.count,
        itemPrice:
          this.state.count *
          this.props.vehicle.dataById[0].price *
          this.state.duration,
        bookingDate: this.formatDate(this.addDays(this.state.ReserveDate, 0)),
        expiredDate: this.formatDate(
          this.addDays(this.state.ReserveDate, this.state.duration),
        ),
        itemPicture: this.props.vehicle.dataById[0].picture.split(',')[0],
        // model,
        itemAmountDay: this.state.duration,
      });
    }
  };
  componentDidMount() {
    this.socket = io(`${API_URL}`);
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      const {itemId, editId} = this.props.route.params;
      if (itemId) {
        this.props.getVehicle(itemId);
      }
      if (editId) {
        this.props.getVehicle(editId);
      }
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  submitHandler = () => {
    this.incrementCount();
    this.hideModalScreen();
    if (this.state.showMessage === true) {
      this.showModalError();
    }
  };
  // submitChatMessage() {
  //   this.socket.emit('chat message', this.state.chatMessage);
  //   this.setState({chatMessage: ''});
  // }
  render() {
    const {ReserveDate, duration, count, open, showMessage, errorMessage} =
      this.state;
    const {
      setDuration,
      setOpenDate,
      setCloseDate,
      setReserveDate,
      joinRoom,
      onPressHandler,
      decrementCount,
      incrementCount,
      hideModalError,
      submitHandler,
    } = this;
    return (
      <>
        {this.props.vehicle.dataById.length ? (
          <ScrollView>
            <View style={styles.body}>
              <Image
                style={styles.bgReservation}
                resizeMethod="resize"
                source={{
                  uri: `${API_URL}${
                    this.props.vehicle.dataById[0].picture.split(',')[0]
                  }`,
                }}
              />
              <View style={styles.iconLeft}>
                <Icon
                  name="chevron-back-outline"
                  style={styles.sizeIcon}
                  onPress={() => this.props.navigation.goBack('home')}
                />
              </View>
              <View style={styles.iconRight}>
                <View style={styles.textIcon}>
                  <Text>
                    4.5 <Icon name="star-outline" />
                  </Text>
                </View>
                <Icon name="heart-outline" style={styles.sizeIcon} />
              </View>

              <View style={styles.titleItem}>
                <View>
                  {/* <Text style={styles.titleText}>{props.vehicle.dataById[0].name}</Text> */}
                  <Text style={styles.titleText}>
                    {this.props.vehicle.dataById[0].name}
                    {'\n'}
                    Rp.{' '}
                    {(
                      count *
                      this.props.vehicle.dataById[0].price *
                      duration
                    ).toLocaleString('de-DE')}
                    /day
                  </Text>
                  <Text style={styles.subtitleText}>
                    Max for {this.props.vehicle.dataById[0].capacity} person
                  </Text>
                  <Text style={styles.subtitleText}>No prepayment</Text>
                  <Text
                    style={
                      this.props.vehicle.dataById[0].quantity > 0
                        ? styles.availableTxt
                        : styles.notAvailableTxt
                    }>
                    {this.props.vehicle.dataById[0].quantity > 0
                      ? 'Available'
                      : 'Not Available'}
                  </Text>
                </View>
                <Icon
                  name="chatbubble-outline"
                  style={styles.chatIcon}
                  onPress={joinRoom}
                />
              </View>
              <View style={styles.locationWrapper}>
                <Icon name="location" style={styles.iconLocation} />
                <Text style={styles.textLocation}>
                  {this.props.vehicle.dataById[0].address},
                  {this.props.vehicle.dataById[0].city}
                </Text>
              </View>
              <View style={styles.locationWrapper}>
                <Icon name="man" style={styles.iconLocation} />
                <Text style={styles.textLocation}>
                  3.2 miles from your location
                </Text>
              </View>
              {this.state.showMessage === true ? (
                <ModalError
                  modalVisible={showMessage}
                  hideModal={hideModalError}
                  error={errorMessage}
                  submitHandler={incrementCount}
                />
              ) : // <Text style={styles.errorText}>{this.state.errorMessage}</Text>
              null}
              <View style={styles.countBox}>
                <Text style={styles.textCount}>Select quantity : </Text>
                <View style={styles.countWrapper}>
                  <TouchableOpacity
                    onPress={() => count > 1 && decrementCount(count - 1)}>
                    <View style={styles.buttonCount}>
                      <Text style={styles.textButtonCount}> - </Text>
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.amount}>{count}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      count < this.props.vehicle.dataById[0].quantity &&
                      incrementCount(count + 1)
                    }>
                    <View style={styles.buttonCount}>
                      <Text style={styles.textButtonCount}>+</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.pickerWrapper}>
                <Pressable
                  style={styles.dateBox}
                  onPress={() => setOpenDate(true)}>
                  <Text style={styles.textDate}>
                    {typeof ReserveDate === 'object'
                      ? ReserveDate.toLocaleString()
                      : ReserveDate}
                  </Text>
                </Pressable>
                <DatePicker
                  modal
                  mode="date"
                  open={open}
                  date={
                    typeof ReserveDate === 'object' ? ReserveDate : new Date()
                  }
                  onConfirm={date => {
                    setCloseDate(false);
                    setReserveDate(date);
                  }}
                  onCancel={() => {
                    setCloseDate(false);
                  }}
                />
                <View style={styles.selectBox}>
                  <Picker
                    selectedValue={duration}
                    onValueChange={(itemValue, index) =>
                      setDuration(itemValue)
                    }>
                    <Picker.Item
                      style={styles.textSelect}
                      label="Select category"
                      value=""
                    />
                    <Picker.Item
                      style={styles.textSelect}
                      label="1 day"
                      value={1}
                    />
                    <Picker.Item
                      style={styles.textSelect}
                      label="2 day"
                      value={2}
                    />
                    <Picker.Item
                      style={styles.textSelect}
                      label="3 day"
                      value={3}
                    />
                  </Picker>
                </View>
              </View>
              {this.props.vehicle.dataById[0].owner ===
              this.props.auth.userInfo.Id ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={
                    this.props.vehicle.dataById[0].quantity > 0
                      ? styles.buttonEnabled
                      : styles.buttonDisabled
                  }
                  onPress={() =>
                    this.props.navigation.navigate('edit-vehicle', {
                      vehicleId: this.props.vehicle.dataById[0].id,
                    })
                  }>
                  <Text style={styles.reservationText}>Edit Item</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={
                    this.props.vehicle.dataById[0].quantity > 0
                      ? styles.buttonEnabled
                      : styles.buttonDisabled
                  }
                  onPress={onPressHandler}
                  disabled={
                    this.props.vehicle.dataById[0].quantity < 1 ? true : false
                  }>
                  <Text style={styles.reservationText}>Reservation</Text>
                </TouchableOpacity>
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

const mapStateToProps = ({auth, vehicle}) => {
  return {
    auth,
    vehicle,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getVehicle: params => {
      dispatch(getVehicleByIdAction(params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
