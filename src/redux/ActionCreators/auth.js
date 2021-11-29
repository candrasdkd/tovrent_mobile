import {SIGN_IN, SIGN_OUT, REGISTER, RESET_STATE} from './actionString';
import {deleteLogout, postLogin, postRegister} from '../../utils/https/auth';

export const loginAction = body => {
  return {
    type: SIGN_IN,
    payload: postLogin(body),
  };
};

export const registerAction = body => {
  return {
    type: REGISTER,
    payload: postRegister(body),
  };
};

export const logoutAction = token => {
  return {
    type: SIGN_OUT,
    payload: deleteLogout(token),
  };
};

export const resetStateAction = body => {
  return {
    type: RESET_STATE,
    payload: body,
  };
};
