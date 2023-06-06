import { call, put, takeLatest } from 'redux-saga/effects';

import { actions } from './action-creators';
import { actionTypes } from './action-types';

import { ActionType } from '../state-utils/action-creators';
import { createApp } from '../../api/apps';
import { ApplicationRegistrationUpsertResponseModel } from '../../models/radix-api/applications/application-registration-upsert-response';

function* createAppWatch() {
  yield takeLatest(actionTypes.APP_CREATION_REQUEST, createAppFlow);
}

export function* createAppFlow(
  action: ActionType<never, { app: Parameters<typeof createApp>[0] }>
) {
  try {
    const appRegistrationInsertResult: ApplicationRegistrationUpsertResponseModel =
      yield call(createApp, action.meta.app);
    yield put(actions.addAppConfirm(appRegistrationInsertResult));
  } catch (e) {
    yield put(actions.addAppFail(e.toString()));
  }
}

export default function* createApplicationSaga() {
  yield createAppWatch();
}
