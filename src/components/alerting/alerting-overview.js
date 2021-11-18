import { Icon } from '@equinor/eds-core-react';
import { info_circle, check } from '@equinor/eds-icons';
import * as React from 'react';
import Alert from '../alert';

const AlertingSlackStatus = ({ config }) => (
  <>
    {config.receiverSecretStatus && (
      <>
        {Object.entries(config.receiverSecretStatus).map((v) => (
          <React.Fragment key={v[0]}>
            {v[1].slackConfig.webhookUrlConfigured ? (
              <Alert type="success" className="icon">
                <Icon data={check} color="primary" />
                Slack webhook URL is configured.
              </Alert>
            ) : (
              <Alert type="warning" className="icon">
                <Icon data={info_circle} color="primary" />
                Missing required Slack webhook URL. Radix cannot send alerts
                until the webhook is configured.
              </Alert>
            )}
          </React.Fragment>
        ))}
      </>
    )}
  </>
);

const AlertingConfigStatus = ({ config }) => {
  return (
    config.enabled && config.ready && <AlertingSlackStatus config={config} />
  );
};

export { AlertingConfigStatus };
