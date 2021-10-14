import {
  SIGN_IN,
  SIGN_OUT,
  REGISTER,
  GET_PROFILE,
  PATCH_PROFILE,
} from '../ActionCreators/actionString';
import {ActionType} from 'redux-promise-middleware';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultState = {
  token: '',
  userInfo: {},
  data: {},
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
        userInfo: {},
        data: {},
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
        authInfo: action.payload.data.result,
      };
    case PATCH_PROFILE.concat('_', Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case PATCH_PROFILE.concat('_', Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case PATCH_PROFILE.concat('_', Fulfilled):
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
        data: action.payload.data.result,
      };
    case GET_PROFILE.concat('_', Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case GET_PROFILE.concat('_', Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case GET_PROFILE.concat('_', Fulfilled):
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
        data: action.payload.data.result,
      };
    default:
      return prevstate;
  }
};

export default authReducer;
