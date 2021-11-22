import React from 'react';
import {
  Login,
  Register,
  SendEmail,
  CheckCode,
  ChangePassword,
  DetailChat,
  Reservation,
  FirstPayment,
  SecondPayment,
  ThirdPayment,
  Favorite,
  EditProfile,
  TabScreen,
  Filter,
  EditItem,
  Splash,
  UpdatePassword,
  HistoryDetail,
} from './src/components/Route/Component';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import defaultStore from './src/redux/store';

const App = () => {
  const {Navigator: StackNav, Screen: StackScreen} = createStackNavigator();
  const {persistor, reduxStore} = defaultStore;
  return (
    <Provider store={reduxStore}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StackNav
            screenOptions={{headerShown: false}}
            initialRouteName="splash">
            <StackScreen name="home" component={TabScreen} />
            <StackScreen name="login" component={Login} />
            <StackScreen name="register" component={Register} />
            <StackScreen name="forget-password" component={SendEmail} />
            <StackScreen name="check-code" component={CheckCode} />
            <StackScreen name="change-password" component={ChangePassword} />
            <StackScreen name="detail-chat" component={DetailChat} />
            <StackScreen name="reservation" component={Reservation} />
            <StackScreen name="edit-vehicle" component={EditItem} />
            <StackScreen name="first-payment" component={FirstPayment} />
            <StackScreen name="second-payment" component={SecondPayment} />
            <StackScreen name="third-payment" component={ThirdPayment} />
            <StackScreen name="favorite" component={Favorite} />
            <StackScreen name="edit-profile" component={EditProfile} />
            <StackScreen name="update-password" component={UpdatePassword} />
            <StackScreen name="filter" component={Filter} />
            <StackScreen name="history-detail" component={HistoryDetail} />
            <StackScreen name="splash" component={Splash} />
          </StackNav>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
