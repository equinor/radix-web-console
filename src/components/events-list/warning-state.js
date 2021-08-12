import PropTypes from 'prop-types';
import React from 'react';

import { StatusBadge } from '../status-badge';
import eventModel from '../../models/event';
import { isEventObsolete, isEventResolved } from '../../utils/event-model';

const WarningResolved = () => {
  return <StatusBadge type="success">Resolved</StatusBadge>;
};

const WarningObsolete = () => {
  return <StatusBadge type="warning">Obsolete</StatusBadge>;
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
