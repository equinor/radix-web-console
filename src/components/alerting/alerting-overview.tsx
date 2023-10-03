import { Icon, Typography } from '@equinor/eds-core-react';
import { warning_outlined, check_circle_outlined } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { Fragment, FunctionComponent } from 'react';

import {
  AlertingConfigModel,
  AlertingConfigModelValidationMap,
} from '../../models/radix-api/alerting/alerting-config';

const AlertingSlackStatus: FunctionComponent<{
  config: AlertingConfigModel;
}> = ({ config }) => (
  <>
    {Object.entries(config.receiverSecretStatus ?? {}).map((v) => (
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
              Missing required Slack webhook URL. Radix cannot send alerts until
              the webhook is configured.
            </Typography>
          </div>
        )}
      </Fragment>
    ))}
  </>
);

export const AlertingConfigStatus: FunctionComponent<{
  config: AlertingConfigModel;
}> = ({ config }) =>
  config.enabled && config.ready && <AlertingSlackStatus config={config} />;

AlertingConfigStatus.propTypes = {
  config: PropTypes.shape(AlertingConfigModelValidationMap)
    .isRequired as PropTypes.Validator<AlertingConfigModel>,
};
