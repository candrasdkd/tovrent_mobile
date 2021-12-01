import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Pressable, ScrollView} from 'react-native';
import styles from './Style';
// import socket from '../../components/Socket/SocketIo';
import {API_URL} from '@env';
import io from 'socket.io-client';

import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatRoomCard from '../../components/ChatRoomCard/Component';
import {getChat, postChat} from '../../utils/https/chat';
import {useSelector} from 'react-redux';
import {TextInput} from 'react-native-gesture-handler';

const ChatRoom = props => {
  const scrollViewRef = useRef();
  const auth = useSelector(state => state.auth);
  const [chatData, setChatData] = useState([]);
  const [message, setMessage] = useState('');
  const getChatHandler = () => {
    const params = {
      sender_id: auth.userInfo.id,
      receiver_id: props.route.params.receiverId,
    };
    return getChat(params, auth.token)
      .then(data => {
        setChatData(data.data.result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onSendHandler = () => {
    const body = {
      user_id_sender: auth.userInfo.id,
      user_id_receiver: props.route.params.receiverId,
      text: message,
    };
    return postChat(body, auth.token)
      .then(() => {
        getChatHandler();
        return setMessage('');
      })
      .catch(err => console.log(err.response));
  };

  useEffect(() => {
    let socket = io(API_URL);
    getChatHandler();
    socket.on(auth.userInfo.id, data => {
      getChatHandler();
    });
    return () => {
      socket.off(auth.userInfo.id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.header, styles.headerContainer]}>
        <View style={styles.title}>
          <Pressable onPress={() => props.navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={28} />
          </Pressable>
          <Text style={styles.titleTxt}>
            {props.route.params.user ? props.route.params.user : 'Chat Room'}
          </Text>
        </View>
      </View>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }
        style={styles.chatContainer}>
        {chatData?.map(chat => {
          return (
            <ChatRoomCard
              {...props}
              data={chat}
              senderId={chat.user_id_sender}
              key={chat.id}
            />
          );
        })}
      </ScrollView>
      <View style={styles.messageContainer}>
        <TextInput
          multiline={true}
          style={styles.messageInput}
          numberOfLines={3}
          placeholder="Type a message"
          value={message}
          onChange={e => {
            setMessage(e.nativeEvent.text);
          }}
        />
        <Ionicons name="camera" size={28} style={styles.camIcon} color="grey" />
        <Pressable onPress={onSendHandler}>
          <Ionicons
            name="send"
            size={22}
            style={styles.sendIcon}
            color="grey"
          />
        </Pressable>
      </View>
    </View>
  );
};

export default ChatRoom;
