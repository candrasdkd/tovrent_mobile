import React from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import styles from './Style';
import {API_URL} from '@env';
import {useNavigation} from '@react-navigation/native';

const Component = props => {
  const {title, data, pressHandler} = props;
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
        data={data}
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
        // onEndReached={() => {
        // pageInfo.currentPage < pageInfo.totalPage
        // pageInfo.nextPage !== null
        // setData(prevState => [...prevState, ...page2]);
        // }}
        // onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default Component;
