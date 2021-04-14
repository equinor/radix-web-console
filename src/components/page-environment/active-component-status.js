import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import Chip from '../chip';

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
      <Chip type="danger">
        <FontAwesomeIcon icon={faExclamationCircle} /> Missing secrets
      </Chip>
    );
  }

  if (replicas && replicas.some((replica) => replica.status === STATUS_FAIL)) {
    return (
      <Chip type="danger">
        <FontAwesomeIcon icon={faExclamationCircle} /> Failing
      </Chip>
    );
  }

  if (componentStatus === STATUS_OUTDATED) {
    return (
      <Chip type="danger">
        <FontAwesomeIcon icon={faExclamationCircle} /> Outdated image
      </Chip>
    );
  }

  return <Chip>OK</Chip>;
};

export default ActiveComponentStatus;
