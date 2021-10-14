import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Style';
import {connect} from 'react-redux';
import Card from '../../components/HomeCard/Component';
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
import {
  getVehicleAction,
  getBike,
  getCars,
  getMotorbike,
} from '../../redux/ActionCreators/vehicle';
import {profileAction} from '../../redux/ActionCreators/auth';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleName: '',
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
    const query = '?typeId=1';
    this.props.navigation.navigate('view-more', {query: query, title: 'Cars'});
  };

  motorbikeHandler = () => {
    const query = '?typeId=2';
    this.props.navigation.navigate('view-more', {
      query: query,
      title: 'Motorbike',
    });
  };

  bikeHandler = () => {
    const query = '?typeId=3';
    this.props.navigation.navigate('view-more', {query: query, title: 'Bike'});
  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.props.urlCars();
      this.props.urlMotorbike();
      this.props.urlBike();
      if (this.props.auth.token !== '') {
        this.props.getProfile(
          this.props.auth.userInfo.Id,
          this.props.auth.token,
        );
      }
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  render() {
    return (
      <>
        <StatusBar hidden={true} />
        {this.props.vehicle.cars.length &&
        this.props.vehicle.motorbike.length &&
        this.props.vehicle.bike.length ? (
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
              title="Cars"
              data={this.props.vehicle.cars}
              pressHandler={this.carsHandler}
            />
            <Card
              title="Motorbike"
              data={this.props.vehicle.motorbike}
              pressHandler={this.motorbikeHandler}
            />
            <Card
              title="Bike"
              data={this.props.vehicle.bike}
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
    urlVehicle: query => {
      dispatch(getVehicleAction(query));
    },
    urlCars: () => {
      dispatch(getCars());
    },
    urlMotorbike: () => {
      dispatch(getMotorbike());
    },
    urlBike: () => {
      dispatch(getBike());
    },
    getProfile: (params, token) => {
      dispatch(profileAction(params, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
