import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AlertingConfigModel } from '../../models/alerting';
import requestStates from '../../state/state-utils/request-states';
import {
  getEnableAlertingRequestState,
  getDisableAlertingRequestState,
  getApplicationAlerting,
  getUpdateAlertingRequestState,
  getEnableAlertingRequestError,
  getDisableAlertingRequestError,
  getUpdateAlertingRequestError,
} from '../../state/application-alerting';
import alertingActions from '../../state/application-alerting/action-creators';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import { useEffect } from 'react';
import AsyncResource from '../async-resource';
import Alerting from '../alerting';
import { Accordion, Typography } from '@equinor/eds-core-react';

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
}) => {
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
    <>
      <Accordion.Item isExpanded className="accordion elevated">
        <Accordion.Header>
          <Typography variant="h4">Alerting</Typography>
        </Accordion.Header>
        <Accordion.Panel>
          <AsyncResource
            resource="APPLICATION_ALERTING"
            resourceParams={[appName]}
          >
            {alertingConfig && (
              <>
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
                ></Alerting>
              </>
            )}
          </AsyncResource>
        </Accordion.Panel>
      </Accordion.Item>
    </>
  );
};

ApplicationAlerting.propTypes = {
  appName: PropTypes.string.isRequired,
  alertingConfig: PropTypes.shape(AlertingConfigModel),
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
  alertingConfig: getApplicationAlerting(state),
  enableAlertingRequestState: getEnableAlertingRequestState(state),
  disableAlertingRequestState: getDisableAlertingRequestState(state),
  updateAlertingRequestState: getUpdateAlertingRequestState(state),
  enableAlertingLastError: getEnableAlertingRequestError(state),
  disableAlertingLastError: getDisableAlertingRequestError(state),
  updateAlertingLastError: getUpdateAlertingRequestError(state),
});

const mapDispatchToProps = (dispatch) => ({
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
