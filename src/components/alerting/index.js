import {
  AlertingConfigModel,
  UpdateAlertingConfigModel,
} from '../../models/alerting';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Typography } from '@equinor/eds-core-react';
import requestStates from '../../state/state-utils/request-states';
import { EditAlerting } from './edit-alerting';
import { AlertingCommands } from './alerting-commands';
import { AlertingOverview } from './alerting-overview';

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
