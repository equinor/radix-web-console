import { ScheduledBatchSummaryModel } from '.';

import { JobSchedulerProgressStatus } from '../job-scheduler-progress-status';
import { ReplicaSummaryNormalizedModel } from '../replica-summary';
import { testData as ReplicaSummaryData } from '../replica-summary/test-data';
import { testData as ScheduledJobSummaryData } from '../scheduled-job-summary/test-data';
import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ScheduledBatchSummaryModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'A Job',
    message: 'message',
    created: new Date('2018-11-19T14:31:23Z'),
    ended: new Date('2018-11-19T14:32:23Z'),
    started: new Date('2018-11-19T14:31:23Z'),
    status: JobSchedulerProgressStatus.Stopped,
    replica: ReplicaSummaryData[0] as unknown as ReplicaSummaryNormalizedModel,
    jobList: [ScheduledJobSummaryData[0]],
    totalJobCount: 0,
    deploymentName: 'any-deployment',
  },
  {
    __testDescription: 'Valid partial object',
    name: 'A Job',
    created: new Date('2018-11-19T14:31:23Z'),
    status: JobSchedulerProgressStatus.Waiting,
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
    status: JobSchedulerProgressStatus.Stopped,
    replica: ReplicaSummaryData[0] as unknown as ReplicaSummaryNormalizedModel,
    jobList: [ScheduledJobSummaryData[0]],
    totalJobCount: 0,
    deploymentName: 'any-deployment',
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 'A Job',
    created: new Date('2018-11-19T14:31:23Z'),
    status:
      'JobSchedulerProgressStatus.Waiting' as unknown as JobSchedulerProgressStatus,
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