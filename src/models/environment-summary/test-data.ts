import { EnvironmentSummaryModel } from '.';

import { ConfigurationStatus } from '../configuration-status';
import { DeploymentSummaryModel } from '../deployment-summary';
import { testData as DeploymentSummaryData } from '../deployment-summary/test-data';
import { TestDependencyDataType } from '../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<EnvironmentSummaryModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'name',
    status: ConfigurationStatus.Consistent,
    activeDeployment: DeploymentSummaryData[0],
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
    activeDeployment: 'invalid' as unknown as DeploymentSummaryModel,
    branchMapping: 'mapped-branch',
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 'name',
    status: 'Pending.ConfigurationStatus' as unknown as ConfigurationStatus,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
    status: undefined,
  },
];
