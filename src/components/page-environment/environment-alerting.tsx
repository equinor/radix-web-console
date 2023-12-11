import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { notifications, notifications_off } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Alerting } from '../alerting';
import AsyncResource from '../async-resource';
import { ScrimPopup } from '../scrim-popup';
import { RootState } from '../../init/store';
import {
  AlertingConfigModel,
  AlertingConfigModelValidationMap,
} from '../../models/radix-api/alerting/alerting-config';
import {
  UpdateAlertingConfigModel,
  UpdateAlertingConfigModelValidationMap,
} from '../../models/radix-api/alerting/update-alerting-config';
import { environmentAlertingState } from '../../state/environment-alerting';
import { actions } from '../../state/environment-alerting/action-creators';
import { RequestState } from '../../state/state-utils/request-states';
import {
  subscribeEnvironmentAlerting,
  unsubscribeEnvironmentAlerting,
} from '../../state/subscriptions/action-creators';

import './style.css';

interface EnvironmentAlertingState {
  alertingConfig?: Readonly<AlertingConfigModel>;
  alertingEditConfig?: Readonly<UpdateAlertingConfigModel>;
  enableAlertingRequestState?: RequestState;
  disableAlertingRequestState?: RequestState;
  updateAlertingRequestState?: RequestState;
  enableAlertingLastError: string;
  disableAlertingLastError: string;
  updateAlertingLastError: string;
  isAlertingEditEnabled: boolean;
  isAlertingEditDirty: boolean;
}

interface EnvironmentAlertingDispatch {
  enableAlerting: (appName: string, envName: string) => void;
  disableAlerting: (appName: string, envName: string) => void;
  updateAlerting: (
    appName: string,
    envName: string,
    request: UpdateAlertingConfigModel
  ) => void;
  editAlertingEnable: (alertingConfig: AlertingConfigModel) => void;
  editAlertingDisable: () => void;
  editAlertingSetSlackUrl: (receiver: string, slackUrl: string) => void;
  resetEnableAlertingState: (appName: string, envName: string) => void;
  resetDisableAlertingState: (appName: string, envName: string) => void;
  resetUpdateAlertingState: (appName: string, envName: string) => void;
  subscribe: (appName: string, envName: string) => void;
  unsubscribe: (appName: string, envName: string) => void;
}

export interface EnvironmentAlertingProps
  extends EnvironmentAlertingState,
    EnvironmentAlertingDispatch {
  appName: string;
  envName: string;
}

const EnvironmentAlerting: FunctionComponent<EnvironmentAlertingProps> = ({
  appName,
  envName,
  subscribe,
  unsubscribe,
  alertingConfig,
  updateAlerting,
  enableAlerting,
  disableAlerting,
  enableAlertingRequestState,
  disableAlertingRequestState,
  updateAlertingRequestState,
  resetEnableAlertingState,
  resetDisableAlertingState,
  resetUpdateAlertingState,
  enableAlertingLastError,
  disableAlertingLastError,
  updateAlertingLastError,
  alertingEditConfig,
  editAlertingEnable,
  editAlertingDisable,
  editAlertingSetSlackUrl,
  isAlertingEditEnabled,
  isAlertingEditDirty,
}) => {
  const [visibleScrim, setVisibleScrim] = useState(false);

  // Reset subscription on parameter change
  // Unsubscribe on unmount
  useEffect(() => {
    subscribe(appName, envName);
    return () => unsubscribe(appName, envName);
  }, [subscribe, unsubscribe, appName, envName]);

  // Reset request states on component unmount
  useEffect(
    () => () => {
      resetDisableAlertingState(appName, envName);
      resetEnableAlertingState(appName, envName);
      resetUpdateAlertingState(appName, envName);
    },
    [
      appName,
      envName,
      resetDisableAlertingState,
      resetEnableAlertingState,
      resetUpdateAlertingState,
    ]
  );

  return (
    <AsyncResource
      resource="ENVIRONMENT_ALERTING"
      resourceParams={[appName, envName]}
    >
      {alertingConfig && (
        <>
          <Typography>
            Alerting is{' '}
            <Typography as="span" bold>
              {alertingConfig.enabled ? 'enabled' : 'disabled'}
            </Typography>{' '}
            <Button variant="ghost" onClick={() => setVisibleScrim(true)}>
              {alertingConfig.enabled ? 'Edit alert' : 'Setup alert'}
              <Icon
                data={
                  alertingConfig.enabled ? notifications : notifications_off
                }
              />
            </Button>
          </Typography>

          <ScrimPopup
            title="Alert Settings"
            open={visibleScrim}
            onClose={() => setVisibleScrim(false)}
          >
            <div className="environment-alerting-content">
              <Alerting
                alertingConfig={alertingConfig}
                updateAlerting={(request) =>
                  updateAlerting(appName, envName, request)
                }
                enableAlerting={() => enableAlerting(appName, envName)}
                disableAlerting={() => disableAlerting(appName, envName)}
                enableAlertingRequestState={enableAlertingRequestState}
                disableAlertingRequestState={disableAlertingRequestState}
                updateAlertingRequestState={updateAlertingRequestState}
                enableAlertingLastError={enableAlertingLastError}
                disableAlertingLastError={disableAlertingLastError}
                updateAlertingLastError={updateAlertingLastError}
                alertingEditConfig={alertingEditConfig}
                editAlertingEnable={editAlertingEnable}
                editAlertingDisable={editAlertingDisable}
                editAlertingSetSlackUrl={editAlertingSetSlackUrl}
                isAlertingEditEnabled={isAlertingEditEnabled}
                isAlertingEditDirty={isAlertingEditDirty}
              />
            </div>
          </ScrimPopup>
        </>
      )}
    </AsyncResource>
  );
};

EnvironmentAlerting.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  alertingConfig: PropTypes.shape(
    AlertingConfigModelValidationMap
  ) as PropTypes.Validator<AlertingConfigModel>,
  alertingEditConfig: PropTypes.shape(
    UpdateAlertingConfigModelValidationMap
  ) as PropTypes.Validator<UpdateAlertingConfigModel>,
  enableAlertingRequestState: PropTypes.oneOf(Object.values(RequestState)),
  disableAlertingRequestState: PropTypes.oneOf(Object.values(RequestState)),
  updateAlertingRequestState: PropTypes.oneOf(Object.values(RequestState)),
  enableAlertingLastError: PropTypes.string,
  disableAlertingLastError: PropTypes.string,
  updateAlertingLastError: PropTypes.string,
  isAlertingEditEnabled: PropTypes.bool.isRequired,
  isAlertingEditDirty: PropTypes.bool.isRequired,
  enableAlerting: PropTypes.func.isRequired,
  disableAlerting: PropTypes.func.isRequired,
  updateAlerting: PropTypes.func.isRequired,
  editAlertingEnable: PropTypes.func.isRequired,
  editAlertingDisable: PropTypes.func.isRequired,
  editAlertingSetSlackUrl: PropTypes.func.isRequired,
  resetEnableAlertingState: PropTypes.func.isRequired,
  resetUpdateAlertingState: PropTypes.func.isRequired,
  resetDisableAlertingState: PropTypes.func.isRequired,
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
};

export default connect<
  EnvironmentAlertingState,
  EnvironmentAlertingDispatch,
  {},
  RootState
>(
  (state) => ({
    alertingConfig: environmentAlertingState.getAlertingConfig(state),
    enableAlertingRequestState:
      environmentAlertingState.getEnableAlertingRequestState(state),
    disableAlertingRequestState:
      environmentAlertingState.getDisableAlertingRequestState(state),
    updateAlertingRequestState:
      environmentAlertingState.getUpdateAlertingRequestState(state),
    enableAlertingLastError:
      environmentAlertingState.getEnableAlertingRequestError(state),
    disableAlertingLastError:
      environmentAlertingState.getDisableAlertingRequestError(state),
    updateAlertingLastError:
      environmentAlertingState.getUpdateAlertingRequestError(state),
    alertingEditConfig: environmentAlertingState.getAlertingEditConfig(state),
    isAlertingEditEnabled:
      environmentAlertingState.isAlertingEditEnabled(state),
    isAlertingEditDirty: environmentAlertingState.isAlertingEditDirty(state),
  }),
  (dispatch) => ({
    editAlertingEnable: (alertingConfig) =>
      dispatch(actions.editAlertingEnable(alertingConfig)),
    editAlertingDisable: () => dispatch(actions.editAlertingDisable()),
    editAlertingSetSlackUrl: (receiver, slackUrl) =>
      dispatch(actions.editAlertingSetSlackUrl(receiver, slackUrl)),
    enableAlerting: (appName, envName) =>
      dispatch(actions.enableAlertingRequest(appName, envName)),
    resetEnableAlertingState: (appName, envName) =>
      dispatch(actions.enableAlertingReset(appName, envName)),
    disableAlerting: (appName, envName) =>
      dispatch(actions.disableAlertingRequest(appName, envName)),
    resetDisableAlertingState: (appName, envName) =>
      dispatch(actions.disableAlertingReset(appName, envName)),
    updateAlerting: (appName, envName, request) =>
      dispatch(actions.updateAlertingRequest(appName, envName, request)),
    resetUpdateAlertingState: (appName, envName) =>
      dispatch(actions.updateAlertingReset(appName, envName)),
    subscribe: (appName, envName) =>
      dispatch(subscribeEnvironmentAlerting(appName, envName)),
    unsubscribe: (appName, envName) =>
      dispatch(unsubscribeEnvironmentAlerting(appName, envName)),
  })
)(EnvironmentAlerting);
