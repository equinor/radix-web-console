import { List, Table } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import type { FunctionComponent } from 'react';

import type { Event } from '../../store/radix-api';
import {
  isEventObsolete,
  isEventResolved,
  isWarningEvent,
} from '../../utils/event-model';
import { GenericStatusBadge } from '../status-badges';
import { RelativeToNow } from '../time/relative-to-now';

export interface EventSummaryProps {
  event: Readonly<Event>;
}

const WarningState: FunctionComponent<{ event: Readonly<Event> }> = ({
  event,
}) => {
  if (isEventObsolete(event)) {
    return <GenericStatusBadge type="success">Obsolete</GenericStatusBadge>;
  } else if (isEventResolved(event)) {
    return <GenericStatusBadge type="success">Resolved</GenericStatusBadge>;
  }

  return null;
};

export const EventSummary: FunctionComponent<EventSummaryProps> = ({
  event,
}) => (
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
        <GenericStatusBadge
          type={isWarningEvent(event) ? 'warning' : 'success'}
        >
          {event.type}
        </GenericStatusBadge>
        <WarningState event={event} />
      </div>
    </Table.Cell>
    <Table.Cell className="wrap">
      {event.involvedObjectKind}/{event.involvedObjectName}
    </Table.Cell>
    <Table.Cell className="wrap">
      {event.reason} - {event.message}
      {(event.involvedObjectState?.pod?.restartCount ?? 0) > 0 && (
        <>. Restarted {event.involvedObjectState!.pod!.restartCount} times</>
      )}
      {event.involvedObjectState?.ingressRules && (
        <>
          <List>
            {event.involvedObjectState?.ingressRules.map((ingressRule) => (
              <List.Item key={`${ingressRule.host}-${ingressRule.service}`}>
                {ingressRule.host}
                {ingressRule.service && (
                  <>
                    ,<br /> Component: {ingressRule.service}
                  </>
                )}
                {ingressRule.port && (
                  <>
                    ,<br />
                    Port: {ingressRule.port}
                  </>
                )}
              </List.Item>
            ))}
          </List>
        </>
      )}
    </Table.Cell>
  </Table.Row>
);

EventSummary.propTypes = {
  event: PropTypes.object.isRequired as PropTypes.Validator<Event>,
};
