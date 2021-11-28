import {
  GET_VEHICLES,
  GET_VEHICLES_ID,
  POST_VEHICLES,
  PATCH_VEHICLES,
  SIGN_OUT,
} from './actionString';
import {
  getVehicle,
  getVehicleById,
  postVehicle,
  patchVehicle,
} from '../../utils/https/vehicle';
import {deleteLogout} from '../../utils/https/auth';

export const getVehicleAction = params => {
  return {
    type: GET_VEHICLES,
    payload: getVehicle(params),
  };
};

export const getVehicleByIdAction = params => {
  return {
    type: GET_VEHICLES_ID,
    payload: getVehicleById(params),
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
