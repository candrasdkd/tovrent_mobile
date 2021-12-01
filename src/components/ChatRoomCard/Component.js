import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const ChatRoomCard = props => {
  const userId = useSelector(state => state.auth.userInfo.id);
  const sender = props.senderId;
  const timestamp = new Date(props.data.timestamp);
  if (userId === sender) {
    return (
      <View style={styles.flexRow}>
        <Text style={[styles.timestamp, styles.userTimeStamp]}>
          {timestamp.getHours()}:{timestamp.getMinutes()}
        </Text>
        <View style={[styles.container, styles.userContainer]}>
          <Text style={styles.userChat}>{props.data.text}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.flexRow}>
      <View style={[styles.container, styles.senderContainer]}>
        <Text style={styles.senderChat}>{props.data.text}</Text>
      </View>
      <Text style={[styles.timestamp, styles.senderTimeStamp]}>
        {timestamp.getHours()}:{timestamp.getMinutes()}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  flexRow: {flexDirection: 'row'},
  container: {
    width: 240,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginVertical: 12,
  },
  userContainer: {
    backgroundColor: '#393939',
    marginLeft: 'auto',
  },
  userChat: {color: 'white'},
  senderContainer: {backgroundColor: '#FFCD61', marginRight: 'auto'},
  senderChat: {color: '#4E4E4E'},
  timestamp: {
    flex: 1,
    marginTop: 'auto',
    marginVertical: 12,
    color: '#9F9F9F',
  },
  userTimeStamp: {textAlign: 'right', marginRight: 12},
  senderTimeStamp: {marginLeft: 12},
});

export default ChatRoomCard;
