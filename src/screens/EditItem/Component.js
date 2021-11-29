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
      name: this.props.route.params ? this.props.route.params.name : null,
      price: this.props.route.params ? this.props.route.params.price : null,
      picture: this.props.route.params ? this.props.route.params.image : null,
      amount: this.props.route.params ? this.props.route.params.quantity : null,
      capacity: this.props.route.params
        ? this.props.route.params.capacity
        : null,
      address: this.props.route.params ? this.props.route.params.address : null,
      changeLocation: this.props.route.params
        ? this.props.route.params.city_id
        : null,
      location: this.props.route.params
        ? this.props.route.params.city_id
        : null,
    };
  }

  chooseGallery = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 300,
      cropping: true,
    })
      .then(image => {
        this.setState({image: image});
      })
      .catch(e => {
        if (e.code === 'E_PICKER_CANCELLED') {
          ToastAndroid.show('Selected has cancel', ToastAndroid.SHORT);
        }
      });
  };

  chooseCamera = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 300,
      cropping: true,
    })
      .then(image => {
        this.setState({image: image});
      })
      .catch(e => {
        if (e.code === 'E_PICKER_CANCELLED') {
          ToastAndroid.show('Selected has cancel', ToastAndroid.SHORT);
        }
      });
  };

  saveHandler = () => {
    const params = this.props.route.params.id;
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
    this.props.navigation.navigate('reservation', {itemId: params});
    ToastAndroid.show('Vehicle Updated!', ToastAndroid.SHORT);
  };
  errorHandler = () => {
    if (this.state.name.length < 1) {
      return this.setState({
        showMessage: true,
        errorMessage: 'Name is required !',
      });
    }
    if (!this.state.price.length < 1) {
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
    return this.setState({modalVisible: true});
  };

  submitHandler = () => {
    this.saveHandler();
    this.setState({modalVisible: false});
    if (this.state.showMessage === true) {
      this.setState({showMessage: false});
    }
  };

  render() {
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
    const {chooseGallery, chooseCamera, errorHandler, submitHandler} = this;
    return (
      <>
        {this.props.route.params ? (
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
                    source={{uri: `${API_URL}${String(picture).split(',')[0]}`}}
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
                  onChangeText={value => this.setState({name: value})}
                />
                <Text style={styles.text}>Price :</Text>
                <TextInput
                  style={[styles.textInput, styles.input]}
                  defaultValue={`${price.toLocaleString('de-DE')}`}
                  placeholderTextColor="#393939"
                  onChangeText={value => this.setState({price: value})}
                />
                <Text style={styles.text}>Capacity :</Text>
                <TextInput
                  style={[styles.textInput, styles.input]}
                  defaultValue={`${capacity}`}
                  placeholderTextColor="#393939"
                  onChangeText={value => this.setState({capacity: value})}
                />
                <Text style={styles.text}>Address :</Text>
                <TextInput
                  style={[styles.textInput, styles.input]}
                  defaultValue={address}
                  placeholderTextColor="#393939"
                  onChangeText={value => this.setState({address: value})}
                />
                <Text style={styles.text}>Location :</Text>
                <View style={styles.boxSelect}>
                  <Picker
                    selectedValue={
                      changeLocation !== null ? changeLocation : location
                    }
                    onValueChange={(itemValue, index) =>
                      this.setState({changeLocation: itemValue})
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
                      onPress={() =>
                        amount > 1 &&
                        this.setState({
                          amount: amount - 1,
                        })
                      }>
                      <View style={styles.buttonCount}>
                        <Text style={styles.textButtonCount}> - </Text>
                      </View>
                    </TouchableOpacity>
                    <Text style={styles.amount}>{amount}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          amount: amount + 1,
                        })
                      }>
                      <View style={styles.buttonCount}>
                        <Text style={styles.textButtonCount}>+</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {showMessage === true ? (
                <ModalError
                  modalVisible={showMessage}
                  hideModal={() => this.setState({showMessage: false})}
                  error={errorMessage}
                  submitHandler={submitHandler}
                />
              ) : null}
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={errorHandler}>
                <Text style={styles.reservationText}>Update Item</Text>
              </TouchableOpacity>
              <Modal
                modalVisible={modalVisible}
                hideModal={() => this.setState({modalVisible: false})}
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
