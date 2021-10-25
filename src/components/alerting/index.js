import { AlertingConfigModel } from '../../models/alerting';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@equinor/eds-core-react';
import requestStates from '../../state/state-utils/request-states';
import {
  useBuildEditConfig,
  useBuildSlackReceiverNames,
  useIsSaving,
} from './effects';
import update from 'immutability-helper';
import * as React from 'react';
import { isEqual } from 'lodash';

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

const EditAlerting = ({ config, saveCallback, cancelEditCallback }) => {
  const editConfig = useBuildEditConfig(config);
  const [updatableEditConfig, setUpdatableEditConfig] = useState(editConfig);
  const [isDirty, setIsDirty] = useState(false);
  const slackReceivers = useBuildSlackReceiverNames(config);

  useEffect(() => setUpdatableEditConfig(editConfig), [editConfig]);

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

    setUpdatableEditConfig(newUpdatableEditConfig);
  };

  useEffect(
    () => setIsDirty(!isEqual(editConfig, updatableEditConfig)),
    [editConfig, updatableEditConfig]
  );

  return (
    <>
      {editConfig && (
        <UpdateSlackReceivers
          receivers={slackReceivers}
          slackUrlChangeCallback={onSlackUrlChange}
        />
      )}
      <div className="component-actions">
        <Button variant="outlined" onClick={() => cancelEditCallback()}>
          Cancel
        </Button>
        <Button
          disabled={!isDirty}
          onClick={() => saveCallback(updatableEditConfig)}
        >
          Save
        </Button>
      </div>
    </>
  );
};

EditAlerting.propTypes = {
  config: PropTypes.shape(AlertingConfigModel).isRequired,
  saveCallback: PropTypes.func.isRequired,
  cancelEditCallback: PropTypes.func.isRequired,
};

const AlertingReady = ({ config }) => {
  return (
    <>
      {config.receiverSecretStatus && (
        <div>
          {Object.entries(config.receiverSecretStatus).map((v) => (
            <Typography key={v[0]}>
              Slack webhook URL is{' '}
              <strong>
                {v[1].slackConfig.webhookUrlConfigured
                  ? 'configured'
                  : 'not configured'}
              </strong>
            </Typography>
          ))}
        </div>
      )}
    </>
  );
};

AlertingReady.propTypes = {
  config: PropTypes.shape(AlertingConfigModel).isRequired,
};

const AlertingEnabled = ({ config, saveCallback }) => {
  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const [configSnapshot, setConfigSnapshot] = useState({});

  const onEnableEditMode = (ev) => {
    setConfigSnapshot(config);
    setEditModeEnabled(true);
  };

  const cancelEditCallback = () => {
    setEditModeEnabled(false);
  };

  return (
    <>
      {config.ready ? (
        <>
          <AlertingReady config={config} />
          {editModeEnabled ? (
            <EditAlerting
              config={configSnapshot}
              saveCallback={saveCallback}
              cancelEditCallback={cancelEditCallback}
            />
          ) : (
            <div className="component-actions">
              <Button onClick={onEnableEditMode}>Edit</Button>
            </div>
          )}
        </>
      ) : (
        <Typography color="warning" as="span">
          Alerting is <string>not ready</string> to be configured yet.
        </Typography>
      )}
    </>
  );
};

AlertingEnabled.propTypes = {
  config: PropTypes.shape(AlertingConfigModel).isRequired,
  saveCallback: PropTypes.func.isRequired,
};

const AlertingOverview = ({ config, saveCallback }) => {
  return (
    <div className="grid grid--gap-medium">
      <Typography>
        Alerting is <strong>{config.enabled ? 'enabled' : 'disabled'}</strong>
      </Typography>
      {config.enabled && (
        <AlertingEnabled config={config} saveCallback={saveCallback} />
      )}
    </div>
  );
};

const AlertingCommands = ({
  config,
  isSaving,
  enableAlertingCallback,
  disableAlertingCallback,
}) => {
  const onEnableAlerting = (ev) => {
    ev.preventDefault();
    enableAlertingCallback();
  };
  const onDisableAlerting = (ev) => {
    ev.preventDefault();
    disableAlertingCallback();
  };
  return (
    <div className="component-actions">
      {config.enabled ? (
        <>
          <Button
            disabled={isSaving}
            color="danger"
            onClick={onDisableAlerting}
          >
            Disable Alerting
          </Button>
        </>
      ) : (
        <Button disabled={isSaving} onClick={onEnableAlerting}>
          Enable Alerting
        </Button>
      )}
    </div>
  );
};

AlertingCommands.propTypes = {
  config: PropTypes.shape(AlertingConfigModel).isRequired,
  enableAlertingCallback: PropTypes.func.isRequired,
  disableAlertingCallback: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
};

const Alerting = ({
  alertingConfig,
  enableAlerting,
  disableAlerting,
  updateAlerting,
  enableAlertingRequestState,
  disableAlertingRequestState,
  updateAlertingRequestState,
  enableAlertingLastError,
  disableAlertingLastError,
  updateAlertingLastError,
}) => {
  const [lastError, setLastError] = useState(undefined);

  useEffect(() => {
    if (enableAlertingRequestState === requestStates.FAILURE) {
      setLastError(enableAlertingLastError);
    }
  }, [enableAlertingRequestState, enableAlertingLastError]);

  useEffect(() => {
    if (disableAlertingRequestState === requestStates.FAILURE) {
      setLastError(disableAlertingLastError);
    }
  }, [disableAlertingRequestState, disableAlertingLastError]);

  useEffect(() => {
    if (updateAlertingRequestState === requestStates.FAILURE) {
      setLastError(updateAlertingLastError);
    }
  }, [updateAlertingRequestState, updateAlertingLastError]);

  const saveAlerting = (request) => {
    setLastError(undefined);
    updateAlerting(request);
  };

  // Handle isSaving state
  const isSaving = useIsSaving(
    enableAlertingRequestState,
    disableAlertingRequestState,
    updateAlertingRequestState
  );

  const onEnableAlerting = () => {
    setLastError(undefined);
    enableAlerting();
  };

  const onDisableAlerting = () => {
    setLastError(undefined);
    disableAlerting();
  };

  return (
    <div className="grid grid--gap-medium">
      <AlertingOverview config={alertingConfig} saveCallback={saveAlerting} />
      <AlertingCommands
        config={alertingConfig}
        isSaving={isSaving}
        enableAlertingCallback={onEnableAlerting}
        disableAlertingCallback={onDisableAlerting}
      />
      {lastError && <Typography color="danger">{lastError}</Typography>}
    </div>
  );
};

Alerting.propTypes = {
  alertingConfig: PropTypes.shape(AlertingConfigModel).isRequired,
  enableAlerting: PropTypes.func.isRequired,
  updateAlerting: PropTypes.func.isRequired,
  disableAlerting: PropTypes.func.isRequired,
  enableAlertingRequestState: PropTypes.oneOf(Object.values(requestStates)),
  disableAlertingRequestState: PropTypes.oneOf(Object.values(requestStates)),
  updateAlertingRequestState: PropTypes.oneOf(Object.values(requestStates)),
  enableAlertingLastError: PropTypes.string,
  disableAlertingLastError: PropTypes.string,
  updateAlertingLastError: PropTypes.string,
};

export default Alerting;
