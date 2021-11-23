import Axios from 'axios';
import {API_URL} from '@env';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const url = process.env.REACT_APP_BASE_URL;
export const getVehicle = query => {
  return Axios.get(`${API_URL}/vehicles/${query}`);
};

export const getVehicleById = params => {
  return Axios.get(`${API_URL}/vehicles/${params}`);
};

export const getVehicleByCars = () => {
  return Axios.get(`${API_URL}/vehicles/?typeId=1`);
};

export const getVehicleByMotorbike = () => {
  return Axios.get(`${API_URL}/vehicles/?typeId=2`);
};

export const getVehicleByBike = () => {
  return Axios.get(`${API_URL}/vehicles/?typeId=3`);
};

export const postVehicle = (body, token) => {
  return Axios.post(`${API_URL}/vehicles`, body, {
    headers: {'x-access-token': `Bearer ${token}`},
    'Content-Type': 'multipart/form-data',
  });
};

export const patchVehicle = (params, body, token) => {
  return Axios.patch(`${API_URL}/vehicles/${params}`, body, {
    headers: {'x-access-token': `Bearer ${token}`},
    'Content-Type': 'multipart/form-data',
  });
};
