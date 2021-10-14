import React from 'react';
import styles from './Style';
import {API_URL} from '@env';
import {connect} from 'react-redux';
import IconHeader from '../../components/IconHeader/Component';
import {getVehicleAction} from '../../redux/ActionCreators/vehicle';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';

class ViewMore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextPage: null,
    };
  }

  componentDidMount() {
    const {query} = this.props.route.params;
    const nextItem = `${query}&order_by=id&sort=ASC&limit=5`;
    this.props.urlVehicle(nextItem);
    console.log(this.props.vehicle.nextPage.nextPage);
  }
  render() {
    const {title} = this.props.route.params;
    return (
      <>
        {this.props.vehicle.data.length ? (
          <View style={styles.container}>
            <IconHeader
              text={title}
              route={() => this.props.navigation.goBack('home')}
            />
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
                          itemPicture: vehicle.picture.split(',')[0],
                          itemName: vehicle.name,
                          itemPrice: vehicle.price,
                          itemAddress: vehicle.address,
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
              // onEndReached={() => {
              //   this.state.nextPage !== null &&
              //     axios
              //       .get(this.props.vehicle.nextPage.nextPage)
              //       .then(result => {
              //         setStatesetNexPage(result);
              //         return setData(prevState => [
              //           ...prevState,
              //           ...result.data.result.data,
              //         ]);
              //       });
              // }}
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewMore);

// export default ViewMore;
