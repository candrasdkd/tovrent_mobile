import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, TextInput} from 'react-native';
import {useSelector} from 'react-redux';
import ChatCard from '../../components/ChatCard/Component';
import {getLatestChat} from '../../utils/https/chat';
import Header from '../../components/IconHeader/Component';
import Icon from 'react-native-vector-icons/Ionicons';
const Chat = props => {
  const auth = useSelector(state => state.auth);
  const [chatData, setChatData] = useState([]);

  const getLatestChatHandler = () => {
    getLatestChat(auth.userInfo.id, auth.token)
      .then(data => {
        console.log(data);
        setChatData(data.data.result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getLatestChatHandler();
    });
    getLatestChatHandler();
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header text="Chat" route={() => props.navigation.goBack('home')} />
      <ScrollView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search Chat"
          placeholderTextColor="gray"
        />
        <Icon name="search-outline" style={styles.iconSearch} />
        {chatData?.map(chat => {
          return (
            <ChatCard
              key={chat.id}
              {...props}
              user={
                chat.user_id_receiver !== auth.userInfo.id
                  ? chat.receiver_name
                  : chat.sender_name
              }
              chat={chat.text}
              timeStamp="2 Hours ago"
              receiverId={
                chat.user_id_receiver !== auth.userInfo.id
                  ? chat.user_id_receiver
                  : chat.user_id_sender
              }
            />
          );
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {padding: 20, height: 'auto', backgroundColor: 'white'},
  input: {
    flex: 1,
    width: '100%',
    height: 60,
    position: 'relative',
    paddingLeft: 60,
    paddingRight: 40,
    backgroundColor: '#EFEEEE',
    color: '#000000',
    borderRadius: 20,
  },
  iconSearch: {
    position: 'absolute',
    left: 20,
    marginVertical: 15,
    fontSize: 25,
    color: '#000000',
  },
});

export default Chat;
