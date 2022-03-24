import { ScheduledBatchSummaryModel } from '.';
import { TestDependencyDataType } from '../model-types';
import { ProgressStatus } from '../progress-status';
import { ScheduledJobSummaryModelValidationMap } from '../scheduled-job-summary';

export const testData: TestDependencyDataType<ScheduledBatchSummaryModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'A Job',
    message: 'message',
    created: new Date('2018-11-19T14:31:23Z'),
    ended: new Date('2018-11-19T14:32:23Z'),
    started: new Date('2018-11-19T14:31:23Z'),
    status: ProgressStatus.Stopped,
    jobList: [ScheduledJobSummaryModelValidationMap[0] as any],
    totalJobCount: 0,
  },
  {
    __testDescription: 'Valid partial object',
    name: 'A Job',
    message: 'message',
    created: new Date('2018-11-19T14:31:23Z'),
    status: ProgressStatus.Queued,
    totalJobCount: 0,
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'A Job',
    message: 'message',
    created: '2O18-ll-19T14:32:23Z' as any,
    ended: new Date('2018-11-19T14:32:23Z'),
    started: new Date('2018-11-19T14:31:23Z'),
    status: ProgressStatus.Stopped,
    jobList: [ScheduledJobSummaryModelValidationMap[0] as any],
    totalJobCount: 0,
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 'A Job',
    message: 'message',
    created: new Date('2018-11-19T14:31:23Z'),
    status: 'ProgressStatus.Queued' as any,
    totalJobCount: 0,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
    message: undefined,
    created: undefined,
    status: undefined,
    totalJobCount: 0,
  },
];
