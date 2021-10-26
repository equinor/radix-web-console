import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AlertingConfigModel } from '../../models/alerting';
import requestStates from '../../state/state-utils/request-states';
import {
  getEnableAlertingRequestState,
  getDisableAlertingRequestState,
  getEnvironmentAlerting,
  getUpdateAlertingRequestState,
  getEnableAlertingRequestError,
  getDisableAlertingRequestError,
  getUpdateAlertingRequestError,
} from '../../state/environment-alerting';
import alertingActions from '../../state/environment-alerting/action-creators';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import { useEffect } from 'react';
import AsyncResource from '../async-resource';
import Alerting from '../alerting';
import { Accordion, Typography } from '@equinor/eds-core-react';

const EnvironmentAlerting = ({
  appName,
  envName,
  subscribe,
  unsubscribe,
  environmentAlerting,
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
}) => {
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
    <>
      <Accordion.Item isExpanded className="accordion elevated">
        <Accordion.Header>
          <Typography variant="h4">Alerting</Typography>
        </Accordion.Header>
        <Accordion.Panel>
          <AsyncResource
            resource="ENVIRONMENT_ALERTING"
            resourceParams={[appName, envName]}
          >
            {environmentAlerting && (
              <>
                <Alerting
                  alertingConfig={environmentAlerting}
                  updateAlerting={updateAlertingCallback}
                  enableAlerting={enableAlertingCallback}
                  disableAlerting={disableAlertingCallback}
                  enableAlertingRequestState={enableAlertingRequestState}
                  disableAlertingRequestState={disableAlertingRequestState}
                  updateAlertingRequestState={updateAlertingRequestState}
                  enableAlertingLastError={enableAlertingLastError}
                  disableAlertingLastError={disableAlertingLastError}
                  updateAlertingLastError={updateAlertingLastError}
                ></Alerting>
              </>
            )}
          </AsyncResource>
        </Accordion.Panel>
      </Accordion.Item>
    </>
  );
};

EnvironmentAlerting.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  environmentAlerting: PropTypes.shape(AlertingConfigModel),
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
};

const mapStateToProps = (state) => ({
  environmentAlerting: getEnvironmentAlerting(state),
  enableAlertingRequestState: getEnableAlertingRequestState(state),
  disableAlertingRequestState: getDisableAlertingRequestState(state),
  updateAlertingRequestState: getUpdateAlertingRequestState(state),
  enableAlertingLastError: getEnableAlertingRequestError(state),
  disableAlertingLastError: getDisableAlertingRequestError(state),
  updateAlertingLastError: getUpdateAlertingRequestError(state),
});

const mapDispatchToProps = (dispatch) => ({
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
  subscribe: (appName, envName) => {
    dispatch(
      subscriptionActions.subscribeEnvironmentAlerting(appName, envName)
    );
  },
  unsubscribe: (appName, envName) => {
    dispatch(
      subscriptionActions.unsubscribeEnvironmentAlerting(appName, envName)
    );
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnvironmentAlerting);
