import Axios from 'axios';
import {API_URL} from '@env';

export const getHistoryById = (params, token) => {
  return Axios.get(`${API_URL}history/${params}`, {
    headers: {'x-access-token': `Bearer ${token}`},
  });
};
export const getHistoryUser = (params, token) => {
  return Axios.get(`${API_URL}history/user/${params}`, {
    headers: {'x-access-token': `Bearer ${token}`},
  });
};
export const getHistoryOwner = (params, token) => {
  return Axios.get(`${API_URL}history/owner/${params}`, {
    headers: {'x-access-token': `Bearer ${token}`},
  });
};
export const patchHistory = (params, body, token) => {
  return Axios.patch(`${API_URL}history/${params}`, body, {
    headers: {'x-access-token': `Bearer ${token}`},
  });
};

export const postHistory = (body, token) => {
  return Axios.post(`${API_URL}history`, body, {
    headers: {'x-access-token': `Bearer ${token}`},
    'Content-Type': 'multipart/x-www-form-urlencoded',
  });
};
