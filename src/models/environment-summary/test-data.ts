import { EnvironmentSummaryModel } from '.';

import { ConfigurationStatus } from '../configuration-status';
import { TestDependencyDataType } from '../model-types';

export const testData: TestDependencyDataType<EnvironmentSummaryModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'name',
    status: ConfigurationStatus.Consistent,
    activeDeployment: {
      name: 'name',
      environment: 'qa',
      activeFrom: new Date(),
      activeTo: new Date(),
      createdByJob: 'created-by-me',
      pipelineJobType: 'job',
      promotedFromEnvironment: 'dev',
      commitID: 'commitID',
    },
    branchMapping: 'mapped-branch',
  },
  {
    __testDescription: 'Valid partial object',
    name: 'name',
    status: ConfigurationStatus.Pending,
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'name',
    status: ConfigurationStatus.Pending,
    activeDeployment: 'invalid' as any,
    branchMapping: 'mapped-branch',
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 'name',
    status: 'Pending.ConfigurationStatus' as any,
  },
];
