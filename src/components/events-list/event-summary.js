import { Table } from '@equinor/eds-core-react';
import PropTypes from 'prop-types';
import React from 'react';

import EventType from './event-type';
import WarningState from './warning-state';
import RelativeToNow from '../time/relative-to-now';
import eventModel from '../../models/event';

const EventSummary = ({ event }) => (
  <>
    <Table.Cell>
      <RelativeToNow
        time={event.lastTimestamp}
        titlePrefix="Start"
        capitalize
      />
    </Table.Cell>
    <Table.Cell>
      <EventType event={event}></EventType>
    </Table.Cell>
    <Table.Cell>
      {event.involvedObjectKind}/{event.involvedObjectName}
    </Table.Cell>
    <Table.Cell className="wrap">
      {event.reason} - {event.message}
      {event.involvedObjectState &&
        event.involvedObjectState.pod &&
        event.involvedObjectState.pod.restartCount > 0 && (
          <>. Restarted {event.involvedObjectState.pod.restartCount} times</>
        )}
    </Table.Cell>
    <Table.Cell>
      <WarningState event={event}></WarningState>
    </Table.Cell>
  </>
);

EventSummary.propTypes = {
  event: PropTypes.shape(eventModel).isRequired,
};

export default EventSummary;
