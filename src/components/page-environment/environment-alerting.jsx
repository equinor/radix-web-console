import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { notifications, notifications_off } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Alerting } from '../alerting';
import AsyncResource from '../async-resource';
import { ScrimPopup } from '../scrim-popup';
import { AlertingConfigModelValidationMap } from '../../models/radix-api/alerting/alerting-config';
import { UpdateAlertingConfigModelValidationMap } from '../../models/radix-api/alerting/update-alerting-config';
import { environmentAlertingState } from '../../state/environment-alerting';
import { actions as alertingActions } from '../../state/environment-alerting/action-creators';
import { RequestState } from '../../state/state-utils/request-states';
import {
  subscribeEnvironmentAlerting,
  unsubscribeEnvironmentAlerting,
} from '../../state/subscriptions/action-creators';

import './style.css';

const EnvironmentAlerting = ({
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
    return () => {
      unsubscribe(appName, envName);
    };
  }, [subscribe, unsubscribe, appName, envName]);

  // Reset request states on component unmount
  useEffect(
    () => () => {
      resetDisableAlertingState();
      resetEnableAlertingState();
      resetUpdateAlertingState();
    },
    [
      resetDisableAlertingState,
      resetEnableAlertingState,
      resetUpdateAlertingState,
    ]
  );

  const updateAlertingCallback = (request) => {
    updateAlerting(appName, envName, request);
  };

  const enableAlertingCallback = () => {
    enableAlerting(appName, envName);
  };

  const disableAlertingCallback = () => {
    disableAlerting(appName, envName);
  };

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
              {alertingConfig?.enabled ? 'enabled' : 'disabled'}
            </Typography>{' '}
            <Button variant="ghost" onClick={() => setVisibleScrim(true)}>
              {alertingConfig?.enabled ? 'Edit alert' : 'Setup alert'}
              <Icon
                data={
                  alertingConfig?.enabled ? notifications : notifications_off
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

EnvironmentAlerting.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  alertingConfig: PropTypes.shape(AlertingConfigModelValidationMap),
  alertingEditConfig: PropTypes.shape(UpdateAlertingConfigModelValidationMap),
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
  enableAlerting: PropTypes.func.isRequired,
  resetEnableAlertingState: PropTypes.func.isRequired,
  updateAlerting: PropTypes.func.isRequired,
  resetUpdateAlertingState: PropTypes.func.isRequired,
  disableAlerting: PropTypes.func.isRequired,
  resetDisableAlertingState: PropTypes.func.isRequired,
  enableAlertingRequestState: PropTypes.oneOf(Object.values(RequestState)),
  disableAlertingRequestState: PropTypes.oneOf(Object.values(RequestState)),
  updateAlertingRequestState: PropTypes.oneOf(Object.values(RequestState)),
  enableAlertingLastError: PropTypes.string,
  disableAlertingLastError: PropTypes.string,
  updateAlertingLastError: PropTypes.string,
  isAlertingEditEnabled: PropTypes.bool.isRequired,
  isAlertingEditDirty: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
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
  isAlertingEditEnabled: environmentAlertingState.isAlertingEditEnabled(state),
  isAlertingEditDirty: environmentAlertingState.isAlertingEditDirty(state),
});

const mapDispatchToProps = (dispatch) => ({
  editAlertingEnable: (alertingConfig) =>
    dispatch(alertingActions.editAlertingEnable(alertingConfig)),
  editAlertingDisable: () => dispatch(alertingActions.editAlertingDisable()),
  editAlertingSetSlackUrl: (receiver, slackUrl) =>
    dispatch(alertingActions.editAlertingSetSlackUrl(receiver, slackUrl)),
  enableAlerting: (appName, envName) =>
    dispatch(alertingActions.enableAlertingRequest(appName, envName)),
  resetEnableAlertingState: (appName, envName) =>
    dispatch(alertingActions.enableAlertingReset(appName, envName)),
  disableAlerting: (appName, envName) =>
    dispatch(alertingActions.disableAlertingRequest(appName, envName)),
  resetDisableAlertingState: (appName, envName) =>
    dispatch(alertingActions.disableAlertingReset(appName, envName)),
  updateAlerting: (appName, envName, request) =>
    dispatch(alertingActions.updateAlertingRequest(appName, envName, request)),
  resetUpdateAlertingState: (appName, envName) =>
    dispatch(alertingActions.updateAlertingReset(appName, envName)),
  subscribe: (appName, envName) =>
    dispatch(subscribeEnvironmentAlerting(appName, envName)),
  unsubscribe: (appName, envName) =>
    dispatch(unsubscribeEnvironmentAlerting(appName, envName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnvironmentAlerting);
