import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import Chip from '../chip';

import eventModel from '../../models/event';
import { isEventObsolete, isEventResolved } from '../../utils/event-model';
import { toLower } from 'lodash';

const WarningResolved = () => {
  return (
    <React.Fragment>
      <Chip type="info">
        <FontAwesomeIcon icon={faCheckCircle} /> Resolved
      </Chip>
    </React.Fragment>
  );
};

const WarningObsolete = () => {
  return (
    <React.Fragment>
      <Chip type="default">Obsolete</Chip>
    </React.Fragment>
  );
};

const WarningState = ({ event }) => {
  if (isEventObsolete(event)) {
    return WarningObsolete();
  }

  if (isEventResolved(event)) {
    return WarningResolved();
  }

  return null;
};

WarningState.propTypes = {
  event: PropTypes.shape(eventModel).isRequired,
};

export default WarningState;
