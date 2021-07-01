import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import JobStatusChip from '../job-status-chip';

const STATUS_OK = 'Consistent';
const STATUS_PENDING = 'Pending';

export const SecretStatus = ({ secret }) => {
  if (!secret) {
    console.warn(`Secret for component is not being reported by environment`);

    return (
      <JobStatusChip type="danger">
        <FontAwesomeIcon icon={faExclamationCircle} /> Status not reported
      </JobStatusChip>
    );
  }

  if (secret.status === STATUS_PENDING) {
    return (
      <JobStatusChip type="danger">
        <FontAwesomeIcon icon={faExclamationCircle} /> Not defined
      </JobStatusChip>
    );
  }

  if (secret.status !== STATUS_OK) {
    return (
      <JobStatusChip type="danger">
        <FontAwesomeIcon icon={faExclamationCircle} /> {secret.status}
      </JobStatusChip>
    );
  }

  return <JobStatusChip>{secret.status}</JobStatusChip>;
};

export default SecretStatus;
