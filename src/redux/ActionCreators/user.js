import {
  SEND_EMAIL,
  CHECK_CODE,
  CHANGE_PASSWORD,
  RESET_STATE,
} from './actionString';
import {sendEmail, checkCode, changePassword} from '../../utils/https/user';

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

export const resetStateAction = () => {
  return {
    type: RESET_STATE,
  };
};
