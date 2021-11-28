import {
  GET_VEHICLES_ID,
  POST_VEHICLES,
  PATCH_VEHICLES,
} from '../ActionCreators/actionString';
import {ActionType} from 'redux-promise-middleware';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultState = {
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  // dataById: [],
  status: '',
  error: '',
};

const vehicleReducer = (prevstate = defaultState, action) => {
  const {Pending, Fulfilled, Rejected} = ActionType;
  switch (action.type) {
    // case GET_VEHICLES_ID.concat('_', Pending):
    //   return {
    //     ...prevstate,
    //     isPending: true,
    //     isFulfilled: false,
    //     isRejected: false,
    //   };
    // case GET_VEHICLES_ID.concat('_', Rejected):
    //   return {
    //     ...prevstate,
    //     isPending: false,
    //     isRejected: true,
    //     error: action.payload,
    //   };
    // case GET_VEHICLES_ID.concat('_', Fulfilled):
    //   return {
    //     ...prevstate,
    //     isPending: false,
    //     isFulfilled: true,
    //     dataById: action.payload.data.result,
    //   };
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
