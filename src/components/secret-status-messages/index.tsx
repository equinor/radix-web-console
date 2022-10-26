import { Typography } from '@equinor/eds-core-react';

import Alert, { AlertProps } from '../alert';
import { SecretModel } from '../../models/secret';
import { SecretStatus } from '../../models/secret-status';

const AlertTemplates: Record<SecretStatus, Omit<AlertProps, 'children'>> = {
  [SecretStatus.Pending]: { type: 'info' },
  [SecretStatus.NotAvailable]: { type: 'warning' },
  [SecretStatus.Invalid]: { type: 'danger' },
  [SecretStatus.Consistent]: { type: 'info' },
  [SecretStatus.Unsupported]: { type: 'danger' },
};

export const SecretStatusMessages = ({
  secret,
}: {
  secret: SecretModel;
}): JSX.Element => (
  <>
    {secret?.statusMessages?.length > 0 && (
      <Alert {...AlertTemplates[secret.status]}>
        <div className="grid grid--gap-medium">
          {secret.statusMessages?.map((msg, i, a) => (
            <Typography key={i}>{msg}</Typography>
          ))}
        </div>
      </Alert>
    )}
  </>
);
