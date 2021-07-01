import React from 'react';

import JobStatusChip from '../job-status-chip';
import { Icon } from '@equinor/eds-core-react';
import { error_outlined, check } from '@equinor/eds-icons';

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
    return (
      <JobStatusChip type="failed">
        <Icon data={error_outlined} /> Missing secrets
      </JobStatusChip>
    );
  }

  if (replicas && replicas.some((replica) => replica.status === STATUS_FAIL)) {
    return (
      <JobStatusChip type="failed">
        <Icon data={error_outlined} /> Failing
      </JobStatusChip>
    );
  }

  if (componentStatus === STATUS_OUTDATED) {
    return (
      <JobStatusChip type="failed">
        <Icon data={error_outlined} /> Outdated image
      </JobStatusChip>
    );
  }

  return (
    <JobStatusChip>
      <Icon data={check} /> Success
    </JobStatusChip>
  );
};

export default ActiveComponentStatus;
