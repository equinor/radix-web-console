import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import Chip from '../chip';

const STATUS_OK = 'Consistent';

export const SecretStatus = ({ secret }) => {
  if (!secret) {
    console.warn(
      `Secret "${secret.name}" in component "${
        secret.component
      }" is not being reported in environment`
    );

    return (
      <Chip type="danger">
        <FontAwesomeIcon icon={faExclamationCircle} /> Status not in
        environmentt
      </Chip>
    );
  }

  if (secret.status !== STATUS_OK) {
    return (
      <Chip type="danger">
        <FontAwesomeIcon icon={faExclamationCircle} /> {secret.status}
      </Chip>
    );
  }

  return <Chip>{secret.status}</Chip>;
};

export default SecretStatus;
