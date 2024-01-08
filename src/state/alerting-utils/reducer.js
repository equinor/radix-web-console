import { SubscriptionsActionTypes } from '../subscriptions/action-types';
import { AlertingConfigModelNormalizer } from '../../models/radix-api/alerting/alerting-config/normalizer';
import { combineReducers } from 'redux';
import { makeRequestReducer } from '../state-utils/request';
import { createReducer } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
import update from 'immutability-helper';
import { buildEditConfig } from './utils';

const initialState = null;

export const alertingReducer = (actionPrefix) => {
  const editReducer = createReducer({ editing: false }, (builder) => {
    builder.addCase(`${actionPrefix}_EDIT_ENABLE`, (state, action) => {
      state.originalEditConfig = buildEditConfig(action.payload);
      state.editConfig = cloneDeep(state.originalEditConfig);
      state.editing = true;
    });
    builder.addCase(`${actionPrefix}_EDIT_DISABLE`, (state) => {
      delete state.originalEditConfig;
      delete state.editConfig;
      state.editing = false;
    });
    builder.addCase(`${actionPrefix}_EDIT_SET_SLACKURL`, (state, action) => {
      const emptySlackUrl = action.slackUrl
        ? action.slackUrl.trim().length === 0
        : true;
      state.editConfig = update(state.editConfig, {
        receiverSecrets: (rs) =>
          update(rs, {
            [action.receiver]: (r) =>
              update(r, {
                slackConfig: {
                  $merge: {
                    webhookUrl: emptySlackUrl
                      ? undefined
                      : action.slackUrl.trim(),
                  },
                },
              }),
          }),
      });
    });
  });

  const instanceReducer = (state = initialState, action) => {
    switch (action.type) {
      case `${actionPrefix}_SNAPSHOT`:
        return AlertingConfigModelNormalizer(action.payload);
      case SubscriptionsActionTypes.SUBSCRIPTION_ENDED:
        return action.resourceName === actionPrefix ? initialState : state;
      default:
        return state;
    }
  };

  return combineReducers({
    edit: editReducer,
    instance: instanceReducer,
    enableRequest: makeRequestReducer(`${actionPrefix}_ENABLE`),
    disableRequest: makeRequestReducer(`${actionPrefix}_DISABLE`),
    updateRequest: makeRequestReducer(`${actionPrefix}_UPDATE`),
  });
};
