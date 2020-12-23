import React from 'react';

import EventsList from '.';

const events = [
  {
    lastTimestamp: new Date('2020-12-22T14:38:36Z'),
    involvedObjectKind: 'Pod',
    involvedObjectNamespace: 'myapp-production',
    involvedObjectName: 'www-74cb7c986-fgcrl',
    type: 'Warning',
    reason: 'Unhealthy',
    message:
      "'Readiness probe failed: dial tcp 10.40.1.5:3003: connect: connection refused'",
  },
  {
    lastTimestamp: new Date('2019-12-22T14:38:36Z'),
    involvedObjectKind: 'Pod',
    involvedObjectNamespace: 'myapp-production',
    involvedObjectName: 'www-74cb7c986-fgcrl',
    type: 'Warning',
    reason: 'Unhealthy',
    message:
      "'Readiness probe failed: dial tcp 10.40.1.5:3003: connect: connection refused'",
  },
  {
    lastTimestamp: new Date('2019-12-22T14:38:36Z'),
    involvedObjectKind: 'Pod',
    involvedObjectNamespace: 'myapp-production',
    involvedObjectName: 'www-74cb7c986-fgcrl',
    type: 'Normal',
    reason: 'Created',
    message: "'Created container web'",
  },
];

export default (
  <div style={{ backgroundColor: 'var(--color-bright)' }}>
    <EventsList events={events} />
    <hr />
    <EventsList events={[]} />
  </div>
);
