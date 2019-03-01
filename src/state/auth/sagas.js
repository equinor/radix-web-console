import { delay } from 'redux-saga';
import { put, call, takeEvery } from 'redux-saga/effects';

import actionTypes from './action-types';
import { loginSuccess, logoutSuccess } from './action-creators';
import {
  login,
  logout,
  getSignedInADProfile,
  isAuthenticated,
} from '../../api/auth';
import { activeDirectoryProfileToUser } from '../../utils/user';

/**
 * Delay introduced to allow the browser to successfully initiate the redirect
 * to the external OAuth page without being cancelled by route changes
 */
export const REDIRECT_DELAY = 1000;

export function* signInFlow() {
  // yield put(loginRequest());

  try {
    let loggedIn = yield call(isAuthenticated);

    while (!loggedIn) {
      yield call(delay, REDIRECT_DELAY);
      yield call(login);
      loggedIn = yield call(isAuthenticated);
    }

    const adProfile = yield call(getSignedInADProfile);
    const user = activeDirectoryProfileToUser(adProfile);
    yield put(loginSuccess({ ...user }));
  } catch (e) {
    yield put(logoutSuccess());
    throw e;
  }
}

export function* signOutFlow() {
  yield call(logout);
  yield call(delay, REDIRECT_DELAY);
  yield put(logoutSuccess());
}

export default function* watchAuthentication() {
  yield takeEvery(actionTypes.AUTH_LOGIN_REQUEST, signInFlow);
  yield takeEvery(actionTypes.AUTH_LOGOUT, signOutFlow);

  // TODO: rewrite flow so is more in line with this:
  //
  // while (true) {
  //   try {
  //     yield take(actionTypes.AUTH_LOGIN_REQUEST);
  //     yield fork(signInFlow);
  //     yield take(actionTypes.AUTH_LOGOUT);
  //     yield call(signOutFlow);
  //   } catch (e) {
  //     console.error('Login flow failed', e);
  //   }
  // }
}
