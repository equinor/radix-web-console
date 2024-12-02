import { TextField } from '@equinor/eds-core-react';
import type {
  ChangeEvent,
  Dispatch,
  FunctionComponent,
  SetStateAction,
} from 'react';

import type { AlertingConfig } from '../../store/radix-api';

export type ChangedReceivers = Record<string, string>;

export const UpdateSlackReceivers: FunctionComponent<{
  alertingConfig: AlertingConfig;
  changedReceivers: ChangedReceivers;
  setChangedReceivers: Dispatch<SetStateAction<ChangedReceivers>>;
}> = ({ alertingConfig, changedReceivers, setChangedReceivers }) => (
  <>
    {Object.entries(alertingConfig.receivers ?? {})
      .filter(([, value]) => value.slackConfig.enabled)
      .map(([receiver]) => (
        <TextField
          key={receiver}
          id="url"
          type="url"
          label="Enter Slack webhook URL where alerts should be sent"
          placeholder="Type Slack webhook URL here"
          value={changedReceivers[receiver] ?? ''}
          onChange={(ev: ChangeEvent<{ value: string }>) =>
            setChangedReceivers((old: ChangedReceivers) => ({
              ...old,
              [receiver]: ev.target.value,
            }))
          }
        />
      ))}
  </>
);
