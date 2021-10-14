import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './Style';
import Header from '../../components/IconHeader/Component';
import Icon from 'react-native-vector-icons/Ionicons';
import {io} from 'socket.io-client';
import {API_URL} from '@env';
class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: '',
    };
  }

  componentDidMount() {
    this.socket = io(`${API_URL}`);
  }

  submitChatMessage() {
    this.socket.emit('chat message', this.state.chatMessage);
    this.setState({chatMessage: ''});
  }
  render() {
    return (
      <>
        <Header
          text="Detail Chat"
          route={() => this.props.navigation.goBack('chat')}
        />
        <View style={styles.container}>
          <View style={styles.userWrapper}>
            <Text style={styles.textUser}>
              Hey, can I book 2 vespa for January 18 to 21?
            </Text>
          </View>
          <View style={styles.ownerWrapper}>
            <Text style={styles.textOwner}>
              Hey thanks for asking, it’s available now you can do reservation
              and pay for the vespa so they’re ready for you
            </Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              value={this.state.chatMessage}
              placeholder="Please input text"
              placeholderTextColor="#999999"
              onChangeText={chatMessage => this.setState({chatMessage})}
            />
            <TouchableOpacity
              style={styles.iconView}
              onPress={() => this.submitChatMessage()}>
              <Icon name="send" style={styles.iconSend} />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}

export default Component;
