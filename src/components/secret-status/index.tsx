import { FunctionComponent } from 'react';

import { StatusBadge } from '../status-badges';
import { SecretModel } from '../../models/radix-api/secrets/secret';
import { SecretStatus as Status } from '../../models/radix-api/secrets/secret-status';

export const SecretStatus: FunctionComponent<{ secret: SecretModel }> = ({
  secret,
}) => {
  if (!secret) {
    console.warn('Secret for component is not being reported by environment');
    return <StatusBadge type="danger">Status not reported</StatusBadge>;
  }

  switch (secret.status) {
    case Status.Pending:
      return <StatusBadge type="danger">Not defined</StatusBadge>;
    case Status.Consistent:
      return <StatusBadge type="success">{secret.status}</StatusBadge>;
    case Status.NotAvailable:
      return <StatusBadge type="success">Not available</StatusBadge>;
    case Status.Invalid:
    default:
      return <StatusBadge type="danger">{secret.status}</StatusBadge>;
  }
};
