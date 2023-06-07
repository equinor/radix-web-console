import { ScheduledJobSummaryModel } from '.';

import { JobSchedulerProgressStatus } from '../job-scheduler-progress-status';
import { testData as NodeData } from '../node/test-data';
import { ReplicaSummaryNormalizedModel } from '../replica-summary';
import { testData as ReplicaSummaryData } from '../replica-summary/test-data';
import { testData as ResourceRequirementsData } from '../resource-requirements/test-data';
import { TestDependencyDataType } from '../../../model-types';

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
    status: JobSchedulerProgressStatus.Stopped,
    replicaList: [
      ReplicaSummaryData[0] as unknown as ReplicaSummaryNormalizedModel,
    ],
    timeLimitSeconds: 1000,
    backoffLimit: 10,
    resources: ResourceRequirementsData[0],
    node: NodeData[0],
    deploymentName: 'any-deployment',
    failedCount: 0,
  },
  {
    __testDescription: 'Valid partial object',
    name: 'A Job',
    created: new Date('2018-11-19T14:31:23Z'),
    status: JobSchedulerProgressStatus.Waiting,
    backoffLimit: 0,
    failedCount: 0,
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
    status: JobSchedulerProgressStatus.Stopped,
    replicaList: [
      ReplicaSummaryData[0] as unknown as ReplicaSummaryNormalizedModel,
    ],
    timeLimitSeconds: 1000,
    backoffLimit: 10,
    resources: ResourceRequirementsData[0],
    node: NodeData[0],
    deploymentName: 'any-deployment',
    failedCount: 0,
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 'A Job',
    created: new Date('2018-11-19T14:31:23Z'),
    status: 'ProgressStatus.Queued' as unknown as JobSchedulerProgressStatus,
    backoffLimit: 10,
    failedCount: 0,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
    created: undefined,
    status: undefined,
    backoffLimit: undefined,
    failedCount: undefined,
  },
];
