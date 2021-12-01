import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {View, Text, Image} from 'react-native';
import styles from './Style';
import {getPatchToken} from '../../utils/https/auth';
import PushNotification from 'react-native-push-notification';
import socket from '../../components/Socket/SocketIo';

const Component = ({navigation}) => {
  const auth = useSelector(reduxState => reduxState.auth);

  const createChannel = () => {
    // PushNotification.createChannel({
    //   channelId: 'transaction-channel',
    //   channelName: 'Transaction',
    // });
    PushNotification.createChannel({
      channelId: 'chat-channel',
      channelName: 'Chat',
    });
  };
  useEffect(() => {
    createChannel();
    auth.token !== ''
      ? setTimeout(() => {
          getPatchToken(auth.token)
            .then(() => {
              socket.on('connect', data => console.log(data));
              socket.on(auth.userInfo.id, data => {
                PushNotification.localNotification({
                  channelId: 'chat-channel',
                  title: 'Chat from ' + data.senderName,
                  message: data.message,
                });
              });
              // socket.on(`transaction_${auth.userInfo.id}`, data => {
              //   PushNotification.localNotification({
              //     channelId: 'transaction-channel',
              //     title: data.title,
              //     message: data.message,
              //   });
              // });
              navigation.replace('home');
            })
            .catch(err => {
              console.log(err);
              socket.off(auth.userInfo.id);
              // socket.off(`transaction_${auth.userInfo.id}`);
              navigation.replace('login');
            });
        }, 500)
      : setTimeout(() => {
          // socket.off(`transaction_${auth.userInfo.id}`);
          socket.off(auth.userInfo.id);
          navigation.replace('home');
        }, 500);

    // setTimeout(() => {
    //   navigation.replace('home');
    // }, 3000);
  }, [auth.token, auth.userInfo.id, navigation]);
  return (
    <View style={styles.background}>
      <Image source={require('../../../assets/images/splash.png')} />
      <Text style={styles.text}>TOV RENTAL</Text>
    </View>
  );
};

export default Component;
