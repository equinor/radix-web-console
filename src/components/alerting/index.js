import {
  AlertingConfigModel,
  UpdateAlertingConfigModel,
} from '../../models/alerting';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Typography, Icon } from '@equinor/eds-core-react';
import requestStates from '../../state/state-utils/request-states';
import { EditAlerting } from './edit-alerting';
import { AlertingActions } from './alerting-actions';
import { AlertingConfigStatus } from './alerting-overview';
import { info_circle } from '@equinor/eds-icons';
import externalUrls from '../../externalUrls';
import Alert from '../alert';

const isAnyStateInProgress = (...states) =>
  states.some((state) => state === requestStates.IN_PROGRESS);

const useIsSaving = (...states) => {
  const [isSaving, setIsSaving] = useState(false);
  useEffect(
    () => setIsSaving(isAnyStateInProgress(...states)),
    [states, setIsSaving]
  );

  return isSaving;
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
  const [isNotReady, setIsNotReady] = useState(false);

  useEffect(
    () => setIsNotReady(alertingConfig.enabled && !alertingConfig.ready),
    [alertingConfig]
  );

  useEffect(() => {
    if (isNotReady) {
      setLastError({
        type: 'warning',
        message:
          'Alert is not ready to be configured yet. Please wait a few minutes. If the problem persists, get in touch on our Slack support channel.',
      });
    } else {
      setLastError(undefined);
    }
  }, [isNotReady]);

  useEffect(() => {
    if (enableAlertingRequestState === requestStates.FAILURE) {
      setLastError({ message: enableAlertingLastError });
    }
  }, [enableAlertingRequestState, enableAlertingLastError]);

  useEffect(() => {
    if (disableAlertingRequestState === requestStates.FAILURE) {
      setLastError({ message: disableAlertingLastError });
    }
  }, [disableAlertingRequestState, disableAlertingLastError]);

  useEffect(() => {
    if (updateAlertingRequestState === requestStates.FAILURE) {
      setLastError({ message: updateAlertingLastError });
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
      <Alert className="icon">
        <Icon data={info_circle} color="primary" />
        <div>
          <Typography>
            You can setup Radix to send alerts to a Slack channel. See{' '}
            <Typography
              link
              href={externalUrls.alertingGuide}
              rel="noopener noreferrer"
              target="_blank"
            >
              Radix documentation on alert setup
            </Typography>
          </Typography>
        </div>
      </Alert>
      <AlertingConfigStatus config={alertingConfig} />
      {isAlertingEditEnabled && (
        <EditAlerting
          editConfig={alertingEditConfig}
          editAlertingSetSlackUrl={editAlertingSetSlackUrl}
        />
      )}
      {lastError && (
        <Alert type={lastError.type ?? 'danger'}>{lastError.message}</Alert>
      )}
      <AlertingActions
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
