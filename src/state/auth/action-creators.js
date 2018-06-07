import actionTypes from './action-types';

export const loginRequest = () => ({
  type: actionTypes.AUTH_LOGIN_REQUEST,
});

export const loginSuccess = user => ({
  type: actionTypes.AUTH_LOGIN_SUCCESS,
  user,
});

export const loginReset = () => ({
  type: actionTypes.AUTH_LOGIN_RESET,
});

export const logout = () => ({
  type: actionTypes.AUTH_LOGOUT,
});
