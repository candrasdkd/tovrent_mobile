import React from 'react';
import {View, TextInput} from 'react-native';
import {connect} from 'react-redux';
import styles from './Style';
import Icon from 'react-native-vector-icons/Ionicons';
import IconHeader from '../../components/IconHeader/Component';
import ChatCard from '../../components/ChatCard/Component';
import {profileAction, logoutAction} from '../../redux/ActionCreators/auth';
const Chat = props => {
  // const auth = useSelector(reduxStore => reduxStore.auth);
  const logoutHandler = () => {
    const token = props.auth.token;
    props.logout(token);
    props.navigation.replace('login');
    // this.props.navigation.reset({
    //   index: 0,
    //   routes: [{name: 'login'}],
    // });
  };
  return (
    <View style={styles.container}>
      <IconHeader text="Chat" route={() => props.navigation.goBack('home')} />
      <View style={styles.iconWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Search Chat"
          placeholderTextColor="gray"
        />
        <Icon
          name="search-outline"
          style={styles.iconSearch}
          onPress={logoutHandler}
        />
      </View>
      <ChatCard />
    </View>
  );
};

const mapStateToProps = ({auth}) => {
  return {
    auth,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    urlGet: (params, token) => {
      dispatch(profileAction(params, token));
    },
    logout: token => {
      dispatch(logoutAction(token));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
