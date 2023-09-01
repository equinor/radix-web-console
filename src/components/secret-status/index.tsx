import { FunctionComponent } from 'react';

import { StatusBadge } from '../status-badges';
import { SecretStatus as Status } from '../../models/radix-api/secrets/secret-status';

export const SecretStatus: FunctionComponent<{ status: Status }> = ({
  status,
}) => {
  if (!status) {
    console.warn('Secret for component is not being reported by environment');
    return <StatusBadge type="danger">Status not reported</StatusBadge>;
  }

  switch (status) {
    case Status.Pending:
      return <StatusBadge type="danger">Not defined</StatusBadge>;
    case Status.Consistent:
      return <StatusBadge type="success">{status}</StatusBadge>;
    case Status.NotAvailable:
      return <StatusBadge type="success">Not available</StatusBadge>;
    case Status.Invalid:
    default:
      return <StatusBadge type="danger">{status}</StatusBadge>;
  }
};
