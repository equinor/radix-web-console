import type { Event } from '../../store/radix-api'

export const mockedEvents: ReadonlyArray<Event> = [
  {
    lastTimestamp: '2020-12-22T14:38:36Z',
    involvedObjectKind: 'Pod',
    involvedObjectNamespace: 'myapp-production',
    involvedObjectName: 'www-74cb7c986-fgcrl',
    involvedObjectState: {
      pod: { ready: true, started: true, restartCount: 0 },
    },
    type: 'Warning',
    reason: 'Unhealthy',
    message: "'Readiness probe failed: dial tcp 10.40.1.5:3003: connect: connection refused'",
  },
  {
    lastTimestamp: '2020-12-22T14:38:36Z',
    involvedObjectKind: 'Pod',
    involvedObjectNamespace: 'myapp-production',
    involvedObjectName: 'www-74cb7c986-fgcrl',
    involvedObjectState: {
      pod: { ready: false, started: true, restartCount: 0 },
    },
    type: 'Warning',
    reason: 'Failed',
    message: "'Missing secret'",
  },
  {
    lastTimestamp: '2019-12-22T14:38:36Z',
    involvedObjectKind: 'Pod',
    involvedObjectNamespace: 'myapp-production',
    involvedObjectName: 'echo-7ddf44dbfd-cszxr',
    involvedObjectState: {
      pod: { ready: false, started: true, restartCount: 0 },
    },
    type: 'Warning',
    reason: 'Unhealthy',
    message: "'Readiness probe failed: dial tcp 10.40.1.5:3003: connect: connection refused'",
  },
  {
    lastTimestamp: '2019-12-22T14:38:36Z',
    involvedObjectKind: 'Pod',
    involvedObjectNamespace: 'myapp-production',
    involvedObjectName: 'echo-87533fd976-jcvrt',
    type: 'Warning',
    reason: 'Unhealthy',
    message: "'Readiness probe failed: dial tcp 10.40.1.5:3003: connect: connection refused'",
  },
  {
    lastTimestamp: '2019-12-22T14:38:36Z',
    involvedObjectKind: 'Pod',
    involvedObjectNamespace: 'myapp-production',
    involvedObjectName: 'echo-87533fd976-jcvrt',
    involvedObjectState: {
      pod: { ready: false, restartCount: 0 },
    },
    type: 'Warning',
    reason: 'FailedScheduling',
    message: "'msg'",
  },
  {
    lastTimestamp: '2019-12-22T14:38:36Z',
    involvedObjectKind: 'Pod',
    involvedObjectNamespace: 'myapp-production',
    involvedObjectName: 'echo-87533fd976-jcvrt',
    type: 'Warning',
    reason: 'FailedScheduling',
    message: "'msg'",
  },
  {
    lastTimestamp: '2019-12-22T14:38:36Z',
    involvedObjectKind: 'Pod',
    involvedObjectNamespace: 'myapp-production',
    involvedObjectName: 'www-74cb7c986-fgcrl',
    type: 'Normal',
    reason: 'Created',
    message: "'Created container web'",
  },
]
