import { JobModel } from '.';

import { RadixJobCondition } from '../radix-job-condition';
import { testData as stepData } from '../step/test-data';
import { testData as componentSummaryData } from '../../deployments/component-summary/test-data';
import { testData as deploymentSummaryData } from '../../deployments/deployment-summary/test-data';
import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<JobModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'name',
    branch: 'branch',
    commitID: 'id',
    created: new Date(),
    triggeredBy: 'you',
    started: new Date(),
    ended: new Date(),
    status: RadixJobCondition.Succeeded,
    pipeline: 'pipeline',
    steps: [stepData[0]],
    deployments: [deploymentSummaryData[0]],
    components: [componentSummaryData[0]],
    promotedDeploymentName: 'comp-abc123',
    promotedFromEnvironment: 'dev',
    promotedToEnvironment: 'qa',
  },
  {
    __testDescription: 'Valid partial object',
    name: 'name',
    created: new Date(),
    status: RadixJobCondition.Queued,
    pipeline: 'pipeline',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'name',
    branch: 'branch',
    commitID: 1337 as unknown as string,
    created: new Date(),
    triggeredBy: 'you',
    started: new Date(),
    ended: new Date(),
    status: RadixJobCondition.Succeeded,
    pipeline: 'pipeline',
    promotedDeploymentName: 'comp-abc123',
    promotedFromEnvironment: 'dev',
    promotedToEnvironment: 'qa',
    steps: [stepData[0]],
    deployments: [deploymentSummaryData[0]],
    components: [componentSummaryData[0]],
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 'name',
    created: new Date(),
    status: RadixJobCondition.Waiting,
    pipeline: ['pipeline1', 'pipeline1'] as unknown as string,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
    created: undefined,
    status: undefined,
    pipeline: undefined,
  },
];
