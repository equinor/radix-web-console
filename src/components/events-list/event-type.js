import PropTypes from 'prop-types';
import React from 'react';

import Chip from '../chip';
import eventModel from '../../models/event';
import { isWarningEvent } from '../../utils/event-model';

const EventType = ({ event }) => {
  let chipType = 'info';

  if (isWarningEvent(event)) {
    chipType = 'warning';
  }

  return (
    <React.Fragment>
      <Chip type={chipType}>{event?.type}</Chip>
    </React.Fragment>
  );
};

EventType.propTypes = {
  event: PropTypes.shape(eventModel).isRequired,
};

export default EventType;
