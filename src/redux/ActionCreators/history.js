import {
  GET_HISTORY_BY_ID,
  GET_HISTORY_USER,
  POST_HISTORY,
  PATCH_HISTORY,
} from './actionString';
import {
  getHistoryById,
  getHistoryUser,
  postHistory,
  patchHistory,
} from '../../utils/https/history';

export const postHistoryAction = (body, token) => {
  return {
    type: POST_HISTORY,
    payload: postHistory(body, token),
  };
};
export const patchHistoryAction = (params, body, token) => {
  return {
    type: PATCH_HISTORY,
    payload: patchHistory(params, body, token),
  };
};
export const getHistoryUserAction = (params, token) => {
  return {
    type: GET_HISTORY_USER,
    payload: getHistoryUser(params, token),
  };
};

export const historyByIdAction = (params, token) => {
  return {
    type: GET_HISTORY_BY_ID,
    payload: getHistoryById(params, token),
  };
};
