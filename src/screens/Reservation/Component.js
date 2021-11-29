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
// import {getVehicleByIdAction} from '../../redux/ActionCreators/vehicle';
// import {io} from 'socket.io-client';
import {getVehicleById} from '../../utils/https/vehicle';

class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      reserveDate: 'Select Date',
      duration: 1,
      count: 1,
      open: false,
      name: '',
      room: '',
      showMessage: false,
      errorMessage: '',
    };
  }

  // errorHandler = () => {
  //   if (this.state.count === passedData.quantity) {
  //     this.setState({showMessage: true});
  //   }
  // };
  // [room] = useState(`${props.vehicle.dataById.id}`);
  // [name] = useState(`${props.auth.data.userName}`);

  // joinRoom = () => {
  //   if (this.state.name !== '' && this.state.room !== '') {
  //     this.socket.emit('join_room', this.state.room);
  //   }
  //   if (!this.props.auth.token) {
  //     this.props.navigation.navigate('login');
  //   } else {
  //     this.props.navigation.navigate('detail-chat');
  //   }
  // };

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
    const passedData = this.state.data;
    if (this.state.reserveDate === 'Select Date') {
      return ToastAndroid.show(
        'Please select date to reserve!',
        ToastAndroid.SHORT,
      );
    }
    if (!this.props.auth.token) {
      return this.props.navigation.navigate('login');
    }
    if (this.props.auth.token) {
      return this.props.navigation.navigate('first-payment', {
        userId: this.props.auth.userInfo.id,
        ownerId: passedData.ownerId,
        itemId: passedData.id,
        itemLocation: passedData.city,
        itemNameType: passedData.type,
        itemName: passedData.name,
        itemAmountRented: this.state.count,
        itemPrice: this.state.count * passedData.price * this.state.duration,
        bookingDate: this.formatDate(this.addDays(this.state.reserveDate, 0)),
        expiredDate: this.formatDate(
          this.addDays(this.state.reserveDate, this.state.duration),
        ),
        itemPicture: String(passedData.image).split(',')[0],
        itemAmountDay: this.state.duration,
      });
    }
  };
  componentDidMount() {
    // this.socket = io(`${API_URL}`);
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      const {itemId} = this.props.route.params;
      console.log(itemId);
      if (itemId) {
        getVehicleById(itemId)
          .then(({data}) => {
            console.log(data);
            this.setState({
              data: data.result[0],
            });
          })
          .catch(err => {
            console.log(String(err).includes(404));
            this.setState({
              error: String(err).includes(404),
            });
          });
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
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    const {reserveDate, data, duration, count, open} = this.state;
    const {joinRoom, onPressHandler} = this;
    return (
      <>
        {!data && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
        {data && (
          <ScrollView>
            <View style={styles.body}>
              <Image
                style={styles.bgReservation}
                resizeMethod="resize"
                source={{
                  uri: `${API_URL}${String(data.image).split(',')[0]}`,
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
                  <Text style={styles.titleText}>
                    {data.name}
                    {'\n'}
                    Rp.{' '}
                    {Number(count * data.price * duration).toLocaleString(
                      'de-DE',
                    )}
                    /day
                  </Text>
                  <Text style={styles.subtitleText}>
                    Max for {data.capacity} person
                  </Text>
                  <Text style={styles.subtitleText}>No prepayment</Text>
                  <Text
                    style={
                      data.quantity > 0
                        ? styles.availableTxt
                        : styles.notAvailableTxt
                    }>
                    {data.quantity > 0 ? 'Available' : 'Not Available'}
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
                  {data.address},{data.city}
                </Text>
              </View>
              <View style={styles.locationWrapper}>
                <Icon name="man" style={styles.iconLocation} />
                <Text style={styles.textLocation}>
                  3.2 miles from your location
                </Text>
              </View>
              {count === data.quantity
                ? ToastAndroid.show('Quantity has maximum!', ToastAndroid.SHORT)
                : null}
              <View style={styles.countBox}>
                <Text style={styles.textCount}>Select quantity : </Text>
                <View style={styles.countWrapper}>
                  <TouchableOpacity
                    onPress={() =>
                      count > 1 &&
                      this.setState({
                        count: count - 1,
                      })
                    }>
                    <View style={styles.buttonCount}>
                      <Text style={styles.textButtonCount}> - </Text>
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.amount}>{count}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      count < data.quantity &&
                      this.setState({
                        count: count + 1,
                      })
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
                  onPress={() => this.setState({open: true})}>
                  <Text style={styles.textDate}>
                    {typeof reserveDate === 'object'
                      ? ` ${new Date(reserveDate).toLocaleDateString(
                          undefined,
                          options,
                        )}`
                      : reserveDate}
                  </Text>
                </Pressable>
                <DatePicker
                  modal
                  mode="date"
                  open={open}
                  date={
                    typeof reserveDate === 'object' ? reserveDate : new Date()
                  }
                  onConfirm={date => {
                    this.setState({open: false});
                    this.setState({reserveDate: date});
                  }}
                  onCancel={() => {
                    this.setState({open: false});
                  }}
                />
                <View style={styles.selectBox}>
                  <Picker
                    selectedValue={duration}
                    onValueChange={(itemValue, index) =>
                      this.setState({duration: itemValue})
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
              {data.ownerId === this.props.auth.userInfo.id ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={
                    data.quantity > 0
                      ? styles.buttonEnabled
                      : styles.buttonDisabled
                  }
                  onPress={() =>
                    this.props.navigation.navigate('edit-vehicle', {
                      id: data.id,
                      name: data.name,
                      city_id: data.cityId,
                      city_name: data.city,
                      address: data.address,
                      image: data.image,
                      price: data.price,
                      quantity: data.quantity,
                      capacity: data.capacity,
                    })
                  }>
                  <Text style={styles.reservationText}>Edit Item</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={
                    data.quantity > 0
                      ? styles.buttonEnabled
                      : styles.buttonDisabled
                  }
                  onPress={onPressHandler}
                  disabled={data.quantity < 1 ? true : false}>
                  <Text style={styles.reservationText}>Reservation</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
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

// const mapDispatchToProps = dispatch => {
//   return {
//     getVehicle: params => {
//       dispatch(getVehicleByIdAction(params));
//     },
//   };
// };

export default connect(mapStateToProps)(Reservation);
