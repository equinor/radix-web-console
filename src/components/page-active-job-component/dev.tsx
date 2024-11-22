import { ScheduledJobList } from '../component/scheduled-job/scheduled-job-list';

const testData: Array<Parameters<typeof ScheduledJobList>[0]> = [
  {
    appName: 'some_app_name',
    envName: 'test-env',
    jobComponentName: 'job-JQERS1',
    totalJobCount: 0,
    scheduledJobList: [
      {
        created: '2021-07-28T06:33:34.000Z',
        ended: '2021-07-28T06:33:34.000Z',
        name: 'testing2',
        started: '2021-07-28T06:33:34.000Z',
        status: 'Waiting',
        replicaList: [
          {
            name: 'rep-113ds',
            created: '2021-07-28T06:33:34.000Z',
            replicaStatus: { status: 'Failed' },
            restartCount: 1,
            statusMessage: 'Status_msg_test',
          },
        ],
        backoffLimit: 0,
        failedCount: 0,
        deploymentName: '',
      },
      {
        created: '2021-07-28T06:33:34.000Z)',
        ended: '2021-07-28T06:33:34.000Z',
        name: '1234567-job-test',
        started: '2021-07-28T06:33:34.000Z',
        status: 'Waiting',
        replicaList: [
          {
            name: 'rep-113ds',
            created: '2021-07-28T06:33:34.000Z',
            replicaStatus: { status: 'Failed' },
            restartCount: 1,
            statusMessage: 'Status_msg_test',
          },
        ],
        backoffLimit: 0,
        failedCount: 0,
        deploymentName: '',
      },
      {
        created: '2021-07-28T06:33:34.000Z',
        ended: '2021-07-28T06:33:34.000Z',
        name: '1234567-job-test',
        started: '2021-07-28T06:33:34.000Z',
        status: 'Running',
        replicaList: [
          {
            name: 'rep-113ds',
            created: '2021-07-28T06:33:34.000Z',
            replicaStatus: { status: 'Failed' },
            restartCount: 1,
            statusMessage: 'Status_msg_test',
          },
        ],
        backoffLimit: 0,
        failedCount: 0,
        deploymentName: '',
      },
      {
        created: '2021-07-28T06:33:34.000Z',
        ended: '2021-07-28T06:33:34.000Z',
        name: '1234567-job-test',
        started: '2021-07-28T06:33:34.000Z',
        status: 'Succeeded',
        replicaList: [
          {
            name: 'rep-113ds',
            created: '2021-07-28T06:33:34.000Z',
            replicaStatus: { status: 'Failed' },
            restartCount: 1,
            statusMessage: 'Status_msg_test',
          },
        ],
        backoffLimit: 0,
        failedCount: 0,
        deploymentName: '',
      },
      {
        created: '2021-07-28T06:33:34.000Z',
        ended: '2021-07-28T06:33:34.000Z',
        name: '1234567-job-test',
        started: '2021-07-28T06:33:34.000Z',
        status: 'Stopping',
        replicaList: [
          {
            name: 'rep-113ds',
            created: '2021-07-28T06:33:34.000Z',
            replicaStatus: { status: 'Failed' },
            restartCount: 1,
            statusMessage: 'Status_msg_test',
          },
        ],
        backoffLimit: 0,
        failedCount: 0,
        deploymentName: '',
      },
      {
        created: '2021-07-28T06:33:34.000Z',
        ended: '2021-07-28T06:33:34.000Z',
        name: '1234567-job-test',
        started: '2021-07-28T06:33:34.000Z',
        status: 'Stopped',
        replicaList: [
          {
            name: 'rep-113ds',
            created: '2021-07-28T06:33:34.000Z',
            replicaStatus: { status: 'Failed' },
            restartCount: 1,
            statusMessage: 'Status_msg_test',
          },
        ],
        backoffLimit: 0,
        failedCount: 0,
        deploymentName: '',
      },
      {
        created: '2021-07-28T06:33:34.000Z',
        ended: '2021-07-28T06:33:34.000Z',
        name: '1234567-job-test',
        started: '2021-07-28T06:33:34.000Z',
        status: 'Failed',
        replicaList: [
          {
            name: 'rep-113ds',
            created: '2021-07-28T06:33:34.000Z',
            replicaStatus: { status: 'Failed' },
            restartCount: 1,
            statusMessage: 'Status_msg_test',
          },
        ],
        backoffLimit: 0,
        failedCount: 0,
        deploymentName: '',
      },
    ],
  },
  {
    appName: 'some_app_name',
    envName: 'test-env',
    jobComponentName: 'job-JQERS1',
    totalJobCount: 0,
    scheduledJobList: [
      {
        created: '2021-07-28T06:33:34.000Z',
        ended: '2021-07-28T06:33:34.000Z',
        name: 'testing2',
        started: '2021-07-28T06:33:34.000Z',
        status: 'Waiting',
        replicaList: [
          {
            name: 'rep-113ds',
            created: '2021-07-28T06:33:34.000Z',
            replicaStatus: { status: 'Failed' },
            restartCount: 1,
            statusMessage: 'Status_msg_test',
          },
        ],
        backoffLimit: 0,
        failedCount: 0,
        deploymentName: '',
      },
    ],
  },
  {
    appName: 'some_app_name',
    envName: 'test-env',
    jobComponentName: 'job-JQERS1',
    totalJobCount: 0,
  },
];

export default (
  <div style={{ backgroundColor: 'var(--eds_ui_background__default)' }}>
    {testData.map((x, i) => (
      <div key={i} className="grid grid--gap-medium">
        <ScheduledJobList {...x} />
        <br />
      </div>
    ))}
  </div>
);
