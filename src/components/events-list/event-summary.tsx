import { Table } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { StatusBadge } from '../status-badges';
import { RelativeToNow } from '../time/relative-to-now';
import { EventModel, EventModelValidationMap } from '../../models/event';
import {
  isEventObsolete,
  isEventResolved,
  isWarningEvent,
} from '../../utils/event-model';

export interface EventSummaryProps {
  event: EventModel;
}

const WarningState = ({ event }: { event: EventModel }): JSX.Element => {
  if (isEventObsolete(event)) {
    return <StatusBadge type="success">Obsolete</StatusBadge>;
  } else if (isEventResolved(event)) {
    return <StatusBadge type="success">Resolved</StatusBadge>;
  }

  return null;
};

export const EventSummary = ({ event }: EventSummaryProps): JSX.Element => (
  <Table.Row>
    <Table.Cell>
      <RelativeToNow
        time={event.lastTimestamp}
        titlePrefix="Start"
        capitalize
      />
    </Table.Cell>
    <Table.Cell>
      <div className="type">
        <StatusBadge type={isWarningEvent(event) ? 'warning' : 'success'}>
          {event.type}
        </StatusBadge>
        <WarningState event={event} />
      </div>
    </Table.Cell>
    <Table.Cell className="wrap">
      {event.involvedObjectKind}/{event.involvedObjectName}
    </Table.Cell>
    <Table.Cell className="wrap">
      {event.reason} - {event.message}
      {event.involvedObjectState?.pod?.restartCount > 0 && (
        <>. Restarted {event.involvedObjectState.pod.restartCount} times</>
      )}
    </Table.Cell>
  </Table.Row>
);

EventSummary.propTypes = {
  event: PropTypes.shape(EventModelValidationMap).isRequired,
} as PropTypes.ValidationMap<EventSummaryProps>;
