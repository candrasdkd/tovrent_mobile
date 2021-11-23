import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  Platform,
  Pressable,
} from 'react-native';
import {patchProfileAction} from '../../redux/ActionCreators/user';
import Icon from 'react-native-vector-icons/Ionicons';
import {API_URL} from '@env';
import {useSelector, useDispatch} from 'react-redux';
import styles from './style';
import {RadioButton} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import ModalCamera from '../../components/ModalCamera/Component';
import ModalScreen from '../../components/ModalScreen/Component';

const Component = props => {
  const profileData = props.route.params;
  const auth = useSelector(reduxState => reduxState.auth);
  const dispatch = useDispatch();
  const options = {year: 'numeric', month: 'long', day: 'numeric'};
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [name, setName] = useState(profileData.fullName);
  const [email, setEmail] = useState(profileData.email);
  const [phone, setPhone] = useState(profileData.phoneNumber);
  const [gender, setGender] = useState(profileData.gender);
  const [dob, setDob] = useState(new Date(profileData.DOB));
  const [address, setAddress] = useState(profileData.address);
  const [cardNumber, setCardNumber] = useState(profileData.cardNumber);
  const [openModalCamera, setOpenModalCamera] = useState(false);
  const [openModalSubmit, setOpenModalSubmit] = useState(false);
  const [displayImage, setDisplayImage] = useState(profileData.image);
  const [selectedImage, setSelectedImage] = useState('');

  const chooseGallery = () => {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropperCircleOverlay: true,
      cropping: true,
    })
      .then(image => {
        // console.log('result image=>', image, image.path, displayImage);
        setSelectedImage(image);
        setDisplayImage(image.path);
      })
      .catch(e => {
        if (e.code === 'E_PICKER_CANCELLED') {
          ToastAndroid.show('Sorry, Please try again', ToastAndroid.SHORT);
        }
      });
  };

  const chooseCamera = () => {
    ImagePicker.openCamera({
      width: 100,
      height: 100,
      cropperCircleOverlay: true,
      cropping: true,
    })
      .then(image => {
        // console.log('result image=>', image, image.path);
        setSelectedImage(image);
        setDisplayImage(image.path);
      })
      .catch(e => {
        if (e.code === 'E_PICKER_CANCELLED') {
          ToastAndroid.show('Sorry, Please try again', ToastAndroid.SHORT);
        }
      });
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShow(Platform.OS === 'ios');
    setDob(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const onSubmit = () => {
    const params = auth.userInfo.id;
    const token = auth.token;
    const form = new FormData();
    if (selectedImage !== '') {
      form.append('picture', {
        name: selectedImage.path,
        uri: selectedImage.path,
        type: selectedImage.mime,
      });
    } else {
      form.append('picture', displayImage);
    }
    form.append('gender', gender);
    form.append('full_name', name);
    form.append('email', email);
    form.append('phone_number', phone);
    form.append(
      'dob',
      `${dob.getFullYear()}-${dob.getMonth() + 1}-${dob.getDate()}`,
    );
    form.append('address', address);
    form.append('card_number', cardNumber);
    dispatch(patchProfileAction(params, form, token));
    props.navigation.navigate('ProfileScreen');
    ToastAndroid.show('Profile Updated!', ToastAndroid.SHORT);
  };
  const cameraHandler = () => {
    chooseCamera();
    setOpenModalCamera(false);
  };
  const galleryHandler = () => {
    chooseGallery();
    setOpenModalCamera(false);
  };
  const submitHandler = () => {
    onSubmit() && setOpenModalSubmit(false);
  };
  console.log('result image=>', displayImage);
  return (
    <>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.iconContainer}>
          <Icon
            name="chevron-back-outline"
            style={styles.icon}
            onPress={() => props.navigation.navigate('home')}
          />
          <Text style={styles.textIcon}>Update Profile</Text>
        </View>
        <View style={styles.imageContainer}>
          {selectedImage ? (
            <Image
              style={styles.imageProfile}
              source={{uri: displayImage}}
              // onValueChange={value => setSelectedImage(value.target.files)}
            />
          ) : (
            <Image
              style={styles.imageProfile}
              source={
                displayImage
                  ? {
                      uri: `${API_URL}${displayImage}`,
                    }
                  : require('../../../assets/images/default-pp.png')
              }
            />
          )}
        </View>
        <TouchableOpacity
          style={styles.editImage}
          activeOpacity={0.8}
          onPress={() => setOpenModalCamera(!openModalCamera)}>
          <Text style={styles.textEditImage}>+</Text>
        </TouchableOpacity>
        <ModalCamera
          modalVisible={openModalCamera}
          hideModal={() => setOpenModalCamera(false)}
          text="Please choose upload image from :"
          cameraHandler={cameraHandler}
          galleryHandler={galleryHandler}
        />
        <RadioButton.Group
          onValueChange={newValue => setGender(newValue)}
          value={gender}>
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
            defaultValue={profileData.fullName}
            placeholderTextColor={profileData.fullName ? '#393939' : '#888888'}
            placeholder={profileData.fullName ? '' : 'Input your full name'}
            onChangeText={value => setName(value)}
          />
          <Text style={styles.text}>Email Adress : </Text>
          <TextInput
            style={styles.input}
            defaultValue={profileData.email}
            placeholderTextColor={profileData.email ? '#393939' : '#888888'}
            placeholder={profileData.email ? '' : 'Input your email'}
            onChangeText={value => setEmail(value)}
          />
          <Text style={styles.text}>Phone Number : </Text>
          <TextInput
            maxLength={13}
            style={styles.input}
            keyboardType="number-pad"
            defaultValue={profileData.phoneNumber}
            placeholderTextColor={
              profileData.phoneNumber ? '#393939' : '#888888'
            }
            placeholder={
              profileData.phoneNumber ? '' : 'Input your phone number'
            }
            onChangeText={value => setPhone(value)}
          />
          <Text style={styles.text}>Date of Birth : </Text>
          <Pressable style={styles.date}>
            <Text style={styles.textDate} onPress={showDatepicker}>
              {dob.toLocaleDateString(undefined, options)}
            </Text>
          </Pressable>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dob}
              mode={mode}
              display="calendar"
              onChange={onChange}
            />
          )}

          <Text style={styles.text}>Delivery Adress : </Text>
          <TextInput
            multiline={true}
            style={styles.input}
            defaultValue={profileData.address}
            placeholderTextColor={profileData.address ? '#393939' : '#888888'}
            placeholder={profileData.address ? '' : 'Input your address'}
            onChangeText={value => setAddress(value)}
          />
          <Text style={styles.text}>ID Card Number : </Text>
          <TextInput
            style={styles.input}
            defaultValue={profileData.cardNumber}
            placeholderTextColor={
              profileData.cardNumber ? '#393939' : '#888888'
            }
            placeholder={profileData.cardNumber ? '' : 'Input your card number'}
            keyboardType="number-pad"
            onChangeText={value => setCardNumber(value)}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={() => setOpenModalSubmit(true)}>
            <Text style={styles.textButton}>Save Change</Text>
          </TouchableOpacity>
          <ModalScreen
            modalVisible={openModalSubmit}
            hideModal={() => setOpenModalSubmit(false)}
            text="Are you sure save data?"
            submitHandler={submitHandler}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default Component;
