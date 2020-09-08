import * as types from './actionTypes';

export const saveUser = data => {
  return {
    type: types.SAVE_USER,
    payload: data,
  };
};

export const Logout = data => {
  return {
    type: types.LOGOUT,
  };
};

export const Update = data => {
  return {
    type: types.UPDATE_USER,
    payload: data,
  };
};
