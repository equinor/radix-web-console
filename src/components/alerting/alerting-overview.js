import { AlertingConfigModel } from '../../models/alerting';
import PropTypes from 'prop-types';
import { Typography } from '@equinor/eds-core-react';

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
          Alerting is <strong>not ready</strong> to be configured yet.
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

export { AlertingOverview };
