import {
  GET_HISTORY_BY_ID,
  GET_HISTORY_OWNER,
  GET_HISTORY_USER,
  POST_HISTORY,
  PATCH_HISTORY,
} from '../ActionCreators/actionString';
import {ActionType} from 'redux-promise-middleware';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultState = {
  historyUser: [],
  historyId: [],
  data: '',
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: {},
};

const historyReducer = (prevstate = defaultState, action) => {
  const {Pending, Fulfilled, Rejected} = ActionType;
  switch (action.type) {
    case GET_HISTORY_BY_ID.concat('_', Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case GET_HISTORY_BY_ID.concat('_', Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case GET_HISTORY_BY_ID.concat('_', Fulfilled):
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
        historyId: action.payload.data.result,
      };
    case GET_HISTORY_USER.concat('_', Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case GET_HISTORY_USER.concat('_', Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case GET_HISTORY_USER.concat('_', Fulfilled):
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
        historyUser: action.payload.data.result,
      };
    case GET_HISTORY_OWNER.concat('_', Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case GET_HISTORY_OWNER.concat('_', Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case GET_HISTORY_OWNER.concat('_', Fulfilled):
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
        historyUser: action.payload.data.result,
      };
    case POST_HISTORY.concat('_', Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case POST_HISTORY.concat('_', Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case POST_HISTORY.concat('_', Fulfilled):
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
        data: action.payload.data.result,
      };
    case PATCH_HISTORY.concat('_', Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case PATCH_HISTORY.concat('_', Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case PATCH_HISTORY.concat('_', Fulfilled):
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
        historyId: action.payload.data.result,
      };
    default:
      return prevstate;
  }
};

export default historyReducer;
