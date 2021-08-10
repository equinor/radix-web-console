import PropTypes from 'prop-types';
import React from 'react';

import { StatusBadge } from '../status-badge';
import eventModel from '../../models/event';
import { isWarningEvent } from '../../utils/event-model';

const EventType = ({ event }) => (
  <React.Fragment>
    <StatusBadge type={isWarningEvent(event) ? 'warning' : 'success'}>
      {event?.type}
    </StatusBadge>
  </React.Fragment>
);

EventType.propTypes = {
  event: PropTypes.shape(eventModel).isRequired,
};

export default EventType;
