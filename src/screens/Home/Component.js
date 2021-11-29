import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Style';
import {connect} from 'react-redux';
import Card from '../../components/HomeCard/Component';
import Axios from 'axios';
import {API_URL} from '@env';
import {
  View,
  StatusBar,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {getVehicles, getPopular} from '../../utils/https/vehicle';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      popularData: [],
      carData: [],
      motorbikeData: [],
      bikeData: [],
      nextPagePopular: null,
      nextPageCar: null,
      nextPageMotorbike: null,
      nextPageBike: null,
    };
  }

  searchHandler = () => {
    this.props.navigation.navigate('search', {keyword: this.state.keyword});
  };

  getPopularData = () => {
    const query = {limit: 4};
    getPopular(query).then(({data}) => {
      this.setState({
        popularData: data.result.data,
        nextPagePopular: data.result.nextPage,
      });
    });
  };

  getCarData = () => {
    const query = {type_id: 1, limit: 4};
    getVehicles(query).then(({data}) => {
      this.setState({
        carData: data.result.data,
        nextPageCar: data.result.nextPage,
      });
    });
  };

  getMotorbikeData = () => {
    const query = {type_id: 2, limit: 4};
    getVehicles(query).then(({data}) => {
      this.setState({
        motorbikeData: data.result.data,
        nextPageMotorbike: data.result.nextPage,
      });
    });
  };

  getBikeData = () => {
    const query = {type_id: 3, limit: 4};
    getVehicles(query).then(({data}) => {
      this.setState({
        bikeData: data.result.data,
        nextPageBike: data.result.nextPage,
      });
    });
  };

  popularNavigation = () => {
    const query = {limit: 5};
    this.props.navigation.navigate('view-more', {query, title: 'Popular'});
  };

  carNavigation = () => {
    const query = {type_id: 1, limit: 5};
    this.props.navigation.navigate('view-more', {query, title: 'Cars'});
  };

  motorbikeNavigation = () => {
    const query = {type_id: 2, limit: 5};
    this.props.navigation.navigate('view-more', {
      query,
      title: 'Motorbike',
    });
  };

  bikeNavigation = () => {
    const query = {type_id: 3, limit: 5};
    this.props.navigation.navigate('view-more', {query, title: 'Bike'});
  };

  paginasiPopular = () => {
    if (this.state.nextPagePopular !== null) {
      Axios.get(`${API_URL}${this.state.nextPagePopular}&limit=4`)
        .then(({data}) => {
          console.log(this.state.nextPagePopular, data);
          this.setState({
            popularData: [...this.state.popularData, ...data.result.data],
            nextPagePopular: data.result.nextPage,
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  paginasiCar = () => {
    if (this.state.nextPageCar !== null) {
      Axios.get(`${API_URL}${this.state.nextPageCar}&limit=4`)
        .then(({data}) => {
          this.setState({
            carData: [...this.state.carData, ...data.result.data],
            nextPageCar: data.result.nextPage,
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  paginasiMotorbike = () => {
    if (this.state.nextPageMotorbike !== null) {
      Axios.get(`${API_URL}${this.state.nextPageMotorbike}&limit=4`)
        .then(({data}) => {
          this.setState({
            motorbikeData: [...this.state.motorbikeData, ...data.result.data],
            nextPageMotorbike: data.result.nextPage,
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  paginasiBike = () => {
    if (this.state.nextPageBike !== null) {
      Axios.get(`${API_URL}${this.state.nextPageBike}&limit=4`)
        .then(({data}) => {
          this.setState({
            bikeData: [...this.state.bikeData, ...data.result.data],
            nextPageBike: data.result.nextPage,
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getPopularData();
      this.getCarData();
      this.getMotorbikeData();
      this.getBikeData();
      this.paginasiPopular();
      this.paginasiCar();
      this.paginasiMotorbike();
      this.paginasiBike();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const {
      searchHandler,
      popularNavigation,
      carNavigation,
      motorbikeNavigation,
      bikeNavigation,
      paginasiPopular,
      paginasiCar,
      paginasiMotorbike,
      paginasiBike,
    } = this;
    const {popularData, carData, motorbikeData, bikeData} = this.state;
    return (
      <>
        <StatusBar hidden={true} />
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
                  keyboardType="default"
                  returnKeyType="search"
                  onSubmitEditing={searchHandler}
                  onChangeText={value => this.setState({keyword: value})}
                />
                <Icon name="search-outline" style={styles.searchIcon} />
              </View>
            </View>
          </ImageBackground>
          {this.props.auth.userInfo.authLevel === 1 ||
            (this.props.auth.userInfo.authLevel === 2 && (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={() => this.props.navigation.navigate('add-vehicle')}>
                <Text style={styles.textButton}>Add Vehicle</Text>
              </TouchableOpacity>
            ))}
          <Card
            title="Popular"
            vehicleData={popularData}
            pressHandler={popularNavigation}
            paginasi={paginasiPopular}
          />
          <Card
            title="Cars"
            vehicleData={carData}
            pressHandler={carNavigation}
            paginasi={paginasiCar}
          />

          <Card
            title="Motorbike"
            vehicleData={motorbikeData}
            pressHandler={motorbikeNavigation}
            paginasi={paginasiMotorbike}
          />
          <Card
            title="Bike"
            vehicleData={bikeData}
            pressHandler={bikeNavigation}
            paginasi={paginasiBike}
          />
        </ScrollView>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
