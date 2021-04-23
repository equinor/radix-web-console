import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import RelativeToNow from '../time/relative-to-now';
import WarningState from './warning-state';
import EventType from './event-type';

import eventModel from '../../models/event';
import { isWarningEvent } from '../../utils/event-model';

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
          <EventType event={event}></EventType>
        </li>
        <li className="events-summary__data-section">
          {event.involvedObjectKind}/{event.involvedObjectName}
        </li>
        <li className="events-summary__data-section">
          <span>
            {event.reason} - {event.message}
            {event.involvedObjectState &&
              event.involvedObjectState.pod &&
              event.involvedObjectState.pod.restartCount > 0 && (
                <span>
                  . Restarted {event.involvedObjectState.pod.restartCount} times
                </span>
              )}
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
