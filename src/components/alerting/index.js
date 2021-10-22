import { AlertingConfigModel } from '../../models/alerting';
import PropTypes from 'prop-types';
import {
  getEnableAlertingRequestState,
  getDisableAlertingRequestState,
  getEnvironmentAlerting,
} from '../../state/environment-alerting';
import alertingActions from '../../state/environment-alerting/action-creators';
import { connect } from 'react-redux';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import { useEffect, useState } from 'react';
import AsyncResource from '../async-resource';
import { Button, TextField, Typography } from '@equinor/eds-core-react';
import requestStates from '../../state/state-utils/request-states';
import {
  useBuildEditConfig,
  useBuildSlackReceiverNames,
  useIsSaving,
} from './effects';
import update from 'immutability-helper';
import * as React from 'react';

const AlertingDisabled = () => {
  return (
    <>
      <Typography>Alerting is disabled</Typography>
    </>
  );
};

const UpdateSlackReceivers = ({ receivers, slackUrlChangeCallback }) => {
  return (
    <>
      {receivers &&
        receivers.map((receiver) => (
          <React.Fragment key={receiver}>
            <TextField
              type="url"
              label="Slack webhook URL"
              placeholder="Enter a Slack webhook URL where alerts should be sent"
              onChange={(ev) =>
                slackUrlChangeCallback(receiver, ev.target.value)
              }
            />
          </React.Fragment>
        ))}
    </>
  );
};

UpdateSlackReceivers.propTypes = {
  receivers: PropTypes.arrayOf(PropTypes.string).isRequired,
  slackUrlChangeCallback: PropTypes.func.isRequired,
};

const AlertingEnabled = ({ appName, envName, config }) => {
  const editConfig = useBuildEditConfig(appName, envName, config);
  const [updatableEditConfig, setUpdatableEditconfig] = useState(editConfig);
  const slackReceivers = useBuildSlackReceiverNames(config);
  useEffect(() => setUpdatableEditconfig(editConfig), [editConfig]);

  const onSlackUrlChange = (receiver, slackUrl) => {
    const emptySlackUrl = slackUrl ? slackUrl.length === 0 : true;
    const newUpdatableEditConfig = update(updatableEditConfig, {
      receiverSecrets: (rs) =>
        update(rs, {
          [receiver]: (r) =>
            update(r, {
              slackConfig: {
                $merge: { webhookUrl: emptySlackUrl ? undefined : slackUrl },
              },
            }),
        }),
    });

    console.log('newObj', JSON.stringify(newUpdatableEditConfig));
    setUpdatableEditconfig(newUpdatableEditConfig);
  };

  return (
    <>
      <Typography as="span">Alerting is enabled</Typography>
      {editConfig && (
        <UpdateSlackReceivers
          receivers={slackReceivers}
          slackUrlChangeCallback={onSlackUrlChange}
        />
      )}
    </>
  );
};

AlertingEnabled.propTypes = {
  config: PropTypes.shape(AlertingConfigModel).isRequired,
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
};

const AlertingOverview = ({ appName, envName, config }) => {
  return (
    <>
      {config.enabled ? (
        <AlertingEnabled appName={appName} envName={envName} config={config} />
      ) : (
        <AlertingDisabled />
      )}
    </>
  );
};

AlertingOverview.propTypes = {
  config: PropTypes.shape(AlertingConfigModel).isRequired,
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
};

const Alerting = ({
  appName,
  envName,
  environmentAlerting,
  subscribe,
  unsubscribe,
  enableAlerting,
  disableAlerting,
  enableAlertingRequestState,
  disableAlertingRequestState,
  resetDisableAlertingState,
  resetEnableAlertingState,
}) => {
  const [lastRequestError, setLastRequestError] = useState();

  // Reset request states on component unmount
  useEffect(
    () => () => {
      resetDisableAlertingState();
      resetEnableAlertingState();
    },
    [resetDisableAlertingState, resetEnableAlertingState]
  );

  // Start and stop subscription on mount/unmount
  useEffect(() => {
    subscribe();
    return () => {
      unsubscribe();
    };
  }, [subscribe, unsubscribe]);

  // Handle isSaving state
  const isSaving = useIsSaving(
    enableAlertingRequestState,
    disableAlertingRequestState
  );

  const onEnableAlerting = (ev) => {
    ev.preventDefault();
    enableAlerting(appName, envName);
  };

  const onDisableAlerting = (ev) => {
    ev.preventDefault();
    disableAlerting(appName, envName);
  };

  return (
    <>
      <AsyncResource
        resource="ENVIRONMENT_ALERTING"
        resourceParams={[appName, envName]}
      >
        {environmentAlerting && (
          <>
            <AlertingOverview
              appName={appName}
              envName={envName}
              config={environmentAlerting}
            />
            {environmentAlerting.enabled ? (
              <Button
                disabled={isSaving}
                color="danger"
                onClick={onDisableAlerting}
              >
                Disable
              </Button>
            ) : (
              <Button disabled={isSaving} onClick={onEnableAlerting}>
                Enable
              </Button>
            )}
            {lastRequestError && (
              <Typography color="danger">{lastRequestError}</Typography>
            )}
          </>
        )}
      </AsyncResource>
    </>
  );
};

Alerting.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  environmentAlerting: PropTypes.shape(AlertingConfigModel),
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
  enableAlerting: PropTypes.func.isRequired,
  resetEnableAlertingState: PropTypes.func.isRequired,
  disableAlerting: PropTypes.func.isRequired,
  resetDisableAlertingState: PropTypes.func.isRequired,
  enableAlertingRequestState: PropTypes.oneOf(Object.values(requestStates)),
  disableAlertingRequestState: PropTypes.oneOf(Object.values(requestStates)),
};

const mapStateToProps = (state) => ({
  environmentAlerting: getEnvironmentAlerting(state),
  enableAlertingRequestState: getEnableAlertingRequestState(state),
  disableAlertingRequestState: getDisableAlertingRequestState(state),
});

const mapDispatchToProps = (dispatch, { appName, envName }) => ({
  enableAlerting: (appName, envName) =>
    dispatch(
      alertingActions.enableEnvironmentAlertingRequest(appName, envName)
    ),
  resetEnableAlertingState: (appName, envName) =>
    dispatch(alertingActions.enableEnvironmentAlertingReset(appName, envName)),
  disableAlerting: (appName, envName) =>
    dispatch(
      alertingActions.disableEnvironmentAlertingRequest(appName, envName)
    ),
  resetDisableAlertingState: (appName, envName) =>
    dispatch(alertingActions.disableEnvironmentAlertingReset(appName, envName)),
  subscribe: () => {
    dispatch(
      subscriptionActions.subscribeEnvironmentAlerting(appName, envName)
    );
  },
  unsubscribe: (oldAppName = appName, oldEnvName = envName) => {
    dispatch(
      subscriptionActions.unsubscribeEnvironmentAlerting(oldAppName, oldEnvName)
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Alerting);
