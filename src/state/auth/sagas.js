import { delay } from 'redux-saga';
import { put, call, take } from 'redux-saga/effects';

import actionTypes from './action-types';
import { loginRequest, loginSuccess, logoutSuccess } from './action-creators';
import { login, logout, getSignedInADProfile } from '../../api/auth';
import { activeDirectoryProfileToUser } from '../../utils/user';

/**
 * Delay introduced to allow the browser to successfully initiate the redirect
 * to the external OAuth page without being cancelled by route changes
 */
const REDIRECT_DELAY = 1000;

export function* signInFlow() {
  yield put(loginRequest());

  try {
    let adProfile = yield call(getSignedInADProfile);

    while (!adProfile) {
      yield call(delay, REDIRECT_DELAY);
      yield call(login);
      adProfile = yield call(getSignedInADProfile);
    }

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
  while (true) {
    try {
      yield take(actionTypes.AUTH_LOGIN_REQUEST);
      yield call(signInFlow);

      yield take(actionTypes.AUTH_LOGOUT);
      yield call(signOutFlow);
    } catch (e) {
      console.error('Login flow failed', e);
    }
  }
}
