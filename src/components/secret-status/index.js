import React from 'react';

import { StatusBadge } from '../status-badge';

const STATUS_OK = 'Consistent';
const STATUS_PENDING = 'Pending';

export const SecretStatus = ({ secret }) => {
  if (!secret) {
    console.warn(`Secret for component is not being reported by environment`);
    return <StatusBadge type="Danger">Status not reported</StatusBadge>;
  }

  switch (secret.status) {
    case STATUS_PENDING:
      return <StatusBadge type="Danger">Not defined</StatusBadge>;
    case STATUS_OK:
      return <StatusBadge type="Success">{secret.status}</StatusBadge>;
    default:
      return <StatusBadge type="Danger">{secret.status}</StatusBadge>;
  }
};

export default SecretStatus;
