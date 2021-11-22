import {
  SEND_EMAIL,
  CHECK_CODE,
  CHANGE_PASSWORD,
  RESET_STATE,
} from '../ActionCreators/actionString';

import {ActionType} from 'redux-promise-middleware';

const defaultState = {
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: '',
  data: [],
  status: '',
};

const userReducer = (prevstate = defaultState, action) => {
  const {Pending, Fulfilled, Rejected} = ActionType;
  switch (action.type) {
    case SEND_EMAIL.concat('_', Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case SEND_EMAIL.concat('_', Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        status: action.payload.response.status,
        error: action.payload,
      };
    case SEND_EMAIL.concat('_', Fulfilled):
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
      };
    case CHECK_CODE.concat('_', Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case CHECK_CODE.concat('_', Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        status: action.payload.response.status,
        error: action.payload,
      };
    case CHECK_CODE.concat('_', Fulfilled):
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
      };
    case CHANGE_PASSWORD.concat('_', Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case CHANGE_PASSWORD.concat('_', Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        status: action.payload.response.status,
        error: action.payload,
      };
    case CHANGE_PASSWORD.concat('_', Fulfilled):
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

export default userReducer;
