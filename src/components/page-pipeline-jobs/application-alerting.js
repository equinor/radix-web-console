import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AlertingConfigModel,
  UpdateAlertingConfigModel,
} from '../../models/alerting';
import requestStates from '../../state/state-utils/request-states';
import { applicationAlertingState } from '../../state/application-alerting';
import alertingActions from '../../state/application-alerting/action-creators';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import { useEffect, useState } from 'react';
import AsyncResource from '../async-resource';
import Alerting from '../alerting';
import {
  Typography,
  Button,
  Icon,
  Scrim,
  Dialog,
} from '@equinor/eds-core-react';
import { notifications, notifications_off, clear } from '@equinor/eds-icons';

const ApplicationAlerting = ({
  appName,
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
    subscribe(appName);
    return () => {
      unsubscribe(appName);
    };
  }, [subscribe, unsubscribe, appName]);

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
    updateAlerting(appName, request);
  };

  const enableAlertingCallback = () => {
    enableAlerting(appName);
  };

  const disableAlertingCallback = () => {
    disableAlerting(appName);
  };

  return (
    <AsyncResource resource="APPLICATION_ALERTING" resourceParams={[appName]}>
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
              ></Icon>
            </Button>
          </Typography>
          {visibleScrim && (
            <Scrim className="scrim" onClose={() => setVisibleScrim(false)}>
              <Dialog className="environment-alerting-dialog-container">
                <Dialog.Title className="environment-alerting-dialog-header">
                  <Typography variant="h5">Alert Settings</Typography>
                  <Button
                    variant="ghost"
                    className="o-heading-page-button"
                    onClick={() => setVisibleScrim(false)}
                  >
                    <Icon data={clear} />
                  </Button>
                </Dialog.Title>
                <Dialog.CustomContent>
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
                  ></Alerting>
                </Dialog.CustomContent>
              </Dialog>
            </Scrim>
          )}
        </>
      )}
    </AsyncResource>
  );
};

ApplicationAlerting.propTypes = {
  appName: PropTypes.string.isRequired,
  alertingConfig: PropTypes.shape(AlertingConfigModel),
  alertingEditConfig: PropTypes.shape(UpdateAlertingConfigModel),
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
  enableAlerting: PropTypes.func.isRequired,
  resetEnableAlertingState: PropTypes.func.isRequired,
  updateAlerting: PropTypes.func.isRequired,
  resetUpdateAlertingState: PropTypes.func.isRequired,
  disableAlerting: PropTypes.func.isRequired,
  resetDisableAlertingState: PropTypes.func.isRequired,
  enableAlertingRequestState: PropTypes.oneOf(Object.values(requestStates)),
  disableAlertingRequestState: PropTypes.oneOf(Object.values(requestStates)),
  updateAlertingRequestState: PropTypes.oneOf(Object.values(requestStates)),
  enableAlertingLastError: PropTypes.string,
  disableAlertingLastError: PropTypes.string,
  updateAlertingLastError: PropTypes.string,
  isAlertingEditEnabled: PropTypes.bool.isRequired,
  isAlertingEditDirty: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
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
  isAlertingEditEnabled: applicationAlertingState.isAlertingEditEnabled(state),
  isAlertingEditDirty: applicationAlertingState.isAlertingEditDirty(state),
});

const mapDispatchToProps = (dispatch) => ({
  editAlertingEnable: (alertingConfig) =>
    dispatch(alertingActions.editAlertingEnable(alertingConfig)),
  editAlertingDisable: () => dispatch(alertingActions.editAlertingDisable()),
  editAlertingSetSlackUrl: (receiver, slackUrl) =>
    dispatch(alertingActions.editAlertingSetSlackUrl(receiver, slackUrl)),
  enableAlerting: (appName) =>
    dispatch(alertingActions.enableAlertingRequest(appName)),
  resetEnableAlertingState: (appName) =>
    dispatch(alertingActions.enableAlertingReset(appName)),
  disableAlerting: (appName) =>
    dispatch(alertingActions.disableAlertingRequest(appName)),
  resetDisableAlertingState: (appName) =>
    dispatch(alertingActions.disableAlertingReset(appName)),
  updateAlerting: (appName, request) =>
    dispatch(alertingActions.updateAlertingRequest(appName, request)),
  resetUpdateAlertingState: (appName) =>
    dispatch(alertingActions.updateAlertingReset(appName)),
  subscribe: (appName) => {
    dispatch(subscriptionActions.subscribeApplicationAlerting(appName));
  },
  unsubscribe: (appName) => {
    dispatch(subscriptionActions.unsubscribeApplicationAlerting(appName));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationAlerting);
