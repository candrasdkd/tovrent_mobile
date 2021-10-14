import React from 'react';
import Search from '../../screens/Search/Component';
import Home from '../../screens/Home/Component';
import ViewMore from '../../screens/ViewMore/Component';
import FirstPayment from '../../screens/Payment1/Component';
import AddVehicle from '../../screens/AddVehicle/Component';
import {createStackNavigator} from '@react-navigation/stack';

const Component = () => {
  const {Navigator: StackNav, Screen: StackScreen} = createStackNavigator();
  return (
    <StackNav screenOptions={{headerShown: false}}>
      <StackScreen name="home">{props => <Home {...props} />}</StackScreen>
      <StackScreen name="search">{props => <Search {...props} />}</StackScreen>
      <StackScreen name="add-vehicle">
        {props => <AddVehicle {...props} />}
      </StackScreen>
      <StackScreen name="view-more">
        {props => <ViewMore {...props} />}
      </StackScreen>
      <StackScreen name="payment">
        {props => <FirstPayment {...props} />}
      </StackScreen>
    </StackNav>
  );
};

export default Component;
