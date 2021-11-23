import {createStore, applyMiddleware, combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import rpm from 'redux-promise-middleware';
import authReducer from './Reducers/auth';
import userReducer from './Reducers/user';
import vehicleReducer from './Reducers/vehicle';
import historyReducer from './Reducers/history';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['token', 'userInfo'],
};

// const vehiclePersistConfig = {
//   key: 'vehicle',
//   storage: AsyncStorage,
//   whitelist: ['cars', 'motorbik', 'bike', 'data', 'dataById'],
// };

const reducers = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  // vehicle: persistReducer(vehiclePersistConfig, vehicleReducer),
  vehicle: vehicleReducer,
  history: historyReducer,
  user: userReducer,
});

const logger = createLogger();
const enhancers = applyMiddleware(rpm, logger);
const reduxStore = createStore(reducers, enhancers);
const persistor = persistStore(reduxStore);

export default {reduxStore, persistor};
