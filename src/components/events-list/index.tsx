import { Accordion, Icon, Table, Typography } from '@equinor/eds-core-react';
import { settings } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import { EventSummary } from './event-summary';

import {
  EventModel,
  EventModelValidationMap,
} from '../../models/radix-api/events/event';

import './style.css';

export interface EventsListProps {
  events: Array<EventModel>;
}

export const EventsList: FunctionComponent<EventsListProps> = ({ events }) => (
  <Accordion className="accordion elevated" chevronPosition="right">
    <Accordion.Item isExpanded>
      <Accordion.Header>
        <Accordion.HeaderTitle>
          <Typography variant="h4">Events</Typography>
        </Accordion.HeaderTitle>
      </Accordion.Header>
      <Accordion.Panel>
        {events.length > 0 ? (
          <div className="events_table grid grid--table-overflow">
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.Cell>Date / Time</Table.Cell>
                  <Table.Cell>Type</Table.Cell>
                  <Table.Cell>Location</Table.Cell>
                  <Table.Cell>Description</Table.Cell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {events.map((event, i) => (
                  <EventSummary key={i} event={event} />
                ))}
              </Table.Body>
            </Table>
          </div>
        ) : (
          <div className="stat_empty">
            <span>
              <Icon data={settings} />
            </span>
            <Typography>No events</Typography>
          </div>
        )}
      </Accordion.Panel>
    </Accordion.Item>
  </Accordion>
);

EventsList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape(EventModelValidationMap) as PropTypes.Validator<EventModel>
  ).isRequired,
};
