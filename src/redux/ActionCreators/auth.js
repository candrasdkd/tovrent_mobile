import {
  SIGN_IN,
  SIGN_OUT,
  REGISTER,
  PATCH_PROFILE,
  GET_PROFILE,
  PATCH_PASSWORD,
  RESET_STATE,
} from './actionString';
import {
  deleteLogout,
  postLogin,
  postRegister,
  patchProfile,
  getProfile,
  patchPassword,
} from '../../utils/https/auth';

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

export const patchUser = (params, body, token) => {
  return {
    type: PATCH_PROFILE,
    payload: patchProfile(params, body, token),
  };
};

export const patchPasswordAction = (params, body, token) => {
  return {
    type: PATCH_PASSWORD,
    payload: patchPassword(params, body, token),
  };
};

export const profileAction = (params, token) => {
  return {
    type: GET_PROFILE,
    payload: getProfile(params, token),
  };
};

export const resetStateAction = () => {
  return {
    type: RESET_STATE,
  };
};
