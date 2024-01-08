import { Icon, Typography } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { useState } from 'react';

import { AlertingActions } from './alerting-actions';
import { AlertingConfigStatus } from './alerting-overview';
import { UpdateSlackReceivers, ChangedReceivers } from './edit-alerting';
import { buildEditConfig } from './buildEditConfig';

import { Alert } from '../alert';
import { externalUrls } from '../../externalUrls';
import { AlertingConfig, UpdateAlertingConfig } from '../../store/radix-api';

interface Props {
  isSaving: boolean;
  alertingConfig: AlertingConfig;
  enableAlerting: () => Promise<void>;
  updateAlerting: (config: UpdateAlertingConfig) => Promise<void>;
  disableAlerting: () => Promise<void>;
}

export const Alerting = ({
  isSaving,
  alertingConfig,
  enableAlerting,
  disableAlerting,
  updateAlerting,
}: Props) => {
  const [edit, setEdit] = useState(false);
  const [changedReceivers, setChangedReceivers] = useState<ChangedReceivers>(
    {}
  );
  const onSave = async () => {
    const config: UpdateAlertingConfig = buildEditConfig(alertingConfig);
    Object.entries(changedReceivers).forEach(([receiver, url]) => {
      if (!config.receivers[receiver]) {
        config.receiverSecrets[receiver] = { slackConfig: { webhookUrl: url } };
      } else {
        config.receiverSecrets[receiver].slackConfig.webhookUrl = url;
      }
    });

    await updateAlerting(config);
  };
  const onCancel = () => {
    setEdit(false);
    setChangedReceivers({});
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

      {edit && (
        <UpdateSlackReceivers
          changedReceivers={changedReceivers}
          setChangedReceivers={setChangedReceivers}
          alertingConfig={alertingConfig}
        />
      )}

      <AlertingActions
        isEdit={edit}
        onEdit={() => setEdit(true)}
        onCancel={onCancel}
        onSave={onSave}
        isSaving={isSaving}
        config={alertingConfig}
        onEnable={enableAlerting}
        onDisable={disableAlerting}
      />
    </div>
  );
};

Alerting.propTypes = {
  isSaving: PropTypes.bool.isRequired,
  alertingConfig: PropTypes.object.isRequired,
  enableAlerting: PropTypes.func.isRequired,
  updateAlerting: PropTypes.func.isRequired,
  disableAlerting: PropTypes.func.isRequired,
};
