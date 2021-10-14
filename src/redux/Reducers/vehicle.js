import {
  GET_VEHICLES,
  GET_VEHICLES_ID,
  GET_VEHICLES_BIKE,
  GET_VEHICLES_CARS,
  GET_VEHICLES_MOTORBIKE,
  POST_VEHICLES,
  PATCH_VEHICLES,
} from '../ActionCreators/actionString';
import {ActionType} from 'redux-promise-middleware';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultState = {
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  data: '',
  nextPage: {},
  cars: {},
  motorbike: {},
  bike: {},
  dataById: {},
  error: {},
};

const vehicleReducer = (prevstate = defaultState, action) => {
  const {Pending, Fulfilled, Rejected} = ActionType;
  switch (action.type) {
    case GET_VEHICLES_ID.concat('_', Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case GET_VEHICLES_ID.concat('_', Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case GET_VEHICLES_ID.concat('_', Fulfilled):
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
        dataById: action.payload.data.result,
      };
    case GET_VEHICLES_CARS.concat('_', Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case GET_VEHICLES_CARS.concat('_', Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case GET_VEHICLES_CARS.concat('_', Fulfilled):
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
        cars: action.payload.data.result,
      };
    case GET_VEHICLES_MOTORBIKE.concat('_', Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case GET_VEHICLES_MOTORBIKE.concat('_', Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case GET_VEHICLES_MOTORBIKE.concat('_', Fulfilled):
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
        motorbike: action.payload.data.result,
      };
    case GET_VEHICLES_BIKE.concat('_', Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case GET_VEHICLES_BIKE.concat('_', Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case GET_VEHICLES_BIKE.concat('_', Fulfilled):
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
        bike: action.payload.data.result,
      };
    case GET_VEHICLES.concat('_', Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case GET_VEHICLES.concat('_', Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case GET_VEHICLES.concat('_', Fulfilled):
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
        data: action.payload.data.result,
        nextPage: action.payload.data.info,
      };
    case POST_VEHICLES.concat('_', Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case POST_VEHICLES.concat('_', Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case POST_VEHICLES.concat('_', Fulfilled):
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
        // data: action.payload.data.result,
      };
    case PATCH_VEHICLES.concat('_', Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case PATCH_VEHICLES.concat('_', Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case PATCH_VEHICLES.concat('_', Fulfilled):
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
        dataById: action.payload.data.result,
      };
    default:
      return prevstate;
  }
};

export default vehicleReducer;
