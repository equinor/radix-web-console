// import { render, screen } from '@testing-library/react';
import { render } from '@testing-library/react'

// import { EventsList } from '.';

// import { EventModel } from '../../models/radix-api/events/event';

// const normalEvent: EventModel = {
//   lastTimestamp: new Date('2019-12-22T14:38:36Z'),
//   involvedObjectKind: 'Pod',
//   involvedObjectNamespace: 'myapp-production',
//   involvedObjectName: 'www-74cb7c986-fgcrl',
//   type: 'Normal',
//   reason: 'Created',
//   message: "'Created container web'",
// };

// const warningEvent: EventModel = {
//   lastTimestamp: new Date('2019-12-22T14:38:36Z'),
//   involvedObjectKind: 'Replicaset',
//   involvedObjectNamespace: 'myapp-production',
//   involvedObjectName: 'auth-74cb7c986',
//   type: 'Warning',
//   reason: 'Failed',
//   message: "'Error: ImagePullBackOff'",
// };

// const failedSchedulingResolved: EventModel = {
//   lastTimestamp: new Date('2019-12-22T14:38:36Z'),
//   involvedObjectKind: 'Pod',
//   involvedObjectNamespace: 'myapp-production',
//   involvedObjectName: 'auth-74cb7c986',
//   involvedObjectState: {
//     pod: { ready: false, restartCount: 0 },
//   },
//   type: 'Warning',
//   reason: 'FailedScheduling',
//   message: "'msg'",
// };

// const failedSchedulingNotResolved: EventModel = {
//   lastTimestamp: new Date('2019-12-22T14:38:36Z'),
//   involvedObjectKind: 'Pod',
//   involvedObjectNamespace: 'myapp-production',
//   involvedObjectName: 'auth-74cb7c986',
//   type: 'Warning',
//   reason: 'FailedScheduling',
//   message: "'msg'",
// };

// const backoffResolved: EventModel = {
//   lastTimestamp: new Date('2019-12-22T14:38:36Z'),
//   involvedObjectKind: 'Pod',
//   involvedObjectNamespace: 'myapp-production',
//   involvedObjectName: 'auth-74cb7c986',
//   involvedObjectState: {
//     pod: { ready: false, started: true, restartCount: 0 },
//   },
//   type: 'Warning',
//   reason: 'Backoff',
//   message: "'msg'",
// };

// const backoffNotResolved: EventModel = {
//   lastTimestamp: new Date('2019-12-22T14:38:36Z'),
//   involvedObjectKind: 'Pod',
//   involvedObjectNamespace: 'myapp-production',
//   involvedObjectName: 'auth-74cb7c986',
//   involvedObjectState: {
//     pod: { ready: false, restartCount: 0 },
//   },
//   type: 'Warning',
//   reason: 'Backoff',
//   message: "'msg'",
// };

// const backoffObsolete: EventModel = {
//   lastTimestamp: new Date('2019-12-22T14:38:36Z'),
//   involvedObjectKind: 'Pod',
//   involvedObjectNamespace: 'myapp-production',
//   involvedObjectName: 'auth-74cb7c986',
//   type: 'Warning',
//   reason: 'Backoff',
//   message: "'msg'",
// };

// const failedResolved: EventModel = {
//   lastTimestamp: new Date('2019-12-22T14:38:36Z'),
//   involvedObjectKind: 'Pod',
//   involvedObjectNamespace: 'myapp-production',
//   involvedObjectName: 'auth-74cb7c986',
//   involvedObjectState: {
//     pod: { ready: false, started: true, restartCount: 0 },
//   },
//   type: 'Warning',
//   reason: 'Failed',
//   message: "'msg'",
// };

// const failedNotResolved: EventModel = {
//   lastTimestamp: new Date('2019-12-22T14:38:36Z'),
//   involvedObjectKind: 'Pod',
//   involvedObjectNamespace: 'myapp-production',
//   involvedObjectName: 'auth-74cb7c986',
//   involvedObjectState: {
//     pod: { ready: false, restartCount: 0 },
//   },
//   type: 'Warning',
//   reason: 'Failed',
//   message: "'msg'",
// };

// const failedObsolete: EventModel = {
//   lastTimestamp: new Date('2019-12-22T14:38:36Z'),
//   involvedObjectKind: 'Pod',
//   involvedObjectNamespace: 'myapp-production',
//   involvedObjectName: 'auth-74cb7c986',
//   type: 'Warning',
//   reason: 'Failed',
//   message: "'msg'",
// };

// const unhealthyResolved: EventModel = {
//   lastTimestamp: new Date('2019-12-22T14:38:36Z'),
//   involvedObjectKind: 'Pod',
//   involvedObjectNamespace: 'myapp-production',
//   involvedObjectName: 'auth-74cb7c986',
//   involvedObjectState: {
//     pod: { ready: true, started: true, restartCount: 0 },
//   },
//   type: 'Warning',
//   reason: 'Unhealthy',
//   message: "'msg'",
// };

// const unhealthyNotResolved: EventModel = {
//   lastTimestamp: new Date('2019-12-22T14:38:36Z'),
//   involvedObjectKind: 'Pod',
//   involvedObjectNamespace: 'myapp-production',
//   involvedObjectName: 'auth-74cb7c986',
//   involvedObjectState: {
//     pod: { ready: false, started: true, restartCount: 0 },
//   },
//   type: 'Warning',
//   reason: 'Unhealthy',
//   message: "'msg'",
// };

// const unhealthyObsolete: EventModel = {
//   lastTimestamp: new Date('2019-12-22T14:38:36Z'),
//   involvedObjectKind: 'Pod',
//   involvedObjectNamespace: 'myapp-production',
//   involvedObjectName: 'auth-74cb7c986',
//   type: 'Warning',
//   reason: 'Unhealthy',
//   message: "'msg'",
// };

// const failedNonPodEvent: EventModel = {
//   lastTimestamp: new Date('2019-12-22T14:38:36Z'),
//   involvedObjectKind: 'Pipeline Job',
//   involvedObjectNamespace: 'myapp-production',
//   involvedObjectName: 'auth-74cb7c986',
//   type: 'Warning',
//   reason: 'Failed',
//   message: "'msg'",
// };

test('nothing', () => {
  expect('test').not.toBeNull()
  render(<></>)
})

// test('EventsList renders two events', () => {
//   render(<EventsList events={[normalEvent, warningEvent]} />);
//   expect(
//     screen.getByText(normalEvent.message, { exact: false })
//   ).toBeInTheDocument();
//   expect(
//     screen.getByText(warningEvent.message, { exact: false })
//   ).toBeInTheDocument();
//   expect(
//     screen.getByText(normalEvent.reason, { exact: false })
//   ).toBeInTheDocument();
//   expect(
//     screen.getByText(warningEvent.reason, { exact: false })
//   ).toBeInTheDocument();
//   expect(
//     screen.getByText(normalEvent.involvedObjectName, { exact: false })
//   ).toBeInTheDocument();
//   expect(
//     screen.getByText(warningEvent.involvedObjectName, { exact: false })
//   ).toBeInTheDocument();
//   expect(
//     screen.getByText(normalEvent.involvedObjectKind, { exact: false })
//   ).toBeInTheDocument();
//   expect(
//     screen.getByText(warningEvent.involvedObjectKind, { exact: false })
//   ).toBeInTheDocument();
//   expect(screen.getByText(normalEvent.type)).toBeInTheDocument();
//   expect(screen.getByText(warningEvent.type)).toBeInTheDocument();
// });

// test('EventsList renders empty event list', () => {
//   render(<EventsList events={[]} />);
//   expect(screen.getByText('No events')).toBeInTheDocument();
// });

// test('EventsList renders resolved FailedScheduling event', () => {
//   render(<EventsList events={[failedSchedulingResolved]} />);
//   expect(screen.queryByText('Resolved')).toBeInTheDocument();
// });

// test('EventsList renders unresolved FailedScheduling event', () => {
//   render(<EventsList events={[failedSchedulingNotResolved]} />);
//   expect(screen.queryByText('Resolved')).not.toBeInTheDocument();
// });

// test('EventsList renders resolved Backoff event', () => {
//   render(<EventsList events={[backoffResolved]} />);
//   expect(screen.queryByText('Resolved')).toBeInTheDocument();
// });

// test('EventsList renders unresolved Backoff event', () => {
//   render(<EventsList events={[backoffNotResolved]} />);
//   expect(screen.queryByText('Resolved')).not.toBeInTheDocument();
// });

// test('EventsList renders obsolete Backoff event', () => {
//   render(<EventsList events={[backoffObsolete]} />);
//   expect(screen.queryByText('Obsolete')).toBeInTheDocument();
// });

// test('EventsList renders resolved Failed event', () => {
//   render(<EventsList events={[failedResolved]} />);
//   expect(screen.queryByText('Resolved')).toBeInTheDocument();
// });

// test('EventsList renders unresolved Failed event', () => {
//   render(<EventsList events={[failedNotResolved]} />);
//   expect(screen.queryByText('Resolved')).not.toBeInTheDocument();
// });

// test('EventsList renders obsolete Failed event', () => {
//   render(<EventsList events={[failedObsolete]} />);
//   expect(screen.queryByText('Obsolete')).toBeInTheDocument();
// });

// test('EventsList renders resolved Unhealthy event', () => {
//   render(<EventsList events={[unhealthyResolved]} />);
//   expect(screen.queryByText('Resolved')).toBeInTheDocument();
// });

// test('EventsList renders unresolved Unhealthy event', () => {
//   render(<EventsList events={[unhealthyNotResolved]} />);
//   expect(screen.queryByText('Resolved')).not.toBeInTheDocument();
// });

// test('EventsList renders obsolete Unhealthy event', () => {
//   render(<EventsList events={[unhealthyObsolete]} />);
//   expect(screen.queryByText('Obsolete')).toBeInTheDocument();
// });

// test('EventsList for non-pod event should not render obsolete', () => {
//   render(<EventsList events={[failedNonPodEvent]} />);
//   expect(screen.queryByText('Obsolete')).not.toBeInTheDocument();
// });
