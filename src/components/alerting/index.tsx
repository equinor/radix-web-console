import { Icon, Typography } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent, useEffect, useState } from 'react';

import { AlertingActions } from './alerting-actions';
import { AlertingConfigStatus } from './alerting-overview';
import { EditAlerting } from './edit-alerting';

import { Alert, AlertType } from '../alert';
import { externalUrls } from '../../externalUrls';
import {
  AlertingConfigModel,
  AlertingConfigModelValidationMap,
} from '../../models/radix-api/alerting/alerting-config';
import {
  UpdateAlertingConfigModel,
  UpdateAlertingConfigModelValidationMap,
} from '../../models/radix-api/alerting/update-alerting-config';
import { RequestState } from '../../state/state-utils/request-states';

export interface AlertingProps {
  alertingConfig: AlertingConfigModel;
  alertingEditConfig?: UpdateAlertingConfigModel;
  editAlertingEnable: (config: AlertingConfigModel) => void;
  editAlertingDisable: () => void;
  editAlertingSetSlackUrl: (receiver: string, slackUrl: string) => void;
  enableAlerting: () => void;
  updateAlerting: (config: UpdateAlertingConfigModel) => void;
  disableAlerting: () => void;
  enableAlertingRequestState?: RequestState;
  disableAlertingRequestState?: RequestState;
  updateAlertingRequestState?: RequestState;
  enableAlertingLastError?: string;
  disableAlertingLastError?: string;
  updateAlertingLastError?: string;
  isAlertingEditEnabled: boolean;
  isAlertingEditDirty: boolean;
}

function useIsSaving(
  ...states: [RequestState, RequestState, RequestState]
): boolean {
  const [isSaving, setIsSaving] = useState(false);
  useEffect(
    () =>
      setIsSaving(states.some((state) => state === RequestState.IN_PROGRESS)),
    [states, setIsSaving]
  );

  return isSaving;
}

export const Alerting: FunctionComponent<AlertingProps> = ({
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
  const [lastError, setLastError] = useState<{
    type?: AlertType;
    message: string;
  }>(undefined);
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
    if (enableAlertingRequestState === RequestState.FAILURE) {
      setLastError({ message: enableAlertingLastError });
    }
  }, [enableAlertingRequestState, enableAlertingLastError]);

  useEffect(() => {
    if (disableAlertingRequestState === RequestState.FAILURE) {
      setLastError({ message: disableAlertingLastError });
    }
  }, [disableAlertingRequestState, disableAlertingLastError]);

  useEffect(() => {
    if (updateAlertingRequestState === RequestState.FAILURE) {
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
  alertingConfig: PropTypes.shape(AlertingConfigModelValidationMap)
    .isRequired as PropTypes.Validator<AlertingConfigModel>,
  alertingEditConfig: PropTypes.shape(
    UpdateAlertingConfigModelValidationMap
  ) as PropTypes.Validator<UpdateAlertingConfigModel>,
  editAlertingEnable: PropTypes.func.isRequired,
  editAlertingDisable: PropTypes.func.isRequired,
  editAlertingSetSlackUrl: PropTypes.func.isRequired,
  enableAlerting: PropTypes.func.isRequired,
  updateAlerting: PropTypes.func.isRequired,
  disableAlerting: PropTypes.func.isRequired,
  enableAlertingRequestState: PropTypes.oneOf(Object.values(RequestState)),
  disableAlertingRequestState: PropTypes.oneOf(Object.values(RequestState)),
  updateAlertingRequestState: PropTypes.oneOf(Object.values(RequestState)),
  enableAlertingLastError: PropTypes.string,
  disableAlertingLastError: PropTypes.string,
  updateAlertingLastError: PropTypes.string,
  isAlertingEditEnabled: PropTypes.bool.isRequired,
  isAlertingEditDirty: PropTypes.bool.isRequired,
};