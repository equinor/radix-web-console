import {
  combineReducers,
  createAction,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { actionTypes } from './action-types';

import { restartState } from '../restart-base';
import { restartReducer } from '../restart-base/reducer';
import { startState } from '../start-base';
import { startReducer } from '../start-base/reducer';
import type { ActionType } from '../state-utils/action-creators';
import { stopState } from '../stop-base';
import { stopReducer } from '../stop-base/reducer';
import {
  SubscriptionsActionMeta,
  SubscriptionsActionTypes,
} from '../subscriptions/action-types';
import type { ApiResourceKey } from '../../api/resources';
import type { RootState } from '../../init/store';
import type { RawModel } from '../../models/model-types';
import { ConfigurationStatus } from '../../models/radix-api/environments/configuration-status';
import type { EnvironmentModel } from '../../models/radix-api/environments/environment';
import { EnvironmentModelNormalizer } from '../../models/radix-api/environments/environment/normalizer';
import type { SecretModel } from '../../models/radix-api/secrets/secret';

const initialState: {
  environment: EnvironmentModel;
  isDeleted?: boolean;
  error?: string;
} = {
  environment: { name: '', status: ConfigurationStatus.Pending },
  error: null,
};

const snapshotAction = createAction<
  EnvironmentModel | RawModel<EnvironmentModel>
>(actionTypes.ENVIRONMENT_SNAPSHOT);
const subscriptionEndedAction = createAction<void>(
  SubscriptionsActionTypes.SUBSCRIPTION_ENDED
);

const envSlice = createSlice({
  name: 'environment',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(snapshotAction, (_, { payload }) => ({
        environment: EnvironmentModelNormalizer(payload),
        error: null,
      }))
      .addCase(subscriptionEndedAction, (state, action) =>
        (action as ActionType<never, SubscriptionsActionMeta<ApiResourceKey>>)
          .meta.resourceName === 'ENVIRONMENT'
          ? initialState
          : state
      )
      .addDefaultCase((state) => state),
});

export const environmentRestartState = restartState('environment');
export const environmentStartState = startState('environment');
export const environmentStopState = stopState('environment');

/**
 * Get the current environment
 * @param {Object} state Redux state
 */
export const getMemoizedEnvironment = createSelector(
  (state: RootState) => state.environment.instance.environment,
  (environment) => environment
);

export function getComponentSecret(
  env: EnvironmentModel,
  secretName: string,
  componentName: string
): SecretModel {
  return env?.activeDeployment
    ? env.secrets?.find(
        ({ name, component }) =>
          name === secretName && component === componentName
      )
    : null;
}

export function getSecret(
  state: RootState,
  componentName: string,
  secretName: string
): SecretModel {
  return getComponentSecret(
    { ...getMemoizedEnvironment(state) },
    secretName,
    componentName
  );
}

export const reducer = combineReducers({
  instance: envSlice.reducer,
  restartRequest: restartReducer('ENVIRONMENT'),
  startRequest: startReducer('ENVIRONMENT'),
  stopRequest: stopReducer('ENVIRONMENT'),
});
export default reducer;
