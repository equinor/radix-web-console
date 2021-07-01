import PropTypes from 'prop-types';
import React from 'react';

import eventModel from '../../models/event';
import { isWarningEvent } from '../../utils/event-model';
import JobStatusChip from '../job-status-chip';
import { Icon } from '@equinor/eds-core-react';
import { check, warning_outlined } from '@equinor/eds-icons';

const EventType = ({ event }) => {
  let chipType = 'success';
  let chipIcon = check;

  if (isWarningEvent(event)) {
    chipType = 'unknown';
    chipIcon = warning_outlined;
  }

  return (
    <React.Fragment>
      <JobStatusChip type={chipType}>
        <Icon data={chipIcon} />
        {event?.type}
      </JobStatusChip>
    </React.Fragment>
  );
};

EventType.propTypes = {
  event: PropTypes.shape(eventModel).isRequired,
};

export default EventType;
