import actionTypes from './action-types';

export const loginRequest = () => ({
  type: actionTypes.AUTH_LOGIN_REQUEST,
});

export const loginSuccess = user => ({
  type: actionTypes.AUTH_LOGIN_SUCCESS,
  user,
});

export const logoutSuccess = () => ({
  type: actionTypes.AUTH_LOGOUT,
});
