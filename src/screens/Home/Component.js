import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Style';
import {connect} from 'react-redux';
import Card from '../../components/HomeCard/Component';
import Axios from 'axios';
import {API_URL} from '@env';
// import {notifikasi} from '../../components/Notification/Component';
import {
  View,
  StatusBar,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
// import {
//   getVehicleAction,
//   getBike,
//   getCars,
//   getMotorbike,
// } from '../../redux/ActionCreators/vehicle';
import {profileAction} from '../../redux/ActionCreators/auth';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleName: '',
      data: [],
      cars: [],
      motorbike: [],
      bike: [],
      popular: [],
      nextPage: null,
      nextPageCars: null,
      nextPageMotorbike: null,
      nextPageBike: null,
    };
  }
  nameHandler = text => {
    this.setState({vehicleName: text});
  };

  searchHandler = () => {
    const query = `?keyword=${this.state.vehicleName}`;
    this.props.navigation.navigate('search', {sendQuery: query});
    // if (this.props.auth.token === '') {
    //   null;
    // } else {
    //   notifikasi.configure();
    //   notifikasi.sendChannel('1');
    //   notifikasi.notificationSchedule(
    //     '1',
    //     'New Diskon',
    //     'Segera login untuk mendapatkan diskon nnya',
    //   );
    // }
  };

  carsHandler = () => {
    const query = '?type_id=1&sort=ASC&limit=10';
    this.props.navigation.navigate('view-more', {query: query, title: 'Cars'});
  };

  motorbikeHandler = () => {
    const query = '?type_id=2';
    this.props.navigation.navigate('view-more', {
      query: query,
      title: 'Motorbike',
    });
  };

  bikeHandler = () => {
    const query = '?type_id=3';
    this.props.navigation.navigate('view-more', {query: query, title: 'Bike'});
  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      const getPerType = filter => {
        Axios.get(`${API_URL}vehicles/?type_id=${filter}&limit=10`)
          .then(({data}) => {
            this.setState({data: data.result.data});
            if (filter === 1) {
              // console.log(data);
              this.setState({
                cars: data.result.data,
                nextPageCars: data.result.nextPageCars,
              });
            }
            if (filter === 2) {
              this.setState({
                motorbike: data.result.data,
                nextPageMotorbike: data.result.nextPageMotorbike,
              });
            }
            if (filter === 3) {
              this.setState({
                bike: data.result.data,
                nextPageBike: data.result.nextPageBike,
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      };

      Axios.get(`${API_URL}vehicles/popular/`)
        .then(({data}) => {
          this.setState({
            popular: data.result.data,
            nextPage: data.result.nextPage,
          });
        })
        .catch(err => {
          console.log(err);
        });
      getPerType(1);
      getPerType(2);
      getPerType(3);
      // this.props.urlCars();
      // this.props.urlMotorbike();
      // this.props.urlBike();
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  render() {
    return (
      <>
        <StatusBar hidden={true} />
        {this.state.data ? (
          <ScrollView style={styles.scrollContainer}>
            <ImageBackground
              style={styles.bgHome}
              source={require('../../../assets/images/bg-home.png')}>
              <View style={styles.backgroundHeader}>
                <View style={styles.searchSection}>
                  <TextInput
                    style={styles.input}
                    placeholder="Search Vehicle"
                    placeholderTextColor="#fff"
                    keyboardType={'email-address'}
                    onChangeText={this.nameHandler}
                  />
                  <Icon
                    name="search-outline"
                    style={styles.searchIcon}
                    onPress={this.searchHandler}
                  />
                </View>
              </View>
            </ImageBackground>
            {this.props.auth.userInfo.statusLevel === 1 ||
              (this.props.auth.userInfo.statusLevel === 2 && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.button}
                  onPress={() => this.props.navigation.navigate('add-vehicle')}>
                  <Text style={styles.textButton} onPress={this.saveHandler}>
                    Add Vehicle
                  </Text>
                </TouchableOpacity>
              ))}
            <Card
              title="Popular"
              vehicleData={this.state.popular}
              pressHandler={this.bikeHandler}
            />
            <Card
              title="Cars"
              vehicleData={this.state.cars}
              pressHandler={this.carsHandler}
            />
            <Card
              title="Motorbike"
              vehicleData={this.state.motorbike}
              pressHandler={this.motorbikeHandler}
            />
            <Card
              title="Bike"
              vehicleData={this.state.bike}
              pressHandler={this.bikeHandler}
            />
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
    // urlVehicle: query => {
    //   dispatch(getVehicleAction(query));
    // },
    // urlCars: () => {
    //   dispatch(getCars());
    // },
    // urlMotorbike: () => {
    //   dispatch(getMotorbike());
    // },
    // urlBike: () => {
    //   dispatch(getBike());
    // },
    getProfile: (params, token) => {
      dispatch(profileAction(params, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
