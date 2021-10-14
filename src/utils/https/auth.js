import Axios from 'axios';
import {API_URL} from '@env';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const url = process.env.REACT_APP_BASE_URL;
export const postLogin = body => {
  return Axios.post(`${API_URL}auth/login`, body);
};

export const postRegister = body => {
  return Axios.post(`${API_URL}auth/register`, body);
};

export const getProfile = (params, token) => {
  return Axios.get(`${API_URL}users/${params}`, {
    headers: {'x-access-token': `Bearer ${token}`},
  });
};

export const patchPassword = (params, body, token) => {
  return Axios.patch(`${API_URL}users/password/${params}`, body, {
    headers: {'x-access-token': `Bearer ${token}`},
  });
};

export const patchProfile = (params, body, token) => {
  return Axios.patch(`${API_URL}users/${params}`, body, {
    headers: {'x-access-token': `Bearer ${token}`},
  });
};

export const deleteLogout = token => {
  return Axios.delete(`${API_URL}auth/logout`, {token: token});
};
