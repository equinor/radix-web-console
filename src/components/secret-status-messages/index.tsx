import { Typography } from '@equinor/eds-core-react';
import { FunctionComponent } from 'react';

import { Alert, AlertProps } from '../alert';
import { Secret } from '../../store/radix-api';

const AlertTemplates: Record<Secret['status'], AlertProps> = {
  Pending: { type: 'info' },
  Consistent: { type: 'info' },
  NotAvailable: { type: 'warning' },
  Invalid: { type: 'danger' },
};

export const SecretStatusMessages: FunctionComponent<{
  status: Secret['status'];
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
