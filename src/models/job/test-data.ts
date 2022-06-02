import { JobModel } from '.';

import { testData as componentSummaryData } from '../component-summary/test-data';
import { testData as deploymentSummaryData } from '../deployment-summary/test-data';
import { TestDependencyDataType } from '../model-types';
import { ProgressStatus } from '../progress-status';
import { testData as stepData } from '../step/test-data';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<JobModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'name',
    pipeline: 'pipeline',
    status: ProgressStatus.Completed,
    created: new Date(),
    started: new Date(),
    ended: new Date(),
    commitID: 'id',
    triggeredBy: 'you',
    components: [componentSummaryData[0]],
    deployments: [deploymentSummaryData[0]],
    steps: [stepData[0]],
  },
  {
    __testDescription: 'Valid partial object',
    name: 'name',
    pipeline: 'pipeline',
    status: ProgressStatus.Queued,
    created: new Date(),
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'name',
    pipeline: 'pipeline',
    status: ProgressStatus.Completed,
    created: new Date(),
    started: new Date(),
    ended: new Date(),
    commitID: 1337 as unknown as string,
    triggeredBy: 'you',
    components: [componentSummaryData[0]],
    deployments: [deploymentSummaryData[0]],
    steps: [stepData[0]],
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 'name',
    pipeline: ['pipeline1', 'pipeline1'] as unknown as string,
    status: ProgressStatus.Queued,
    created: new Date(),
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
    pipeline: undefined,
    status: undefined,
    created: undefined,
  },
];
