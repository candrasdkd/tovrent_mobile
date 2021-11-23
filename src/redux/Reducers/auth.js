import {
  SIGN_IN,
  SIGN_OUT,
  REGISTER,
  RESET_STATE,
} from '../ActionCreators/actionString';
import {ActionType} from 'redux-promise-middleware';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultState = {
  token: '',
  userInfo: [],
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  isLogin: false,
  error: '',
};

const authReducer = (prevstate = defaultState, action) => {
  const {Pending, Fulfilled, Rejected} = ActionType;
  switch (action.type) {
    case SIGN_IN.concat('_', Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case SIGN_IN.concat('_', Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case SIGN_IN.concat('_', Fulfilled):
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
        token: action.payload.data.result.token,
        userInfo: action.payload.data.result.userInfo,
        isLogin: true,
      };
    case SIGN_OUT.concat('_', Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case SIGN_OUT.concat('_', Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case SIGN_OUT.concat('_', Fulfilled):
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
        token: '',
        userInfo: [],
        isLogin: false,
      };
    case REGISTER.concat('_', Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case REGISTER.concat('_', Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case REGISTER.concat('_', Fulfilled):
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
      };
    case RESET_STATE:
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: false,
        isRejected: false,
        status: '',
      };
    default:
      return prevstate;
  }
};

export default authReducer;
