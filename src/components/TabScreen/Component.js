import React from 'react';
import History from '../../screens/History/Component';
import Chat from '../../screens/Chat/Component';
import Profile from '../../screens/Profile/Component';
import StackScreen from '../StackScreen/Component';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const TabScreem = props => {
  // const auth = useSelector(reduxState => reduxState.auth);
  const {Navigator: TabNav, Screen: TabScreen} = createBottomTabNavigator();
  // console.log(props.auth.token);
  return (
    <>
      <TabNav
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'HomeScreen') {
              iconName = 'home-sharp';
            } else if (route.name === 'HistoryScreen') {
              iconName = 'document-text';
            } else if (route.name === 'ChatScreen') {
              iconName = 'chatbubble';
            } else if (route.name === 'ProfileScreen') {
              iconName = 'person';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FFCD61',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
          headerShown: false,
        })}>
        <TabScreen name="HomeScreen" component={StackScreen} />
        <TabScreen name="HistoryScreen" component={History} />
        <TabScreen
          name="ChatScreen"
          component={Chat}
          options={{
            tabBarBadge: 3,
          }}
        />
        <TabScreen name="ProfileScreen" component={Profile} />
      </TabNav>
    </>
  );
};
const mapStateToProps = ({auth}) => {
  return {
    auth,
  };
};
export default connect(mapStateToProps)(TabScreem);
