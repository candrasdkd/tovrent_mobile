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
import {API_URL} from '@env';
import {getVehicleAction} from '../../redux/ActionCreators/vehicle';
import styles from './Style';
import Icon from 'react-native-vector-icons/Ionicons';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleName: '',
      showMessage: false,
      errorMessage: '',
    };
  }
  nameHandler = text => {
    this.setState({vehicleName: text});
  };

  searchHandler = () => {
    const querySearch = `?keyword=${this.state.vehicleName}`;
    this.props.urlVehicle(querySearch);
    if (this.props.vehicle.isFulfilled) {
      this.props.navigation.navigate('search', {querySearch});
    }
  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      const sendQuery = this.props.route.params
        ? this.props.route.params.sendQuery
        : this.state.vehicleName;
      this.props.urlVehicle(sendQuery);
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  render() {
    const sendQuery = this.props.route.params
      ? this.props.route.params.sendQuery
      : this.state.vehicleName;
    const querySearch = `?keyword=${this.state.vehicleName}`;
    return (
      <>
        {this.props.vehicle.data.length ? (
          <View style={styles.container}>
            <View style={styles.searchSection}>
              <TextInput
                style={styles.input}
                defaultValue={
                  sendQuery ? sendQuery.slice(9) : this.state.vehicleName
                }
                placeholder="Search Vehicle"
                placeholderTextColor="#fff"
                onChangeText={this.nameHandler}
              />
              <Icon
                name="search-outline"
                style={styles.searchIcon}
                onPress={this.searchHandler}
              />
            </View>
            <Text
              style={styles.filter}
              onPress={() =>
                this.props.navigation.navigate('filter', {
                  sendQuery: sendQuery ? sendQuery : querySearch,
                })
              }>
              Filter
            </Text>
            <FlatList
              data={this.props.vehicle.data}
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
                    <View style={styles.textWrapper}>
                      <Text style={styles.titleText}>{vehicle.name}</Text>
                      <Text style={styles.subtitleText}>
                        Max for {vehicle.capacity} person
                      </Text>
                      <Text style={styles.subtitleText}>
                        2.1 from your location
                      </Text>
                      <Text style={styles.greenText}>Availabe</Text>
                      <Text style={styles.priceText}>
                        Rp. {Number(vehicle.price).toLocaleString('de-DE')}/day
                      </Text>
                    </View>
                  </View>
                );
              }}
              keyExtractor={(_, index) => index}
            />
          </View>
        ) : (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
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
