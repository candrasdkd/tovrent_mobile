import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import Axios from 'axios';
import {API_URL} from '@env';
import {getVehicleAction} from '../../redux/ActionCreators/vehicle';
import styles from './Style';
import Icon from 'react-native-vector-icons/Ionicons';
import {getVehicles} from '../../utils/https/vehicle';
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: false,
      keyword: this.props.route.params.keyword
        ? this.props.route.params?.keyword
        : '',
      nextPage: null,
      location: this.props.route.params?.location
        ? this.props.route.params.location
        : null,
      maxPrice: this.props.route.params?.maxPrice
        ? this.props.route.params.maxPrice
        : null,
      minPrice: this.props.route.params?.minPrice
        ? this.props.route.params.minPrice
        : null,
      type: this.props.route.params?.type ? this.props.route.params.type : null,
      sort: this.props.route.params?.sort ? this.props.route.params.sort : null,
    };
  }
  nameHandler = text => {
    this.setState({vehicleName: text});
  };

  searchHandler = () => {
    this.props.navigation.push('search', {keyword: this.state.keyword});
  };

  getData = query => {
    getVehicles(query)
      .then(({data}) => {
        this.setState({
          data: data.result.data,
          nextPage: data.result.nextPage,
        });
      })
      .catch(err => {
        console.log(String(err).includes(404));

        this.setState({
          error: String(err).includes(404),
        });
      });
  };

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      const routeParams = this.props.route.params;
      let config = routeParams.keyword && {keyword: routeParams.keyword};

      if (routeParams.location) {
        config = {...config, ...{location: routeParams.location}};
      }
      if (routeParams.maxPrice) {
        config = {...config, ...{max_price: routeParams.maxPrice}};
      }
      if (routeParams.minPrice) {
        config = {...config, ...{min_price: routeParams.minPrice}};
      }
      if (routeParams.type) {
        config = {...config, ...{type_id: routeParams.type}};
      }
      switch (routeParams.sort) {
        case 1:
          config = {...config, ...{order_by: 'v.price', sort: 'ASC'}};
          break;
        case 2:
          config = {...config, ...{order_by: 'v.price', sort: 'DESC'}};
          break;
        case 3:
          config = {...config, ...{order_by: 'v.name', sort: 'ASC'}};
          break;
        case 4:
          config = {...config, ...{order_by: 'v.name', sort: 'DESC'}};
          break;

        default:
          break;
      }
      config && this.getData(config);
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const keyword = this.props.route.params.keyword
      ? this.props.route.params.keyword
      : this.state.keyword;
    const routeParams = this.props.route.params;
    const state = this.state;
    return (
      <>
        <View style={styles.container}>
          <View style={styles.searchSection}>
            <TextInput
              style={styles.input}
              defaultValue={this.props.route.params.keyword}
              placeholder="Search Vehicle"
              placeholderTextColor="#000"
              keyboardType="default"
              returnKeyType="search"
              onSubmitEditing={this.searchHandler}
              onChangeText={value => this.setState({keyword: value})}
            />
            <Icon name="search-outline" style={styles.searchIcon} />
          </View>
          <Text
            style={styles.filter}
            onPress={() =>
              this.props.navigation.navigate('filter', {
                keyword,
              })
            }>
            <Icon name="filter" />
            &nbsp;&nbsp;Filter
            {routeParams.location ? ` - ${routeParams.location}` : ''}
            {routeParams.maxPrice ? ` - Rp. ${routeParams.maxPrice} to ` : ''}
            {routeParams.minPrice ? `Rp. ${routeParams.minPrice}` : ''}
            {routeParams.type === 1 && ' - Car'}
            {routeParams.type === 2 && ' - Motorbike'}
            {routeParams.type === 3 && ' - Bike'}
            {routeParams.sort === 1 && ' - Lowest Price'}
            {routeParams.sort === 2 && ' - Highest Price'}
            {routeParams.sort === 3 && ' - A to Z'}
            {routeParams.sort === 4 && ' - Z to A'}
          </Text>
          {String(keyword) === '?keyword=' ||
            (state.error === true && (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>Data not found</Text>
              </View>
            ))}

          {!this.state.data.length === 0 && (
            <View style={styles.loading}>
              <ActivityIndicator size="large" />
            </View>
          )}

          {String(keyword) !== '?keyword=' && this.state.data.length > 0 && (
            <FlatList
              data={this.state.data}
              renderItem={({item: vehicle}) => {
                return (
                  <View style={styles.itemMenu}>
                    <TouchableOpacity
                      style={styles.cardWrapper}
                      onPress={() =>
                        this.props.navigation.navigate('reservation', {
                          itemId: vehicle.id,
                        })
                      }>
                      <Image
                        style={styles.card}
                        source={{
                          uri: `${API_URL}${vehicle.picture.split(',')[0]}`,
                        }}
                      />
                      <Text style={styles.rating}>
                        4.5
                        <Icon name="star" color="#fff" size={14} />
                      </Text>
                    </TouchableOpacity>
                    <View>
                      <Text
                        style={styles.titleText}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {vehicle.name}
                      </Text>
                      <Text style={styles.subtitleText}>
                        Max for {vehicle.capacity} person
                      </Text>
                      <Text style={styles.subtitleText}>
                        2.1 from your location
                      </Text>
                      <Text style={styles.greenText}>Availabe</Text>
                      <Text style={styles.priceText}>
                        Rp. {Number(vehicle.price).toLocaleString('de-DE')}
                        /day
                      </Text>
                    </View>
                  </View>
                );
              }}
              keyExtractor={(_, index) => index}
              onEndReached={() => {
                this.state.nextPage !== null &&
                  Axios.get(`${API_URL}${this.state.nextPage}&limit=5`)
                    .then(({data}) => {
                      console.log(data);
                      this.setState({
                        data: [...this.state.data, ...data.result.data],
                        nextPage: data.result.nextPage,
                      });
                    })
                    .catch(err => {
                      console.log(err);
                    });
              }}
            />
          )}
        </View>
      </>
    );
  }
}
const mapStateToProps = ({vehicle}) => {
  return {
    vehicle,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    urlVehicle: query => {
      dispatch(getVehicleAction(query));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
