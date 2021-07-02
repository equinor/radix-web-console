import React from 'react';

import JobStatusChip from '../job-status-chip';

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
    return <JobStatusChip type="Danger">Missing secrets</JobStatusChip>;
  }

  if (replicas && replicas.some((replica) => replica.status === STATUS_FAIL)) {
    return <JobStatusChip type="Danger">Failing</JobStatusChip>;
  }

  if (componentStatus === STATUS_OUTDATED) {
    return <JobStatusChip type="Danger">Outdated image</JobStatusChip>;
  }

  return <JobStatusChip type="Success">Success</JobStatusChip>;
};

export default ActiveComponentStatus;
