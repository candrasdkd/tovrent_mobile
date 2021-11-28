import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import styles from './Style';
import {API_URL} from '@env';
import {useNavigation} from '@react-navigation/native';

const HomeCard = props => {
  const {title, vehicleData, pressHandler, paginasi} = props;
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.textContainer}>
        <Text style={styles.titleCard}>{title}</Text>
        <Text style={styles.subtitleCard} onPress={pressHandler}>
          View More {'>'}
        </Text>
      </View>
      {vehicleData.length === 0 && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {vehicleData.length > 0 && (
        <FlatList
          horizontal={true}
          data={vehicleData}
          renderItem={({item: vehicle}) => {
            return (
              <View style={styles.cardContainer}>
                <Pressable
                  onPress={() =>
                    navigation.navigate('reservation', {
                      itemId: vehicle.id,
                    })
                  }>
                  <View style={styles.shadow}>
                    <Image
                      style={styles.card}
                      resizeMode={'cover'}
                      source={{
                        uri: `${API_URL}${vehicle.picture.split(',')[0]}`,
                      }}
                    />
                  </View>
                </Pressable>
              </View>
            );
          }}
          keyExtractor={(_, index) => index}
          onEndReached={paginasi}
        />
      )}
    </View>
  );
};

export default HomeCard;
