import { makeActionCreator } from '../state-utils/action-creators';

export const alertingActions = (actionPrefix, ...argNames) => {
  return {
    editAlertingEnable: makeActionCreator(
      `${actionPrefix}_EDIT_ENABLE`,
      'payload'
    ),
    editAlertingDisable: makeActionCreator(`${actionPrefix}_EDIT_DISABLE`),
    editAlertingSetSlackUrl: makeActionCreator(
      `${actionPrefix}_EDIT_SET_SLACKURL`,
      'receiver',
      'slackUrl'
    ),

    enableAlertingRequest: makeActionCreator(
      `${actionPrefix}_ENABLE_REQUEST`,
      ...argNames
    ),

    enableAlertingConfirm: makeActionCreator(
      `${actionPrefix}_ENABLE_COMPLETE`,
      'payload'
    ),

    enableAlertingFail: makeActionCreator(
      `${actionPrefix}_ENABLE_FAIL`,
      'error'
    ),

    enableAlertingReset: makeActionCreator(
      `${actionPrefix}_ENABLE_RESET`,
      ...argNames
    ),

    disableAlertingRequest: makeActionCreator(
      `${actionPrefix}_DISABLE_REQUEST`,
      ...argNames
    ),

    disableAlertingConfirm: makeActionCreator(
      `${actionPrefix}_DISABLE_COMPLETE`,
      'payload'
    ),

    disableAlertingFail: makeActionCreator(
      `${actionPrefix}_DISABLE_FAIL`,
      'error'
    ),

    disableAlertingReset: makeActionCreator(
      `${actionPrefix}_DISABLE_RESET`,
      ...argNames
    ),

    updateAlertingRequest: makeActionCreator(
      `${actionPrefix}_UPDATE_REQUEST`,
      ...argNames,
      'request'
    ),

    updateAlertingConfirm: makeActionCreator(
      `${actionPrefix}_UPDATE_COMPLETE`,
      'payload'
    ),

    updateAlertingFail: makeActionCreator(
      `${actionPrefix}_UPDATE_FAIL`,
      'error'
    ),

    updateAlertingReset: makeActionCreator(
      `${actionPrefix}_UPDATE_RESET`,
      ...argNames
    ),
    setAlertingSnapshot: makeActionCreator(
      `${actionPrefix}_SNAPSHOT`,
      'payload'
    ),
  };
};
