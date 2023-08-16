import { Icon, Typography } from '@equinor/eds-core-react';
import { warning_outlined, check_circle_outlined } from '@equinor/eds-icons';
import { Fragment } from 'react';

const AlertingSlackStatus = ({ config }) => (
  <>
    {config.receiverSecretStatus &&
      Object.entries(config.receiverSecretStatus).map((v) => (
        <Fragment key={v[0]}>
          {v[1].slackConfig.webhookUrlConfigured ? (
            <div className="alerting-status alerting-status--success">
              <Icon data={check_circle_outlined} />
              <Typography>Slack webhook URL is configured.</Typography>
            </div>
          ) : (
            <div className="alerting-status alerting-status--warning">
              <Icon data={warning_outlined} />
              <Typography>
                Missing required Slack webhook URL. Radix cannot send alerts
                until the webhook is configured.
              </Typography>
            </div>
          )}
        </Fragment>
      ))}
  </>
);

const AlertingConfigStatus = ({ config }) => {
  return (
    config.enabled && config.ready && <AlertingSlackStatus config={config} />
  );
};

export { AlertingConfigStatus };
