import React from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import styles from './Style';
import {API_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
// import Axios from 'axios';

const Component = props => {
  const {title, vehicleData, pressHandler} = props;

  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.textContainer}>
        <Text style={styles.titleCard}>{title}</Text>
        <Text style={styles.subtitleCard} onPress={pressHandler}>
          View More {'>'}
        </Text>
      </View>
      <FlatList
        horizontal={true}
        data={vehicleData}
        renderItem={({item: vehicle}) => {
          return (
            <View style={styles.cardContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('reservation', {
                    itemId: vehicle.id,
                  })
                }>
                <Image
                  style={styles.card}
                  source={{
                    uri: `${API_URL}${vehicle.picture.split(',')[0]}`,
                  }}
                />
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(_, index) => index}
        // onEndReached={
        //   pageVehicle !== null &&
        //   Axios.get(API_URL + pageVehicle)
        //     .then(({data}) => {
        //       console.log(data);
        //       setPageVehicle(data.result.nextPage);
        //       return setdataPaginasi([...dataPaginasi, ...data.result.data]);
        //     })
        //     .catch(err => {
        //       console.log(err);
        //     })

        // onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default Component;
