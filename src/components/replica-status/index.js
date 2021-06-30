import React from 'react';

import { progressStatusToChipType } from '../chip';
import { JobStatusChip } from '../job-status-chip';

const STATUS_FAIL = 'Failing';

export const ReplicaStatus = ({ replica }) => {
  const status = replica ? replica.status : null;
  if (status === STATUS_FAIL) {
    return <JobStatusChip type="danger">Failing</JobStatusChip>;
  }

  return (
    <JobStatusChip type={progressStatusToChipType(status)}>
      {status}
    </JobStatusChip>
  );
};

export default ReplicaStatus;
