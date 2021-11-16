import { makeLocalGetter } from '../../utils/object';
import requestStates from '../state-utils/request-states';
import { isEqual } from 'lodash';

export const alertingState = (stateRootKey) => {
  const localGetter = makeLocalGetter(stateRootKey);
  const requestStatusGetter = (state, requestKey) =>
    localGetter(state, [requestKey, 'status'], requestStates.IDLE);
  const requestErrorGetter = (state, requestKey) =>
    localGetter(state, [requestKey, 'lastError'], requestStates.IDLE);

  return {
    getAlertingConfig: (state) => localGetter(state, 'instance'),

    getAlertingEditConfig: (state) => localGetter(state, 'edit').editConfig,

    isAlertingEditEnabled: (state) => localGetter(state, 'edit').editing,

    isAlertingEditDirty: (state) => {
      const editState = localGetter(state, 'edit');
      const dirty = editState.editing
        ? !isEqual(editState.editConfig, editState.originalEditConfig)
        : false;
      return dirty;
    },

    getEnableAlertingRequestState: (state) =>
      requestStatusGetter(state, 'enableRequest'),

    getDisableAlertingRequestState: (state) =>
      requestStatusGetter(state, 'disableRequest'),

    getUpdateAlertingRequestState: (state) =>
      requestStatusGetter(state, 'updateRequest'),

    getEnableAlertingRequestError: (state) =>
      requestErrorGetter(state, 'enableRequest'),

    getDisableAlertingRequestError: (state) =>
      requestErrorGetter(state, 'disableRequest'),

    getUpdateAlertingRequestError: (state) =>
      requestErrorGetter(state, 'updateRequest'),
  };
};
