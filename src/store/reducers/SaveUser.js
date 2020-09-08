import * as types from '../actions/actionTypes';

const initialState = {};

export const saveUser = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_USER:
      return action.payload;
    case types.UPDATE_USER:
      return {...state, ...action.payload};
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
