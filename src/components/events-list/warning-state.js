import PropTypes from 'prop-types';
import React from 'react';

import JobStatusChip from '../job-status-chip';

import eventModel from '../../models/event';
import { isEventObsolete, isEventResolved } from '../../utils/event-model';

const WarningResolved = () => {
  return (
    <React.Fragment>
      <JobStatusChip type="Success">Resolved</JobStatusChip>
    </React.Fragment>
  );
};

const WarningObsolete = () => {
  return (
    <React.Fragment>
      <JobStatusChip type="Warning">Obsolete</JobStatusChip>
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
