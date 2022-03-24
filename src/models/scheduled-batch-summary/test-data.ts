import { ScheduledBatchSummaryModel } from '.';

import { TestDependencyDataType } from '../model-types';
import { ProgressStatus } from '../progress-status';
import { ReplicaSummaryNormalizedModel } from '../replica-summary';
import { testData as ReplicaSummaryData } from '../replica-summary/test-data';
import { testData as ScheduledJobSummaryData } from '../scheduled-job-summary/test-data';

export const testData: TestDependencyDataType<ScheduledBatchSummaryModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'A Job',
    message: 'message',
    created: new Date('2018-11-19T14:31:23Z'),
    ended: new Date('2018-11-19T14:32:23Z'),
    started: new Date('2018-11-19T14:31:23Z'),
    status: ProgressStatus.Stopped,
    replica: ReplicaSummaryData[0] as unknown as ReplicaSummaryNormalizedModel,
    jobList: [ScheduledJobSummaryData[0]],
    totalJobCount: 0,
  },
  {
    __testDescription: 'Valid partial object',
    name: 'A Job',
    created: new Date('2018-11-19T14:31:23Z'),
    status: ProgressStatus.Queued,
    totalJobCount: 0,
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'A Job',
    message: 'message',
    created: '2O18-ll-19T14:32:23Z' as unknown as Date,
    ended: new Date('2018-11-19T14:32:23Z'),
    started: new Date('2018-11-19T14:31:23Z'),
    status: ProgressStatus.Stopped,
    replica: ReplicaSummaryData[0] as unknown as ReplicaSummaryNormalizedModel,
    jobList: [ScheduledJobSummaryData[0]],
    totalJobCount: 0,
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 'A Job',
    created: new Date('2018-11-19T14:31:23Z'),
    status: 'ProgressStatus.Queued' as unknown as ProgressStatus,
    totalJobCount: 0,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
    created: undefined,
    status: undefined,
    totalJobCount: undefined,
  },
];
