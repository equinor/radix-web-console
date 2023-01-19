import { ScheduledJobSummaryModel } from '.';

import { testData as ReplicaSummaryData } from '../replica-summary/test-data';
import { TestDependencyDataType } from '../model-types';
import { ProgressStatus } from '../progress-status';
import { ReplicaSummaryNormalizedModel } from '../replica-summary';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ScheduledJobSummaryModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'A Job',
    batchName: 'batchName',
    jobId: 'jobId',
    message: 'message',
    created: new Date('2018-11-19T14:31:23Z'),
    ended: new Date('2018-11-19T14:32:23Z'),
    started: new Date('2018-11-19T14:31:23Z'),
    status: ProgressStatus.Stopped,
    replicaList: [
      ReplicaSummaryData[0] as unknown as ReplicaSummaryNormalizedModel,
    ],
    backoffLimit: 0,
  },
  {
    __testDescription: 'Valid partial object',
    name: 'A Job',
    created: new Date('2018-11-19T14:31:23Z'),
    status: ProgressStatus.Queued,
    backoffLimit: 0,
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'A Job',
    batchName: 'batchName',
    jobId: 'jobId',
    message: 'message',
    created: '2O18-ll-19T14:32:23Z' as unknown as Date,
    ended: new Date('2018-11-19T14:32:23Z'),
    started: new Date('2018-11-19T14:31:23Z'),
    status: ProgressStatus.Stopped,
    replicaList: [
      ReplicaSummaryData[0] as unknown as ReplicaSummaryNormalizedModel,
    ],
    backoffLimit: 10,
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 'A Job',
    created: new Date('2018-11-19T14:31:23Z'),
    status: 'ProgressStatus.Queued' as unknown as ProgressStatus,
    backoffLimit: 10,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
    created: undefined,
    status: undefined,
    backoffLimit: 0,
  },
];
