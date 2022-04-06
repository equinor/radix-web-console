import React from 'react';

import { StatusBadge } from '../status-badges';

const STATUS_OK = 'Consistent';
const STATUS_PENDING = 'Pending';
const STATUS_EXTERNAL = 'External';

export const SecretStatus = ({ secret }) => {
  if (!secret) {
    console.warn(`Secret for component is not being reported by environment`);
    return <StatusBadge type="danger">Status not reported</StatusBadge>;
  }

  switch (secret.status) {
    case STATUS_PENDING:
      return <StatusBadge type="danger">Not defined</StatusBadge>;
    case STATUS_OK:
      return <StatusBadge type="success">{secret.status}</StatusBadge>;
    case STATUS_EXTERNAL:
      return <StatusBadge type="success">{secret.status}</StatusBadge>;
    default:
      return <StatusBadge type="danger">{secret.status}</StatusBadge>;
  }
};

export default SecretStatus;
