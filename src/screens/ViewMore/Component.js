import React from 'react';
import styles from './Style';
import {API_URL} from '@env';
import {connect} from 'react-redux';
import IconHeader from '../../components/IconHeader/Component';
import {getVehicles, getPopular} from '../../utils/https/vehicle';
import Icon from 'react-native-vector-icons/Ionicons';
import Axios from 'axios';

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
      data: [],
      nextPage: null,
    };
  }

  componentDidMount() {
    const {query} = this.props.route.params;
    if (this.props.route.params.title === 'Popular') {
      getPopular(query)
        .then(({data}) => {
          this.setState({
            data: data.result.data,
            nextPage: data.result.nextPage,
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      getVehicles(query)
        .then(({data}) => {
          this.setState({
            data: data.result.data,
            nextPage: data.result.nextPage,
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  render() {
    const {title} = this.props.route.params;
    return (
      <>
        {this.state.data ? (
          <View style={styles.container}>
            <IconHeader
              text={title}
              route={() => this.props.navigation.goBack('home')}
            />
            <FlatList
              data={this.state.data}
              renderItem={({item: vehicle}) => {
                return (
                  <>
                    <TouchableOpacity
                      style={styles.item}
                      activeOpacity={0.5}
                      onPress={() =>
                        this.props.navigation.navigate('reservation', {
                          itemId: vehicle.id,
                          itemPicture: vehicle.picture.split(',')[0],
                          itemName: vehicle.name,
                          itemPrice: vehicle.price,
                          itemAddress: vehicle.address,
                        })
                      }>
                      <View style={styles.shadow}>
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
                      </View>

                      <View style={styles.text}>
                        <Text
                          style={styles.titleText}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {vehicle.name}{' '}
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
                    </TouchableOpacity>
                  </>
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

export default connect(mapStateToProps)(ViewMore);
