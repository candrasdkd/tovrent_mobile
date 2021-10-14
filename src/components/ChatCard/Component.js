import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import styles from './Style';
import {useNavigation} from '@react-navigation/native';

const Component = props => {
  const navigation = useNavigation();
  const DATA = [
    {
      id: '1',
      title: 'First Item',
      subtitle: 'Hey, there are 3 vespa left',
      time: 'Just Now',
      notificaton: 3,
    },
    {
      id: '2',
      title: 'Second Item',
      subtitle: 'Hello, i want ask',
      time: 'Just Now',
      notificaton: 0,
    },
    {
      id: '3',
      title: 'Third Item',
      subtitle: 'Can help me?',
      time: 'Today',
      notificaton: 0,
    },
    {
      id: '4',
      title: 'First Item',
      subtitle: 'Hey, there are 3 vespa left',
      time: 'Today',
      notificaton: 4,
    },
    {
      id: '5',
      title: 'Second Item',
      subtitle: 'Hello, i want ask',
      time: 'Yesterday',
      notificaton: 0,
    },
    {
      id: '6',
      title: 'Third Item',
      subtitle: 'Can help me?',
      time: 'Yesterday',
      notificaton: 5,
    },
    {
      id: '7',
      title: 'First Item',
      subtitle: 'Hey, there are 3 vespa left',
      time: 'Yesterday',
      notificaton: 0,
    },
    {
      id: '8',
      title: 'Second Item',
      subtitle: 'Hello, i want ask',
      time: 'Today',
      notificaton: 1,
    },
    {
      id: '9',
      title: 'Third Item',
      subtitle: 'Can help me?',
      time: 'Yesterday',
      notificaton: 5,
    },
  ];
  return (
    <FlatList
      data={DATA}
      renderItem={({item: chat}) => {
        return (
          <>
            <TouchableOpacity
              style={styles.chatWrapper}
              onPress={() => navigation.navigate('detail-chat')}>
              <View>
                <Text style={styles.titleChat}>{chat.title}</Text>
                <Text>{chat.subtitle}</Text>
              </View>
              <View style={styles.timeWrapper}>
                <Text style={styles.timeText}>{chat.time}</Text>
                {chat.notificaton !== 0 ? (
                  <Text style={styles.notificaton}>{chat.notificaton}</Text>
                ) : null}
              </View>
            </TouchableOpacity>
          </>
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
  );
};

export default Component;
