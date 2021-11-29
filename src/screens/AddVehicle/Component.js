import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './Style';
import IconHeader from '../../components/IconHeader/Component';
import {Picker} from '@react-native-picker/picker';
import {postVehicleAction} from '../../redux/ActionCreators/vehicle';
import ModalCamera from '../../components/ModalCamera/Component';
import ModalScreen from '../../components/ModalScreen/Component';
import ModalError from '../../components/ModalError/Component';

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      name: '',
      price: '',
      capacity: '',
      address: '',
      picture: '',
      amount: 1,
      location: '',
      category: '',
      showMessage: false,
      errorMessage: '',
      openModalCameraAndGallery: false,
      openModalSubmit: false,
    };
  }

  chooseGallery = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 300,
      cropping: true,
    })
      .then(image => {
        // console.log('result image=>', image, image.path);
        this.setState({image: image});
        this.setState({picture: image.path});
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
        // console.log('result image=>', image, image.path);
        this.setState({image: image});
        this.setState({picture: image.path});
      })
      .catch(e => {
        if (e.code === 'E_PICKER_CANCELLED') {
          ToastAndroid.show('Selected has cancel', ToastAndroid.SHORT);
        }
      });
  };

  saveHandler = () => {
    const form = new FormData();
    const token = this.props.auth.token;
    form.append('picture', {
      name: this.state.image.path,
      uri: this.state.image.path,
      type: this.state.image.mime,
    });
    form.append('name', this.state.name);
    form.append('price', this.state.price);
    form.append('city_id', this.state.location);
    form.append('type_id', this.state.category);
    form.append('quantity', this.state.amount);
    form.append('user_id', this.props.auth.userInfo.id);
    this.props.createVehicles(form, token);
    this.props.navigation.navigate('home');
    ToastAndroid.show('Vehicle has added!', ToastAndroid.SHORT);
  };
  errorHandler = () => {
    if (this.state.name.length < 1) {
      return this.setState({
        showMessage: true,
        errorMessage: 'Name is Required !',
      });
    }
    if (this.state.price.length < 1) {
      return this.setState({
        showMessage: true,
        errorMessage: 'Price is Required !',
      });
    }
    if (this.state.address.length < 1) {
      return this.setState({
        showMessage: true,
        errorMessage: 'address is Required',
      });
    }
    if (this.state.capacity.length < 1) {
      return this.setState({
        showMessage: true,
        errorMessage: 'capacity must more than 1',
      });
    }
    if (this.state.category === null) {
      return this.setState({
        showMessage: true,
        errorMessage: 'category is Required',
      });
    }
    return this.setState({openModalSubmit: true});
  };
  cameraHandler = () => {
    this.chooseCamera();
    this.setState({openModalCameraAndGallery: false});
  };
  galleryHandler = () => {
    this.chooseGallery();
    this.setState({openModalCameraAndGallery: false});
  };
  submitHandler = () => {
    this.saveHandler();
    this.setState({openModalSubmit: false});
    if (this.state.showMessage === true) {
      this.setState({showMessage: false});
    }
  };
  render() {
    const {
      openModalCameraAndGallery,
      openModalSubmit,
      showMessage,
      errorMessage,
      picture,
      location,
      category,
      amount,
      image,
    } = this.state;
    const {errorHandler, cameraHandler, galleryHandler, submitHandler} = this;
    return (
      <View style={styles.container}>
        <IconHeader
          text="Add New Item"
          route={() => this.props.navigation.goBack('home')}
        />
        <ScrollView>
          <View style={styles.imageContainer}>
            <TouchableOpacity>
              {picture !== null ? (
                <Image style={styles.imageProfile} source={{uri: image.path}} />
              ) : (
                <Image
                  style={styles.imageProfile}
                  source={require('../../../assets/images/defaultImage.png')}
                />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({openModalCameraAndGallery: true})}>
            <ModalCamera
              modalVisible={openModalCameraAndGallery}
              hideModal={() =>
                this.setState({openModalCameraAndGallery: false})
              }
              text="Please choose upload image from :"
              cameraHandler={cameraHandler}
              galleryHandler={galleryHandler}
            />
            <Text style={styles.textButton}> Add pictures</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type product name min. 30 characters"
            placeholderTextColor="#9F9F9F"
            onChangeText={value => this.setState({name: value})}
          />
          <TextInput
            style={styles.input}
            placeholder="Type product price"
            placeholderTextColor="#9F9F9F"
            keyboardType="number-pad"
            onChangeText={value => this.setState({price: value})}
          />
          <Text style={styles.textInput}>Capacity :</Text>
          <TextInput
            style={styles.multiLine}
            placeholder="Please input max capacity vehicle"
            keyboardType="number-pad"
            placeholderTextColor="#9F9F9F"
            onChangeText={value => this.setState({capacity: value})}
          />
          <Text style={styles.textInput}>Address :</Text>
          <TextInput
            style={styles.multiLine}
            placeholder="Please input your address"
            placeholderTextColor="#9F9F9F"
            onChangeText={value => this.setState({address: value})}
          />
          {/* <Text style={styles.textInput}>Description</Text> */}
          {/* <TextInput
            style={styles.multiLine}
            placeholder="Describe your product min. 150 characters"
            placeholderTextColor="#9F9F9F"
            multiline={true}
            onChangeText={value => this.setState({name: value})}
          /> */}
          <Text style={styles.textInput}>Location</Text>
          <View style={styles.selectBox}>
            <Picker
              selectedValue={location}
              style={styles.textSelect}
              onValueChange={(itemValue, index) =>
                this.setState({location: itemValue})
              }>
              <Picker.Item label="Select location" value="" />
              <Picker.Item label="Bali" value={1} />
              <Picker.Item label="Yogyakarta" value={2} />
              <Picker.Item label="Jakarta" value={3} />
              <Picker.Item label="Kalimantan" value={4} />
              <Picker.Item label="Malang" value={5} />
            </Picker>
          </View>
          <Text style={styles.textInput}>Add to</Text>
          <View style={styles.selectBox}>
            <Picker
              selectedValue={category}
              style={styles.textSelect}
              onValueChange={(itemValue, index) =>
                this.setState({category: itemValue})
              }>
              <Picker.Item label="Select category" value="" />
              <Picker.Item label="Cars" value={1} />
              <Picker.Item label="Motorcycle" value={2} />
              <Picker.Item label="Bike" value={3} />
            </Picker>
          </View>
          <View style={styles.countBox}>
            <Text style={styles.textCount}>Stock : </Text>
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
          {showMessage === true ? (
            <ModalError
              modalVisible={showMessage}
              hideModal={() => this.setState({showMessage: false})}
              error={errorMessage}
              submitHandler={submitHandler}
            />
          ) : null}
          <TouchableOpacity style={styles.saveButton} onPress={errorHandler}>
            <Text style={styles.saveText}> Save Product</Text>
          </TouchableOpacity>
          <ModalScreen
            modalVisible={openModalSubmit}
            hideModal={() => this.setState({openModalSubmit: false})}
            text="Are you sure save data?"
            submitHandler={submitHandler}
          />
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              this.props.navigation.goBack('home');
            }}>
            <Text style={styles.textButton}> Cancel </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
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
    createVehicles: (body, token) => {
      dispatch(postVehicleAction(body, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
