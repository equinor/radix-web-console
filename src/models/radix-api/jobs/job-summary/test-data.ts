import { JobSummaryModel } from '.';

import { ProgressStatus } from '../progress-status';
import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<JobSummaryModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'A Job',
    appName: 'appName',
    branch: 'test_branch',
    commitID: '1234abcdef4321',
    created: new Date('2018-11-19T14:31:23Z'),
    triggeredBy: 'test_framework',
    started: new Date('2018-11-19T14:31:23Z'),
    ended: new Date(),
    status: ProgressStatus.Succeeded,
    pipeline: 'build-deploy',
    environments: ['env1', 'env2'],
  },
  {
    __testDescription: 'Valid partial object',
    name: 'A Job',
    created: new Date('2018-11-19T14:31:23Z'),
    status: ProgressStatus.Waiting,
    pipeline: 'build-deploy',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'A Job',
    appName: 'appName',
    branch: 'test_branch',
    commitID: '1234abcdef4321',
    created: new Date('2018-11-19T14:31:23Z'),
    triggeredBy: 'test_framework',
    started: new Date('2018-11-19T14:31:23Z'),
    ended: new Date(),
    status: ProgressStatus.Succeeded,
    pipeline: 'build-deploy',
    environments: {
      environments: ['env1', 'env2'],
    } as unknown as Array<string>,
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 'A Job',
    created: new Date('2018-11-19T14:31:23Z'),
    status: 'Crashed' as unknown as ProgressStatus,
    pipeline: 'build-deploy',
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
