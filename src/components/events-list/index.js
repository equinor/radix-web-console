import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import EventSummary from './event-summary';
import EmptyState from '../empty-state';

import eventModel from '../../models/event';

import './style.css';

const noEventsIcon = (
  <span className="events-list__no-events-icon fa-layers fa-fw fa-5x">
    <FontAwesomeIcon icon={faCogs} />
  </span>
);

export const EventsList = ({ events }) => (
  <div className="events-list">
    {events.length === 0 && (
      <EmptyState title="No events" icon={noEventsIcon}></EmptyState>
    )}
    {events.length > 0 && (
      <ul className="o-item-list">
        {events.map((event, i) => (
          <li key={i}>
            <EventSummary event={event}></EventSummary>
          </li>
        ))}
      </ul>
    )}
  </div>
);

EventsList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape(eventModel)).isRequired,
};

export default EventsList;
