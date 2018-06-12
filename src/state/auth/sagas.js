import { delay } from 'redux-saga';
import { put, call, take } from 'redux-saga/effects';

import actionTypes from './action-types';
import { loginRequest, loginSuccess, logoutSuccess } from './action-creators';
import { login, logout, getSignedInUser } from '../../api/auth';

function* signInFlow(action) {
  yield put(loginRequest());
  const silent = !!action.payload;
  try {
    let userInfo = yield call(getSignedInUser);
    while (!userInfo && !silent) {
      yield delay(10);
      yield call(login);
      yield take(actionTypes.AUTH_LOGIN_SUCCESS);
      userInfo = yield call(getSignedInUser);
    }
    if (!userInfo && silent) {
      throw new Error('silent auth not possible');
    }

    const user = {
      userId: userInfo.userName,
      uniqueId: userInfo.profile.upn,
      displayableId: userInfo.profile.name,
      familyName: userInfo.profile.family_name,
      givenName: userInfo.profile.given_name,
      identityProvider: userInfo.profile.iss,
      ipaddr: userInfo.profile.ipaddr,
    };
    yield put(loginSuccess({ ...user }));
  } catch (e) {
    yield put(logoutSuccess());
    throw e;
  }
}

function* signOutFlow() {
  yield call(logout);
  yield delay(10);
  yield put(logoutSuccess());
}

export default function* watchAuthentication() {
  while (true) {
    try {
      const loginAction = yield take(actionTypes.AUTH_LOGIN_REQUEST);
      yield call(signInFlow, loginAction);

      yield take(actionTypes.AUTH_LOGOUT);
      yield call(signOutFlow);
    } catch (e) {
      console.warn('login flow failed');
    }
  }
}
