import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Style';
import {API_URL} from '@env';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {patchVehicleAction} from '../../redux/ActionCreators/vehicle';
import Modal from '../../components/ModalScreen/Component';
import ModalError from '../../components/ModalError/Component';

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      modalVisible: false,
      image: '',
      showMessage: false,
      errorMessage: '',
      name: this.props.vehicle.dataById[0].name,
      price: this.props.vehicle.dataById[0].price,
      picture: this.props.vehicle.dataById[0].picture.split(',')[0],
      amount: this.props.vehicle.dataById[0].quantity,
      capacity: this.props.vehicle.dataById[0].capacity,
      address: this.props.vehicle.dataById[0].address,
      changeLocation: null,
      location: this.props.vehicle.dataById[0].location_id,
    };
  }

  chooseGallery = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 300,
      cropping: true,
    }).then(image => {
      // console.log('result image=>', image, image.path);
      this.setState({image: image});
      // this.setState({picture: image.path});
    });
  };

  chooseCamera = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 300,
      cropping: true,
    }).then(image => {
      // console.log('result image=>', image, image.path);
      this.setState({image: image});
      // this.setState({picture: image.path});
    });
  };
  showModalError = () => {
    this.setState({showMessage: true});
  };
  hideModalError = () => {
    this.setState({showMessage: false});
  };
  showModal = () => {
    this.setState({modalVisible: true});
  };
  hideModal = () => {
    this.setState({modalVisible: false});
  };
  setName = value => {
    this.setState({name: value});
  };
  setPrice = value => {
    this.setState({price: value});
  };
  setAddress = value => {
    this.setState({address: value});
  };
  setLocation = value => {
    this.setState({changeLocation: value});
  };
  setCapacity = value => {
    this.setState({capacity: value});
  };
  incrementCount = () => {
    this.setState({
      amount: this.state.amount + 1,
    });
  };
  decrementCount = () => {
    this.setState({
      amount: this.state.amount - 1,
    });
  };
  saveHandler = () => {
    if (this.state.name.length < 1) {
      return this.setState({
        showMessage: true,
        errorMessage: 'Name is required !',
      });
    }
    if (!this.state.price.length > 1) {
      return this.setState({
        showMessage: true,
        errorMessage: 'Price is required !',
      });
    }
    if (this.state.address.length < 1) {
      return this.setState({
        showMessage: true,
        errorMessage: 'Please input address',
      });
    }
    if (this.state.capacity.length < 1) {
      return this.setState({
        showMessage: true,
        errorMessage: 'Capacity must more than 1',
      });
    }
    if (this.state.location === null) {
      return this.setState({
        showMessage: true,
        errorMessage: 'Please input location',
      });
    }
    const params = this.props.route.params.vehicleId;
    const token = this.props.auth.token;
    const form = new FormData();
    if (this.state.image === '') {
      form.append('picture', this.state.picture);
    } else {
      form.append('picture', {
        name: this.state.image.path,
        uri: this.state.image.path,
        type: this.state.image.mime,
      });
    }
    form.append('name', this.state.name);
    form.append('price', this.state.price);
    form.append('capacity', this.state.capacity);
    form.append('address', this.state.address);
    form.append('quantity', this.state.amount);
    form.append('city_id', this.state.changeLocation);
    this.props.updateVehicle(params, form, token);
    this.props.navigation.navigate('reservation', {editId: params});
    ToastAndroid.show('Vehicle Updated!', ToastAndroid.SHORT);
  };
  errorHandler = () => {
    if (
      this.state.name === '' ||
      this.state.price === '' ||
      this.state.location === null
    ) {
      return this.saveHandler();
    } else {
      return this.showModal();
    }
  };
  submitHandler = () => {
    this.saveHandler();
    this.hideModal();
    if (this.state.showMessage === true) {
      this.showModalError();
    }
  };
  // componentDidUpdate = () => {
  //   const params = this.props.route.params.vehicleId;
  //   if (!this.props.vehicle.isRejected) {

  //   }
  // };
  render() {
    console.log(location);
    const {
      modalVisible,
      name,
      price,
      address,
      capacity,
      picture,
      location,
      amount,
      image,
      changeLocation,
      showMessage,
      errorMessage,
    } = this.state;
    const {
      hideModalError,
      hideModal,
      setName,
      setPrice,
      setCapacity,
      setLocation,
      setAddress,
      incrementCount,
      decrementCount,
      chooseGallery,
      chooseCamera,
      errorHandler,
      submitHandler,
    } = this;
    return (
      <>
        {this.props.vehicle.dataById.length ? (
          <ScrollView>
            <View style={styles.body}>
              <TouchableOpacity>
                {image !== '' ? (
                  <Image
                    style={styles.imagesWrapper}
                    source={{uri: image.path}}
                  />
                ) : (
                  <Image
                    style={styles.imagesWrapper}
                    source={{uri: `${API_URL}${picture}`}}
                  />
                )}
              </TouchableOpacity>
              <View style={styles.iconLeft}>
                <Icon
                  name="chevron-back-outline"
                  style={styles.icon}
                  onPress={() => this.props.navigation.goBack('home')}
                />
              </View>
              <View style={styles.iconRight}>
                <TouchableOpacity onPress={chooseCamera}>
                  <Icon name="camera" style={[styles.icon, styles.upload]} />
                </TouchableOpacity>
                <TouchableOpacity onPress={chooseGallery}>
                  <Icon name="images" style={[styles.icon, styles.upload]} />
                </TouchableOpacity>
              </View>

              <View style={styles.textBody}>
                <Text style={styles.text}>Name :</Text>
                <TextInput
                  style={[styles.textInput, styles.input]}
                  defaultValue={name}
                  placeholderTextColor="#393939"
                  onChangeText={value => setName(value)}
                />
                <Text style={styles.text}>Price :</Text>
                <TextInput
                  style={[styles.textInput, styles.input]}
                  defaultValue={`${price}`}
                  placeholderTextColor="#393939"
                  onChangeText={value => setPrice(value)}
                />
                <Text style={styles.text}>Capacity :</Text>
                <TextInput
                  style={[styles.textInput, styles.input]}
                  defaultValue={`${capacity}`}
                  placeholderTextColor="#393939"
                  onChangeText={value => setCapacity(value)}
                />
                <Text style={styles.text}>Address :</Text>
                <TextInput
                  style={[styles.textInput, styles.input]}
                  defaultValue={address}
                  placeholderTextColor="#393939"
                  onChangeText={value => setAddress(value)}
                />
                <Text style={styles.text}>Location :</Text>
                <View style={styles.boxSelect}>
                  <Picker
                    selectedValue={
                      changeLocation !== null ? changeLocation : location
                    }
                    onValueChange={(itemValue, index) =>
                      setLocation(itemValue)
                    }>
                    {/* <Picker.Item label="Select location" value="" /> */}
                    <Picker.Item
                      style={styles.textInput}
                      label="Bali"
                      value={1}
                    />
                    <Picker.Item
                      style={styles.textInput}
                      label="Yogyakarta"
                      value={2}
                    />
                    <Picker.Item
                      style={styles.textInput}
                      label="Jakarta"
                      value={3}
                    />
                    <Picker.Item
                      style={styles.textInput}
                      label="Kalimantan"
                      value={4}
                    />
                    <Picker.Item
                      style={styles.textInput}
                      label="Malang"
                      value={5}
                    />
                  </Picker>
                </View>
                <View style={styles.countBox}>
                  <Text style={styles.textCount}>Update stock : </Text>
                  <View style={styles.countWrapper}>
                    <TouchableOpacity
                      onPress={() => amount > 1 && decrementCount(amount - 1)}>
                      <View style={styles.buttonCount}>
                        <Text style={styles.textButtonCount}> - </Text>
                      </View>
                    </TouchableOpacity>
                    <Text style={styles.amount}>{amount}</Text>
                    <TouchableOpacity
                      onPress={() => incrementCount(amount + 1)}>
                      <View style={styles.buttonCount}>
                        <Text style={styles.textButtonCount}>+</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {this.state.showMessage === true ? (
                <ModalError
                  modalVisible={showMessage}
                  hideModal={hideModalError}
                  error={errorMessage}
                  submitHandler={submitHandler}
                />
              ) : // <Text style={styles.errorText}>{this.state.errorMessage}</Text>
              null}
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={errorHandler}>
                <Text style={styles.reservationText}>Update Item</Text>
              </TouchableOpacity>
              <Modal
                modalVisible={modalVisible}
                hideModal={hideModal}
                text="Are you sure change data ?"
                submitHandler={submitHandler}
              />
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
    updateVehicle: (params, body, token) => {
      dispatch(patchVehicleAction(params, body, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
