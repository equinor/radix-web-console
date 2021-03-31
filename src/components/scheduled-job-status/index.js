import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import Chip, { progressStatusToChipType } from '../chip';

const STATUS_FAIL = 'Failing';

export const ScheduledJobStatus = ({ scheduledJob }) => {
  const status = scheduledJob ? scheduledJob.status : null;
  if (status === STATUS_FAIL) {
    return (
      <Chip type="danger">
        <FontAwesomeIcon icon={faExclamationCircle} /> Failing
      </Chip>
    );
  }

  return <Chip type={progressStatusToChipType(status)}>{status}</Chip>;
};

export default ScheduledJobStatus;
