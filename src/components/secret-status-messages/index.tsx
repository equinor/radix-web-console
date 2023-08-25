import { Typography } from '@equinor/eds-core-react';
import { FunctionComponent } from 'react';

import { Alert, AlertProps } from '../alert';
import { SecretStatus } from '../../models/radix-api/secrets/secret-status';

const AlertTemplates: Record<SecretStatus, AlertProps> = {
  [SecretStatus.Pending]: { type: 'info' },
  [SecretStatus.NotAvailable]: { type: 'warning' },
  [SecretStatus.Invalid]: { type: 'danger' },
  [SecretStatus.Consistent]: { type: 'info' },
  [SecretStatus.Unsupported]: { type: 'danger' },
};

export const SecretStatusMessages: FunctionComponent<{
  status: SecretStatus;
  messages: Array<string>;
}> = ({ status, messages }) => (
  <Alert {...AlertTemplates[status]}>
    <div className="grid grid--gap-medium">
      {messages.map((msg, i) => (
        <Typography key={i}>{msg}</Typography>
      ))}
    </div>
  </Alert>
);
