import React from 'react';
import { render, screen } from '@testing-library/react';
import EventsList from '.';

const normalEvent = {
  lastTimestamp: new Date('2019-12-22T14:38:36Z'),
  involvedObjectKind: 'Pod',
  involvedObjectNamespace: 'myapp-production',
  involvedObjectName: 'www-74cb7c986-fgcrl',
  type: 'Normal',
  reason: 'Created',
  message: "'Created container web'",
};

const warningEvent = {
  lastTimestamp: new Date('2019-12-22T14:38:36Z'),
  involvedObjectKind: 'Replicaset',
  involvedObjectNamespace: 'myapp-production',
  involvedObjectName: 'auth-74cb7c986',
  type: 'Warning',
  reason: 'Failed',
  message: "'Error: ImagePullBackOff'",
};

const listOfEvents = [normalEvent, warningEvent];

test('EventsList renders two events', () => {
  render(<EventsList events={listOfEvents} />);
  screen.getByText(normalEvent.message, { exact: false });
  screen.getByText(warningEvent.message, { exact: false });
  screen.getByText(normalEvent.reason, { exact: false });
  screen.getByText(warningEvent.reason, { exact: false });
  screen.getByText(normalEvent.involvedObjectName, { exact: false });
  screen.getByText(warningEvent.involvedObjectName, { exact: false });
  screen.getByText(normalEvent.involvedObjectKind, { exact: false });
  screen.getByText(warningEvent.involvedObjectKind, { exact: false });
  screen.getByText(normalEvent.type);
  screen.getByText(warningEvent.type);
});

test('EventsList renders empty event list', () => {
  render(<EventsList events={[]} />);
  screen.getByText('No events', { exact: true });
});
