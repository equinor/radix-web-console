import { Table } from '@equinor/eds-core-react';
import PropTypes from 'prop-types';
import React from 'react';

import StatusBadge from '../status-badge';
import RelativeToNow from '../time/relative-to-now';
import eventModel from '../../models/event';
import {
  isEventObsolete,
  isEventResolved,
  isWarningEvent,
} from '../../utils/event-model';

const WarningState = ({ event }) => {
  if (isEventObsolete(event)) {
    return <StatusBadge type="warning">Obsolete</StatusBadge>;
  }

  if (isEventResolved(event)) {
    return <StatusBadge type="success">Resolved</StatusBadge>;
  }

  return null;
};

const EventSummary = ({ event }) => (
  <Table.Row>
    <Table.Cell>
      <RelativeToNow
        time={event.lastTimestamp}
        titlePrefix="Start"
        capitalize
      />
    </Table.Cell>
    <Table.Cell>
      <>
        <StatusBadge type={isWarningEvent(event) ? 'warning' : 'success'}>
          {event?.type}
        </StatusBadge>
        <WarningState event={event}></WarningState>
      </>
    </Table.Cell>
    <Table.Cell className="wrap">
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
  </Table.Row>
);

EventSummary.propTypes = {
  event: PropTypes.shape(eventModel).isRequired,
};

export default EventSummary;
