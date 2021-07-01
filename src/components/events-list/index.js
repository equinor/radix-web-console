import PropTypes from 'prop-types';
import React from 'react';

import EventSummary from './event-summary';

import eventModel from '../../models/event';

import './style.css';
import { Accordion, Icon, Table } from '@equinor/eds-core-react';
import { settings } from '@equinor/eds-icons';

export const EventsList = ({ events }) => (
  <Accordion.Item className="accordion__item elevated" isExpanded>
    <Accordion.Header className="accordion__header">
      <h4>Events</h4>
    </Accordion.Header>
    <Accordion.Panel className="accordion__panel">
      {events.length === 0 && (
        <div className="stat_empty">
          <span className="">
            <Icon data={settings} />
          </span>
          <p className="body_short">No events</p>
        </div>
      )}
      {events.length > 0 && (
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Cell>Date / Time</Table.Cell>
              <Table.Cell>Type</Table.Cell>
              <Table.Cell>Location</Table.Cell>
              <Table.Cell>Description</Table.Cell>
              <Table.Cell>Status</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {events.map((event, i) => (
              <Table.Row key={i}>
                <EventSummary event={event}></EventSummary>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Accordion.Panel>
  </Accordion.Item>
);

EventsList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape(eventModel)).isRequired,
};

export default EventsList;
