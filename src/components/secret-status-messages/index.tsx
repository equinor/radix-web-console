import { Typography } from '@equinor/eds-core-react';
import { FunctionComponent } from 'react';

import { Alert, AlertProps } from '../alert';
import { SecretModel } from '../../models/radix-api/secrets/secret';
import { SecretStatus } from '../../models/radix-api/secrets/secret-status';

const AlertTemplates: Record<SecretStatus, Omit<AlertProps, 'children'>> = {
  [SecretStatus.Pending]: { type: 'info' },
  [SecretStatus.NotAvailable]: { type: 'warning' },
  [SecretStatus.Invalid]: { type: 'danger' },
  [SecretStatus.Consistent]: { type: 'info' },
  [SecretStatus.Unsupported]: { type: 'danger' },
};

export const SecretStatusMessages: FunctionComponent<{
  secret: SecretModel;
}> = ({ secret }) => (
  <>
    {secret?.statusMessages?.length > 0 && (
      <Alert {...AlertTemplates[secret.status]}>
        <div className="grid grid--gap-medium">
          {secret.statusMessages.map((msg, i) => (
            <Typography key={i}>{msg}</Typography>
          ))}
        </div>
      </Alert>
    )}
  </>
);
