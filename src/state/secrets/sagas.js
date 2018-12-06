import { call, takeLatest, put } from 'redux-saga/effects';
import { saveComponentSecret } from '../../api/secrets';

import actionCreators from './action-creators';
import actionTypes from './action-types';

export default function*() {
  yield takeLatest(actionTypes.SECRETS_SAVE_REQUEST, saveSecret);
}

export function* saveSecret(action) {
  try {
    console.log(action)
    yield call(
      saveComponentSecret,
      action.appName,
      action.envName,
      action.componentName,
      action.secretName,
      action.value
    );
    yield put(actionCreators.saveConfirm());
  } catch (e) {
    yield put(actionCreators.saveFail(action.secretName, e.toString()));
  }
}
