import PropTypes from 'prop-types';
import React from 'react';

import eventModel from '../../models/event';
import { isWarningEvent } from '../../utils/event-model';
import JobStatusChip from '../job-status-chip';

const EventType = ({ event }) => {
  let chipType = 'Success';

  if (isWarningEvent(event)) {
    chipType = 'Warning';
  }

  return (
    <React.Fragment>
      <JobStatusChip type={chipType}>{event?.type}</JobStatusChip>
    </React.Fragment>
  );
};

EventType.propTypes = {
  event: PropTypes.shape(eventModel).isRequired,
};

export default EventType;
