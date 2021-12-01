import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const ChatCard = ({user, chat, timeStamp, navigation, route, receiverId}) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate('detail-chat', {receiverId, user})}>
      <View style={styles.leftContainer}>
        <Text style={styles.user}>{user}</Text>
        <Text numberOfLines={1} style={styles.chat}>
          {chat}
        </Text>
      </View>
      <Text style={styles.timeStamp}>{timeStamp}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 30,
    borderBottomColor: '#DADADA',
  },
  user: {fontWeight: '700', marginBottom: 5, fontSize: 16},
  leftContainer: {marginRight: 'auto'},
  chat: {fontSize: 13},
  timeStamp: {fontSize: 12, color: '#9A9A9D'},
});

export default ChatCard;
