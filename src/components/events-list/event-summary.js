import PropTypes from 'prop-types';
import React from 'react';

import RelativeToNow from '../time/relative-to-now';
import WarningState from './warning-state';
import EventType from './event-type';

import eventModel from '../../models/event';
import { isWarningEvent } from '../../utils/event-model';
import { Table } from '@equinor/eds-core-react';

const EventSummary = ({ event }) => {
  return (
    <>
      <Table.Cell>
        <RelativeToNow time={event.lastTimestamp} titlePrefix="Start" />
      </Table.Cell>
      <Table.Cell>
        <EventType event={event}></EventType>
      </Table.Cell>
      <Table.Cell>
        {event.involvedObjectKind}/{event.involvedObjectName}
      </Table.Cell>
      <Table.Cell>
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
      </Table.Cell>
      <Table.Cell>
        {isWarningEvent(event) && <WarningState event={event}></WarningState>}
      </Table.Cell>
    </>
  );
};

EventSummary.propTypes = {
  event: PropTypes.shape(eventModel).isRequired,
};

export default EventSummary;
