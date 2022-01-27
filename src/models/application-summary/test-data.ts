import { ApplicationSummaryModel } from '.';

import { TestDependencyDataType } from '../model-types';
import { ProgressStatus } from '../progress-status';

export const testData: TestDependencyDataType<ApplicationSummaryModel> = [
  {
    __testDescription: 'Latest job running',
    name: 'My app 1',
    latestJob: {
      environments: ['an-environment'],
      name: 'some-job',
      pipeline: 'build-deploy',
      created: new Date('2018-11-19T14:31:23Z'),
      started: new Date('2018-11-19T14:31:23Z'),
      status: ProgressStatus.Running,
    },
  },
  {
    __testDescription: 'Latest job failed',
    name: 'My app 2',
    latestJob: {
      environments: ['an-environment'],
      name: 'some-job',
      pipeline: 'build-deploy',
      created: new Date('2018-11-19T14:31:23Z'),
      started: new Date('2018-11-19T14:31:23Z'),
      ended: new Date('2018-11-19T14:37:10Z'),
      status: ProgressStatus.Failed,
    },
  },
];
