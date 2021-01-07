import { faClock, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import Chip from '../chip';
import RelativeToNow from '../time/relative-to-now';

import eventModel from '../../models/event';
import { toLower } from 'lodash';

const isWarningEvent = (event) => {
  return toLower(event.type) === 'warning';
};

const EventType = ({ type }) => {
  let chipType = '';

  switch (toLower(type)) {
    case 'warning':
      chipType = 'warning';
      break;
    default:
      chipType = 'info';
  }

  return (
    <React.Fragment>
      <Chip type={chipType}>{type}</Chip>
    </React.Fragment>
  );
};

const WarningResolved = ({ event }) => {
  return (
    <React.Fragment>
      <Chip type="default">
        <FontAwesomeIcon icon={faCheckCircle} /> Resolved
      </Chip>
    </React.Fragment>
  );
};

const WarningState = ({ event }) => {
  if (!event.involvedObjectState?.pod) {
    return null;
  }

  return WarningResolved(event);
};

const EventSummary = ({ event }) => {
  return (
    <div className="events-summary">
      <ul className="events-summary__data">
        <li className="events-summary__data-section">
          <div className="events-summary__icon">
            <FontAwesomeIcon icon={faClock} size="lg" />
          </div>
          <div className="events-summary__data-list">
            <RelativeToNow time={event.lastTimestamp} titlePrefix="Start" />
          </div>
        </li>
        <li className="events-summary__data-section">
          <EventType type={event.type}></EventType>
        </li>
        <li className="events-summary__data-section">
          {event.involvedObjectKind}/{event.involvedObjectName}
        </li>
        <li className="events-summary__data-section">
          <span>
            {event.reason} - {event.message}
          </span>
          {isWarningEvent(event) && <WarningState event={event}></WarningState>}
        </li>
      </ul>
    </div>
  );
};

EventSummary.propTypes = {
  event: PropTypes.shape(eventModel).isRequired,
};

export default EventSummary;
