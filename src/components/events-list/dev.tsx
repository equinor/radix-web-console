import { EventsList, type EventsListProps } from '.'

const testData: Array<EventsListProps> = [
  {
    events: [
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
    ],
    isExpanded: false,
  },
  {
    isExpanded: false,
    events: [],
  },
]

export default (
  <div
    className="grid grid--gap-large"
    style={{
      backgroundColor: 'var(--eds_ui_background__default)',
      padding: 'var(--eds_spacing_small)',
    }}
  >
    {testData.map((data, i) => (
      <div
        key={i}
        style={{
          border: 'solid 2px gray',
          borderRadius: 'var(--eds_shape_corners_border_radius)',
          margin: '4px',
        }}
      >
        <div style={{ padding: '10px' }}>
          <EventsList {...data} />
        </div>
      </div>
    ))}
  </div>
)
