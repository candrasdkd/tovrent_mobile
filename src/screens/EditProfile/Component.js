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
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {API_URL} from '@env';
import {connect} from 'react-redux';
import styles from './style';
import {RadioButton} from 'react-native-paper';
import {patchUser} from '../../redux/ActionCreators/auth';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-date-picker';
import ModalCamera from '../../components/ModalCamera/Component';
import ModalScreen from '../../components/ModalScreen/Component';

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalUpload: false,
      openModalScreen: false,
      open: false,
      modalVisible: false,
      image: '',
      gender: this.props.auth.data[0].userGender,
      name: this.props.auth.data[0].userName,
      email: this.props.auth.data[0].userEmail,
      picture: this.props.auth.data[0].userPicture,
      phone: this.props.auth.data[0].userPhone,
      dob: new Date(this.props.auth.data[0].userDOB),
      address: this.props.auth.data[0].userAddress,
      cardNumber: this.props.auth.data[0].userIdCard,
    };
  }
  showModalUpload = () => {
    this.setState({openModalUpload: true});
  };
  hideModalUpload = () => {
    this.setState({openModalUpload: false});
  };
  showModalScreen = () => {
    this.setState({openModalScreen: true});
  };
  hideModalScreen = () => {
    this.setState({openModalScreen: false});
  };
  chooseGallery = () => {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropperCircleOverlay: true,
      cropping: true,
    }).then(image => {
      // console.log('result image=>', image, image.path);
      this.setState({image: image});
      this.setState({picture: image.path});
    });
  };

  chooseCamera = () => {
    ImagePicker.openCamera({
      width: 100,
      height: 100,
      cropperCircleOverlay: true,
      cropping: true,
    }).then(image => {
      // console.log('result image=>', image, image.path);
      this.setState({image: image});
      this.setState({picture: image.path});
    });
  };

  setOnVisible = () => {
    this.setState({visible: true});
  };
  setCloseDate = () => {
    this.setState({open: false});
  };
  setOpenDate = () => {
    this.setState({open: true});
  };
  setGender = value => {
    this.setState({gender: value});
  };
  setName = value => {
    this.setState({name: value});
  };
  setEmail = value => {
    this.setState({email: value});
  };
  setPhone = value => {
    this.setState({phone: value});
  };
  setAddress = value => {
    this.setState({address: value});
  };
  setDob = value => {
    this.setState({dob: new Date(value)});
  };
  setCardNumber = value => {
    this.setState({cardNumber: value});
  };

  addItem = () => {
    const params = this.props.auth.userInfo.Id;
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
    // console.log('test', this.state.picture);
    form.append('gender', this.state.gender);
    form.append('full_name', this.state.name);
    form.append('email', this.state.email);
    form.append('phone_number', this.state.phone);
    form.append(
      'dob',
      `${this.state.dob.getFullYear()}-${this.state.dob.getMonth()}-${this.state.dob.getDate()}`,
    );
    form.append('address', this.state.address);
    form.append('card_number', this.state.cardNumber);
    this.props.urlUpdate(params, form, token);
    ToastAndroid.show('Profile Updated!', ToastAndroid.SHORT);
  };
  cameraHandler = () => {
    this.chooseCamera();
    this.hideModalUpload();
  };
  galleryHandler = () => {
    this.chooseGallery();
    this.hideModalUpload();
  };
  submitHandler = () => {
    this.addItem();
    this.hideModalScreen();
  };
  render() {
    // console.log(this.props.auth.data[0].userIdCard)
    const {
      showModalUpload,
      showModalScreen,
      hideModalScreen,
      hideModalUpload,
      setOpenDate,
      setCloseDate,
      setGender,
      setName,
      setEmail,
      setPhone,
      setDob,
      setAddress,
      setCardNumber,
      cameraHandler,
      galleryHandler,
      submitHandler,
    } = this;
    return (
      <>
        {this.props.auth.data.length ? (
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.iconContainer}>
              <Icon
                name="chevron-back-outline"
                style={styles.icon}
                onPress={() => this.props.navigation.navigate('home')}
              />
              <Text style={styles.textIcon}>Update Profile</Text>
            </View>
            <View style={styles.imageContainer}>
              {this.state.picture ? (
                <Image
                  style={styles.imageProfile}
                  source={{uri: this.state.picture}}
                  // onValueChange={value => setPicture(value.target.files)}
                />
              ) : (
                <Image
                  style={styles.imageProfile}
                  source={
                    this.props.auth.data[0].userImage !== null
                      ? {
                          uri: `${API_URL}${
                            this.props.auth.data[0].userImage.split(',')[0]
                          }`,
                        }
                      : require('../../../assets/images/default-pp.png')
                  }
                />
              )}
            </View>
            <TouchableOpacity
              style={styles.editImage}
              activeOpacity={0.8}
              onPress={showModalUpload}>
              <Text style={styles.textEditImage}>+</Text>
            </TouchableOpacity>
            <ModalCamera
              modalVisible={this.state.openModalUpload}
              hideModal={hideModalUpload}
              text="Please choose upload image from :"
              cameraHandler={cameraHandler}
              galleryHandler={galleryHandler}
            />
            <RadioButton.Group
              onValueChange={newValue => setGender(newValue)}
              value={this.state.gender}>
              <View style={styles.gender}>
                <View style={styles.genderOptions}>
                  <RadioButton value={'Male'} color="#FFCD61" />
                  <Text>Male</Text>
                </View>
                <View style={styles.genderOptions}>
                  <RadioButton value={'Female'} color="#FFCD61" />
                  <Text>Female</Text>
                </View>
              </View>
            </RadioButton.Group>
            <View>
              <Text style={styles.text}>Name : </Text>
              <TextInput
                style={styles.input}
                defaultValue={this.props.auth.data[0].userName}
                placeholderTextColor="#393939"
                onChangeText={value => setName(value)}
              />
              <Text style={styles.text}>Email Adress : </Text>
              <TextInput
                style={styles.input}
                defaultValue={this.props.auth.data[0].userEmail}
                placeholderTextColor="#393939"
                onChangeText={value => setEmail(value)}
              />
              <Text style={styles.text}>Phone Number : </Text>
              <TextInput
                style={styles.input}
                defaultValue={this.props.auth.data[0].userPhone}
                placeholderTextColor="#393939"
                keyboardType="number-pad"
                onChangeText={value => setPhone(value)}
              />
              <Text style={styles.text}>Date of Birth : </Text>
              <Pressable style={styles.date} onPress={() => setOpenDate(true)}>
                <Text style={styles.textDate}>
                  {`${this.state.dob.getFullYear()} - ${this.state.dob.getMonth()} - ${this.state.dob.getDay()}`}
                </Text>
              </Pressable>
              <DatePicker
                modal
                mode="date"
                open={this.state.open}
                date={this.state.dob}
                onConfirm={date => {
                  setCloseDate(false);
                  setDob(date);
                }}
                onCancel={() => {
                  setCloseDate(false);
                }}
              />
              <Text style={styles.text}>Delivery Adress : </Text>
              <TextInput
                style={styles.input}
                defaultValue={this.props.auth.data[0].userAddress}
                placeholderTextColor="#393939"
                onChangeText={value => setAddress(value)}
              />
              <Text style={styles.text}>ID Card Number : </Text>
              <TextInput
                style={styles.input}
                defaultValue={this.props.auth.data[0].userIdCard}
                placeholderTextColor="#393939"
                keyboardType="number-pad"
                onChangeText={value => setCardNumber(value)}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={showModalScreen}>
                <Text style={styles.textButton}>Save Change</Text>
              </TouchableOpacity>
              <ModalScreen
                modalVisible={this.state.openModalScreen}
                hideModal={hideModalScreen}
                text="Are you sure save data?"
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

const mapStateToProps = ({auth}) => {
  return {
    auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    urlUpdate: (params, body, token) => {
      dispatch(patchUser(params, body, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
