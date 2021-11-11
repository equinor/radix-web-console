import { UpdateAlertingConfigModel } from '../../models/alerting';
import PropTypes from 'prop-types';
import { TextField } from '@equinor/eds-core-react';
import * as React from 'react';

const buildSlackReceiverNamesFromConfig = (config) =>
  config?.receivers
    ? Object.entries(config.receivers)
        .filter((e) => e[1].slackConfig)
        .map((e) => e[0])
    : [];

const useBuildSlackReceiverNames = (config) => {
  const [slackReceivers, setSlackReceivers] = React.useState([]);

  React.useEffect(
    () => setSlackReceivers(buildSlackReceiverNamesFromConfig(config)),
    [config]
  );

  return slackReceivers;
};

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

export { EditAlerting };
