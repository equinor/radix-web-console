import { TextField } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { UpdateAlertingConfigModelValidationMap } from '../../models/radix-api/alerting/update-alerting-config';

const buildSlackReceiverNamesFromConfig = (config) =>
  config?.receivers
    ? Object.entries(config.receivers)
        .filter((e) => e[1].slackConfig)
        .map((e) => e[0])
    : [];

const useBuildSlackReceiverNames = (config) => {
  const [slackReceivers, setSlackReceivers] = useState([]);

  useEffect(
    () => setSlackReceivers(buildSlackReceiverNamesFromConfig(config)),
    [config]
  );

  return slackReceivers;
};

const UpdateSlackReceivers = ({ receivers, slackUrlChangeCallback }) => {
  return (
    <>
      {receivers?.map((receiver) => (
        <TextField
          key={receiver}
          type="url"
          label="Enter Slack webhook URL where alerts should be sent"
          placeholder="Type Slack webhook URL here"
          onChange={(ev) => slackUrlChangeCallback(receiver, ev.target.value)}
        />
      ))}
    </>
  );
};

UpdateSlackReceivers.propTypes = {
  receivers: PropTypes.arrayOf(PropTypes.string).isRequired,
  slackUrlChangeCallback: PropTypes.func.isRequired,
};

export const EditAlerting = ({ editConfig, editAlertingSetSlackUrl }) => {
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
  editConfig: PropTypes.shape(UpdateAlertingConfigModelValidationMap)
    .isRequired,
  editAlertingSetSlackUrl: PropTypes.func.isRequired,
};
