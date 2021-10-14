import {
  GET_VEHICLES,
  GET_VEHICLES_ID,
  GET_VEHICLES_CARS,
  GET_VEHICLES_BIKE,
  GET_VEHICLES_MOTORBIKE,
  POST_VEHICLES,
  PATCH_VEHICLES,
  SIGN_OUT,
} from './actionString';
import {
  getVehicle,
  getVehicleById,
  getVehicleByCars,
  getVehicleByMotorbike,
  getVehicleByBike,
  postVehicle,
  patchVehicle,
} from '../../utils/https/vehicle';
import {deleteLogout} from '../../utils/https/auth';

export const getVehicleAction = query => {
  return {
    type: GET_VEHICLES,
    payload: getVehicle(query),
  };
};

export const getVehicleByIdAction = params => {
  return {
    type: GET_VEHICLES_ID,
    payload: getVehicleById(params),
  };
};

export const getCars = () => {
  return {
    type: GET_VEHICLES_CARS,
    payload: getVehicleByCars(),
  };
};

export const getMotorbike = () => {
  return {
    type: GET_VEHICLES_MOTORBIKE,
    payload: getVehicleByMotorbike(),
  };
};

export const getBike = () => {
  return {
    type: GET_VEHICLES_BIKE,
    payload: getVehicleByBike(),
  };
};

export const postVehicleAction = (body, token) => {
  return {
    type: POST_VEHICLES,
    payload: postVehicle(body, token),
  };
};

export const patchVehicleAction = (params, body, token) => {
  return {
    type: PATCH_VEHICLES,
    payload: patchVehicle(params, body, token),
  };
};
export const logoutAction = token => {
  return {
    type: SIGN_OUT,
    payload: deleteLogout(token),
  };
};
