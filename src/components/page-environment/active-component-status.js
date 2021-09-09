import React from 'react';

import { StatusBadge } from '../status-badge';

const STATUS_FAIL = 'Failing';
const STATUS_PENDING = 'Pending';
const STATUS_OUTDATED = 'Outdated';

export const ActiveComponentStatus = ({
  componentName,
  componentStatus,
  envSecrets,
  replicas,
}) => {
  if (
    envSecrets &&
    envSecrets.some(
      (secret) =>
        secret.component === componentName && secret.status === STATUS_PENDING
    )
  ) {
    return <StatusBadge type="danger">Missing secrets</StatusBadge>;
  } else if (
    replicas &&
    replicas.some((replica) => replica.status === STATUS_FAIL)
  ) {
    return <StatusBadge type="danger">Failing</StatusBadge>;
  } else if (componentStatus === STATUS_OUTDATED) {
    return <StatusBadge type="danger">Outdated image</StatusBadge>;
  }

  return <StatusBadge type="success">Success</StatusBadge>;
};

export default ActiveComponentStatus;
