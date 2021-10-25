import { AlertingConfigModel } from '../../models/alerting';
import PropTypes from 'prop-types';
import {
  getEnableAlertingRequestState,
  getDisableAlertingRequestState,
  getEnvironmentAlerting,
  getUpdateAlertingRequestState,
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

const AlertingEnabled = ({ appName, envName, config, saveAlerting }) => {
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

    setUpdatableEditconfig(newUpdatableEditConfig);
  };

  const onSaveAlerting = (ev) => {
    saveAlerting(updatableEditConfig);
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
      <Button onClick={onSaveAlerting}>Save</Button>
    </>
  );
};

AlertingEnabled.propTypes = {
  config: PropTypes.shape(AlertingConfigModel).isRequired,
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  saveAlerting: PropTypes.func.isRequired,
};

const AlertingOverview = ({ appName, envName, config, saveAlerting }) => {
  return (
    <>
      {config.enabled ? (
        <AlertingEnabled
          appName={appName}
          envName={envName}
          config={config}
          saveAlerting={saveAlerting}
        />
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
  saveAlerting: PropTypes.func.isRequired,
};

const Alerting = ({
  appName,
  envName,
  environmentAlerting,
  subscribe,
  unsubscribe,
  enableAlerting,
  disableAlerting,
  updateAlerting,
  enableAlertingRequestState,
  disableAlertingRequestState,
  updateAlertingRequestState,
  resetDisableAlertingState,
  resetEnableAlertingState,
  resetUpdateAlertingState,
}) => {
  const [lastRequestError, setLastRequestError] = useState();

  const saveAlerting = (request) => {
    updateAlerting(appName, envName, request);
  };

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
    disableAlertingRequestState,
    updateAlertingRequestState
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
              saveAlerting={saveAlerting}
            />
            {environmentAlerting.enabled ? (
              <>
                <Button
                  disabled={isSaving}
                  color="danger"
                  onClick={onDisableAlerting}
                >
                  Disable
                </Button>
              </>
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
  updateAlerting: PropTypes.func.isRequired,
  resetUpdateAlertingState: PropTypes.func.isRequired,
  disableAlerting: PropTypes.func.isRequired,
  resetDisableAlertingState: PropTypes.func.isRequired,
  enableAlertingRequestState: PropTypes.oneOf(Object.values(requestStates)),
  disableAlertingRequestState: PropTypes.oneOf(Object.values(requestStates)),
  updateAlertingRequestState: PropTypes.oneOf(Object.values(requestStates)),
};

const mapStateToProps = (state) => ({
  environmentAlerting: getEnvironmentAlerting(state),
  enableAlertingRequestState: getEnableAlertingRequestState(state),
  disableAlertingRequestState: getDisableAlertingRequestState(state),
  updateAlertingRequestState: getUpdateAlertingRequestState(state),
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
  updateAlerting: (appName, envName, request) =>
    dispatch(
      alertingActions.updateEnvironmentAlertingRequest(
        appName,
        envName,
        request
      )
    ),
  resetUpdateAlertingState: (appName, envName) =>
    dispatch(alertingActions.updateEnvironmentAlertingReset(appName, envName)),
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
