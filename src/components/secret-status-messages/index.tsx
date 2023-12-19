import { Typography } from '@equinor/eds-core-react';
import { FunctionComponent } from 'react';

import { Alert, AlertProps } from '../alert';
import { SecretStatus as OldSecretStatus } from '../../models/radix-api/secrets/secret-status';
import { Secret } from '../../store/radix-api';

type SecretStatus = Secret['status'] | OldSecretStatus;

const AlertTemplates: Record<SecretStatus, AlertProps> = {
  Pending: { type: 'info' },
  Consistent: { type: 'info' },
  NotAvailable: { type: 'warning' },
  Invalid: { type: 'danger' },

  // deprecated
  [OldSecretStatus.Unsupported]: { type: 'danger' },
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
