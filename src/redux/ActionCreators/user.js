import {
  SEND_EMAIL,
  CHECK_CODE,
  CHANGE_PASSWORD,
  GET_PROFILE,
  PATCH_PROFILE,
  PATCH_PASSWORD,
  RESET_STATE,
} from './actionString';
import {
  sendEmail,
  checkCode,
  changePassword,
  getProfile,
  patchProfile,
  patchPassword,
} from '../../utils/https/user';

export const sendEmailAction = body => {
  return {
    type: SEND_EMAIL,
    payload: sendEmail(body),
  };
};

export const checkCodeAction = body => {
  return {
    type: CHECK_CODE,
    payload: checkCode(body),
  };
};

export const changePasswordAction = body => {
  return {
    type: CHANGE_PASSWORD,
    payload: changePassword(body),
  };
};

export const getProfileAction = (params, token) => {
  return {
    type: GET_PROFILE,
    payload: getProfile(params, token),
  };
};

export const patchProfileAction = (params, body, token) => {
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

export const resetStateAction = body => {
  return {
    type: RESET_STATE,
    payload: body,
  };
};
