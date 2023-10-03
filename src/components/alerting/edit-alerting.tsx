import { TextField } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useState, useEffect, FunctionComponent, ChangeEvent } from 'react';

import {
  UpdateAlertingConfigModel,
  UpdateAlertingConfigModelValidationMap,
} from '../../models/radix-api/alerting/update-alerting-config';

function buildSlackReceiverNamesFromConfig(
  config: UpdateAlertingConfigModel
): Array<string> {
  return Object.entries(config?.receivers || {})
    .filter((e) => e[1].slackConfig)
    .map((e) => e[0]);
}

const UpdateSlackReceivers: FunctionComponent<{
  receivers: Array<string>;
  slackUrlChangeCallback: (receiver: string, slackUrl: string) => void;
}> = ({ receivers, slackUrlChangeCallback }) => (
  <>
    {receivers?.map((receiver) => (
      <TextField
        key={receiver}
        id="url"
        type="url"
        label="Enter Slack webhook URL where alerts should be sent"
        placeholder="Type Slack webhook URL here"
        onChange={(ev: ChangeEvent<{ value: string }>) =>
          slackUrlChangeCallback(receiver, ev.target.value)
        }
      />
    ))}
  </>
);

UpdateSlackReceivers.propTypes = {
  receivers: PropTypes.arrayOf(PropTypes.string).isRequired,
  slackUrlChangeCallback: PropTypes.func.isRequired,
};

export const EditAlerting: FunctionComponent<{
  editConfig: UpdateAlertingConfigModel;
  editAlertingSetSlackUrl: (receiver: string, slackUrl: string) => void;
}> = ({ editConfig, editAlertingSetSlackUrl }) => {
  const [slackReceivers, setSlackReceivers] = useState<Array<string>>([]);
  useEffect(() => {
    setSlackReceivers(buildSlackReceiverNamesFromConfig(editConfig));
  }, [editConfig]);

  return editConfig ? (
    <UpdateSlackReceivers
      receivers={slackReceivers}
      slackUrlChangeCallback={editAlertingSetSlackUrl}
    />
  ) : (
    <></>
  );
};

EditAlerting.propTypes = {
  editConfig: PropTypes.shape(UpdateAlertingConfigModelValidationMap)
    .isRequired as PropTypes.Validator<UpdateAlertingConfigModel>,
  editAlertingSetSlackUrl: PropTypes.func.isRequired,
};
