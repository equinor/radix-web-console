import {
  ScheduledJobList,
  ScheduledJobListProps,
} from '../component/scheduled-job-list';
import { ProgressStatus } from '../../models/progress-status';
import { ReplicaStatus } from '../../models/radix-api/deployments/replica-status';

const testData: Array<ScheduledJobListProps> = [
  {
    appName: 'some_app_name',
    envName: 'test-env',
    jobComponentName: 'job-JQERS1',
    totalJobCount: 0,
    scheduledJobList: [
      {
        created: new Date('2021-07-28T06:33:34.000Z'),
        ended: new Date('2021-07-28T06:33:34.000Z'),
        name: 'testing2',
        started: new Date('2021-07-28T06:33:34.000Z'),
        status: ProgressStatus.Waiting,
        replicaList: [
          {
            name: 'rep-113ds',
            created: new Date('2021-07-28T06:33:34.000Z'),
            status: ReplicaStatus.Failing,
            restartCount: 1,
            statusMessage: 'Status_msg_test',
          },
        ],
        backoffLimit: 0,
        failedCount: 0,
      },
      {
        created: new Date('2021-07-28T06:33:34.000Z'),
        ended: new Date('2021-07-28T06:33:34.000Z'),
        name: '1234567-job-test',
        started: new Date('2021-07-28T06:33:34.000Z'),
        status: ProgressStatus.Queued,
        replicaList: [
          {
            name: 'rep-113ds',
            created: new Date('2021-07-28T06:33:34.000Z'),
            status: ReplicaStatus.Failing,
            restartCount: 1,
            statusMessage: 'Status_msg_test',
          },
        ],
        backoffLimit: 0,
        failedCount: 0,
      },
      {
        created: new Date('2021-07-28T06:33:34.000Z'),
        ended: new Date('2021-07-28T06:33:34.000Z'),
        name: '1234567-job-test',
        started: new Date('2021-07-28T06:33:34.000Z'),
        status: ProgressStatus.Running,
        replicaList: [
          {
            name: 'rep-113ds',
            created: new Date('2021-07-28T06:33:34.000Z'),
            status: ReplicaStatus.Failing,
            restartCount: 1,
            statusMessage: 'Status_msg_test',
          },
        ],
        backoffLimit: 0,
        failedCount: 0,
      },
      {
        created: new Date('2021-07-28T06:33:34.000Z'),
        ended: new Date('2021-07-28T06:33:34.000Z'),
        name: '1234567-job-test',
        started: new Date('2021-07-28T06:33:34.000Z'),
        status: ProgressStatus.Succeeded,
        replicaList: [
          {
            name: 'rep-113ds',
            created: new Date('2021-07-28T06:33:34.000Z'),
            status: ReplicaStatus.Failing,
            restartCount: 1,
            statusMessage: 'Status_msg_test',
          },
        ],
        backoffLimit: 0,
        failedCount: 0,
      },
      {
        created: new Date('2021-07-28T06:33:34.000Z'),
        ended: new Date('2021-07-28T06:33:34.000Z'),
        name: '1234567-job-test',
        started: new Date('2021-07-28T06:33:34.000Z'),
        status: ProgressStatus.Stopping,
        replicaList: [
          {
            name: 'rep-113ds',
            created: new Date('2021-07-28T06:33:34.000Z'),
            status: ReplicaStatus.Failing,
            restartCount: 1,
            statusMessage: 'Status_msg_test',
          },
        ],
        backoffLimit: 0,
        failedCount: 0,
      },
      {
        created: new Date('2021-07-28T06:33:34.000Z'),
        ended: new Date('2021-07-28T06:33:34.000Z'),
        name: '1234567-job-test',
        started: new Date('2021-07-28T06:33:34.000Z'),
        status: ProgressStatus.Stopped,
        replicaList: [
          {
            name: 'rep-113ds',
            created: new Date('2021-07-28T06:33:34.000Z'),
            status: ReplicaStatus.Failing,
            restartCount: 1,
            statusMessage: 'Status_msg_test',
          },
        ],
        backoffLimit: 0,
        failedCount: 0,
      },
      {
        created: new Date('2021-07-28T06:33:34.000Z'),
        ended: new Date('2021-07-28T06:33:34.000Z'),
        name: '1234567-job-test',
        started: new Date('2021-07-28T06:33:34.000Z'),
        status: ProgressStatus.Failed,
        replicaList: [
          {
            name: 'rep-113ds',
            created: new Date('2021-07-28T06:33:34.000Z'),
            status: ReplicaStatus.Failing,
            restartCount: 1,
            statusMessage: 'Status_msg_test',
          },
        ],
        backoffLimit: 0,
        failedCount: 0,
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
        created: new Date('2021-07-28T06:33:34.000Z'),
        ended: new Date('2021-07-28T06:33:34.000Z'),
        name: 'testing2',
        started: new Date('2021-07-28T06:33:34.000Z'),
        status: ProgressStatus.Waiting,
        replicaList: [
          {
            name: 'rep-113ds',
            created: new Date('2021-07-28T06:33:34.000Z'),
            status: ReplicaStatus.Failing,
            restartCount: 1,
            statusMessage: 'Status_msg_test',
          },
        ],
        backoffLimit: 0,
        failedCount: 0,
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
