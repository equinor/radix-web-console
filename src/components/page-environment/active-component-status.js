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
    return <StatusBadge type="Danger">Missing secrets</StatusBadge>;
  }

  if (replicas && replicas.some((replica) => replica.status === STATUS_FAIL)) {
    return <StatusBadge type="Danger">Failing</StatusBadge>;
  }

  if (componentStatus === STATUS_OUTDATED) {
    return <StatusBadge type="Danger">Outdated image</StatusBadge>;
  }

  return <StatusBadge type="Success">Success</StatusBadge>;
};

export default ActiveComponentStatus;
