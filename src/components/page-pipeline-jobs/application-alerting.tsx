import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { notifications, notifications_off } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

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
import { applicationAlertingState } from '../../state/application-alerting';
import { actions as alertingActions } from '../../state/application-alerting/action-creators';
import { RequestState } from '../../state/state-utils/request-states';
import {
  subscribeApplicationAlerting,
  unsubscribeApplicationAlerting,
} from '../../state/subscriptions/action-creators';

import './style.css';

interface ApplicationAlertingDispatch {
  subscribe: (appName: string) => void;
  unsubscribe: (appName: string) => void;
  enableAlerting: (appName: string) => void;
  disableAlerting: (appName: string) => void;
  updateAlerting: (appName: string, request: UpdateAlertingConfigModel) => void;
  resetEnableAlertingState: (appName: string) => void;
  resetDisableAlertingState: (appName: string) => void;
  resetUpdateAlertingState: (appName: string) => void;
  editAlertingEnable: (alertingConfig: AlertingConfigModel) => void;
  editAlertingDisable: () => void;
  editAlertingSetSlackUrl: (receiver: string, slackUrl: string) => void;
}

interface ApplicationAlertingState {
  alertingConfig?: AlertingConfigModel;
  alertingEditConfig?: UpdateAlertingConfigModel;
  enableAlertingRequestState?: RequestState;
  disableAlertingRequestState?: RequestState;
  updateAlertingRequestState?: RequestState;
  enableAlertingLastError?: string;
  disableAlertingLastError?: string;
  updateAlertingLastError?: string;
  isAlertingEditEnabled: boolean;
  isAlertingEditDirty: boolean;
}

export interface ApplicationAlertingProps
  extends ApplicationAlertingDispatch,
    ApplicationAlertingState {
  appName: string;
}

const ApplicationAlerting: FunctionComponent<ApplicationAlertingProps> = ({
  appName,

  alertingConfig,
  alertingEditConfig,
  enableAlertingRequestState,
  disableAlertingRequestState,
  updateAlertingRequestState,
  enableAlertingLastError,
  disableAlertingLastError,
  updateAlertingLastError,
  isAlertingEditEnabled,
  isAlertingEditDirty,

  subscribe,
  unsubscribe,
  enableAlerting,
  disableAlerting,
  updateAlerting,
  resetEnableAlertingState,
  resetDisableAlertingState,
  resetUpdateAlertingState,
  editAlertingEnable,
  editAlertingDisable,
  editAlertingSetSlackUrl,
}) => {
  const [visibleScrim, setVisibleScrim] = useState(false);

  // Reset subscription on parameter change
  // Unsubscribe on unmount
  useEffect(() => {
    subscribe(appName);
    return () => unsubscribe(appName);
  }, [appName, subscribe, unsubscribe]);

  // Reset request states on component unmount
  useEffect(
    () => () => {
      resetDisableAlertingState(appName);
      resetEnableAlertingState(appName);
      resetUpdateAlertingState(appName);
    },
    [
      appName,
      resetDisableAlertingState,
      resetEnableAlertingState,
      resetUpdateAlertingState,
    ]
  );

  function updateAlertingCallback(request: UpdateAlertingConfigModel): void {
    updateAlerting(appName, request);
  }

  function enableAlertingCallback(): void {
    enableAlerting(appName);
  }

  function disableAlertingCallback(): void {
    disableAlerting(appName);
  }

  return (
    <AsyncResource resource="APPLICATION_ALERTING" resourceParams={[appName]}>
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
            <div className="application-alerting-content">
              <Alerting
                alertingConfig={alertingConfig}
                updateAlerting={updateAlertingCallback}
                enableAlerting={enableAlertingCallback}
                disableAlerting={disableAlertingCallback}
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

ApplicationAlerting.propTypes = {
  appName: PropTypes.string.isRequired,

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

  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
  enableAlerting: PropTypes.func.isRequired,
  disableAlerting: PropTypes.func.isRequired,
  updateAlerting: PropTypes.func.isRequired,
  resetEnableAlertingState: PropTypes.func.isRequired,
  resetDisableAlertingState: PropTypes.func.isRequired,
  resetUpdateAlertingState: PropTypes.func.isRequired,
  editAlertingEnable: PropTypes.func.isRequired,
  editAlertingDisable: PropTypes.func.isRequired,
  editAlertingSetSlackUrl: PropTypes.func.isRequired,
};

function mapStateToProps(state: RootState): ApplicationAlertingState {
  return {
    alertingConfig: applicationAlertingState.getAlertingConfig(state),
    enableAlertingRequestState:
      applicationAlertingState.getEnableAlertingRequestState(state),
    disableAlertingRequestState:
      applicationAlertingState.getDisableAlertingRequestState(state),
    updateAlertingRequestState:
      applicationAlertingState.getUpdateAlertingRequestState(state),
    enableAlertingLastError:
      applicationAlertingState.getEnableAlertingRequestError(state),
    disableAlertingLastError:
      applicationAlertingState.getDisableAlertingRequestError(state),
    updateAlertingLastError:
      applicationAlertingState.getUpdateAlertingRequestError(state),
    alertingEditConfig: applicationAlertingState.getAlertingEditConfig(state),
    isAlertingEditEnabled:
      applicationAlertingState.isAlertingEditEnabled(state),
    isAlertingEditDirty: applicationAlertingState.isAlertingEditDirty(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): ApplicationAlertingDispatch {
  return {
    subscribe: (appName) => dispatch(subscribeApplicationAlerting(appName)),
    unsubscribe: (appName) => dispatch(unsubscribeApplicationAlerting(appName)),
    enableAlerting: (appName) =>
      dispatch(alertingActions.enableAlertingRequest(appName)),
    disableAlerting: (appName) =>
      dispatch(alertingActions.disableAlertingRequest(appName)),
    updateAlerting: (appName, request) =>
      dispatch(alertingActions.updateAlertingRequest(appName, request)),
    resetEnableAlertingState: (appName) =>
      dispatch(alertingActions.enableAlertingReset(appName)),
    resetDisableAlertingState: (appName) =>
      dispatch(alertingActions.disableAlertingReset(appName)),
    resetUpdateAlertingState: (appName) =>
      dispatch(alertingActions.updateAlertingReset(appName)),
    editAlertingEnable: (alertingConfig) =>
      dispatch(alertingActions.editAlertingEnable(alertingConfig)),
    editAlertingDisable: () => dispatch(alertingActions.editAlertingDisable()),
    editAlertingSetSlackUrl: (receiver, slackUrl) =>
      dispatch(alertingActions.editAlertingSetSlackUrl(receiver, slackUrl)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationAlerting);
