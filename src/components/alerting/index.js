import {
  AlertingConfigModel,
  UpdateAlertingConfigModel,
} from '../../models/alerting';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@equinor/eds-core-react';
import requestStates from '../../state/state-utils/request-states';
import { useBuildSlackReceiverNames, useIsSaving } from './effects';
import * as React from 'react';

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

const EditAlerting = ({ editConfig, editAlertingSetSlackUrl }) => {
  const slackReceivers = useBuildSlackReceiverNames(editConfig);
  const onSlackUrlChange = (receiver, slackUrl) => {
    editAlertingSetSlackUrl(receiver, slackUrl);
  };

  return (
    <>
      {editConfig && (
        <UpdateSlackReceivers
          receivers={slackReceivers}
          slackUrlChangeCallback={onSlackUrlChange}
        />
      )}
    </>
  );
};

EditAlerting.propTypes = {
  editConfig: PropTypes.shape(UpdateAlertingConfigModel).isRequired,
  editAlertingSetSlackUrl: PropTypes.func.isRequired,
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

const AlertingEnabled = ({ config }) => {
  return (
    <>
      {config.ready ? (
        <>
          <AlertingReady config={config} />
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
};

const AlertingOverview = ({ config }) => {
  return (
    <div className="grid grid--gap-medium">
      <Typography>
        Alerting is <strong>{config.enabled ? 'enabled' : 'disabled'}</strong>
      </Typography>
      {config.enabled && <AlertingEnabled config={config} />}
    </div>
  );
};

const AlertingCommands = ({
  config,
  isSaving,
  enableAlertingCallback,
  disableAlertingCallback,
  editAlertingEnableCallback,
  editAlertingDisableCallback,
  saveAlertingCallback,
  isAlertingEditEnabled,
  isAlertingEditDirty,
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
          {!isAlertingEditEnabled && (
            <Button onClick={editAlertingEnableCallback}>Edit</Button>
          )}
          {isAlertingEditEnabled && (
            <>
              <Button
                disabled={isSaving}
                variant="outlined"
                onClick={editAlertingDisableCallback}
              >
                Cancel Edit
              </Button>
              <Button
                disabled={!isAlertingEditDirty || isSaving}
                onClick={saveAlertingCallback}
              >
                Save
              </Button>
            </>
          )}
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
  editConfig: PropTypes.shape(UpdateAlertingConfigModel),
  enableAlertingCallback: PropTypes.func.isRequired,
  disableAlertingCallback: PropTypes.func.isRequired,
  editAlertingEnableCallback: PropTypes.func.isRequired,
  editAlertingDisableCallback: PropTypes.func.isRequired,
  saveAlertingCallback: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
  isAlertingEditEnabled: PropTypes.bool.isRequired,
  isAlertingEditDirty: PropTypes.bool.isRequired,
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
  alertingEditConfig,
  editAlertingEnable,
  editAlertingDisable,
  editAlertingSetSlackUrl,
  isAlertingEditEnabled,
  isAlertingEditDirty,
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

  // Disable editing on unmount
  useEffect(() => {
    return () => {
      editAlertingDisable();
    };
  }, [editAlertingDisable]);

  const onSaveAlerting = () => {
    setLastError(undefined);
    updateAlerting(alertingEditConfig);
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

  const onEditAlertingEnable = () => {
    editAlertingEnable(alertingConfig);
  };

  const onEditAlertingDisable = () => {
    editAlertingDisable();
  };

  return (
    <div className="grid grid--gap-medium">
      <AlertingOverview config={alertingConfig} />
      {isAlertingEditEnabled && (
        <EditAlerting
          editConfig={alertingEditConfig}
          editAlertingSetSlackUrl={editAlertingSetSlackUrl}
        />
      )}
      <AlertingCommands
        config={alertingConfig}
        isSaving={isSaving}
        enableAlertingCallback={onEnableAlerting}
        disableAlertingCallback={onDisableAlerting}
        editAlertingEnableCallback={onEditAlertingEnable}
        editAlertingDisableCallback={onEditAlertingDisable}
        isAlertingEditEnabled={isAlertingEditEnabled}
        isAlertingEditDirty={isAlertingEditDirty}
        saveAlertingCallback={onSaveAlerting}
      />
      {lastError && <Typography color="danger">{lastError}</Typography>}
    </div>
  );
};

Alerting.propTypes = {
  alertingConfig: PropTypes.shape(AlertingConfigModel).isRequired,
  alertingEditConfig: PropTypes.shape(UpdateAlertingConfigModel),
  editAlertingEnable: PropTypes.func.isRequired,
  editAlertingDisable: PropTypes.func.isRequired,
  editAlertingSetSlackUrl: PropTypes.func.isRequired,
  enableAlerting: PropTypes.func.isRequired,
  updateAlerting: PropTypes.func.isRequired,
  disableAlerting: PropTypes.func.isRequired,
  enableAlertingRequestState: PropTypes.oneOf(Object.values(requestStates)),
  disableAlertingRequestState: PropTypes.oneOf(Object.values(requestStates)),
  updateAlertingRequestState: PropTypes.oneOf(Object.values(requestStates)),
  enableAlertingLastError: PropTypes.string,
  disableAlertingLastError: PropTypes.string,
  updateAlertingLastError: PropTypes.string,
  isAlertingEditEnabled: PropTypes.bool.isRequired,
  isAlertingEditDirty: PropTypes.bool.isRequired,
};

export default Alerting;
