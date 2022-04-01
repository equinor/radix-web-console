import { EnvironmentModel } from '.';

import { ConfigurationStatus } from '../configuration-status';
import { TestDependencyDataType } from '../model-types';
import { testData as DeploymentData } from '../deployment/test-data';
import { testData as DeploymentSummaryData } from '../deployment-summary/test-data';
import { testData as SecretData } from '../secret/test-data';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<EnvironmentModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'roger-test-app',
    status: ConfigurationStatus.Consistent,
    branchMapping: 'AF32308E',
    activeDeployment: DeploymentData[0],
    deployments: [DeploymentSummaryData[0]],
    secrets: [SecretData[0]],
  },
  {
    __testDescription: 'Valid partial object',
    name: 'roger-test-app',
    status: ConfigurationStatus.Consistent,
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'roger-test-app',
    status: ConfigurationStatus.Consistent,
    branchMapping: { id: 'AF32308E' } as unknown as string,
    activeDeployment: DeploymentData[0],
    deployments: [DeploymentSummaryData[0]],
    secrets: [SecretData[0]],
  },
  {
    __testDescription: 'Valid partial object',
    __testIsInvalidSample: true,
    name: 'roger-test-app',
    status: 'Err: null' as unknown as ConfigurationStatus,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
    status: undefined,
  },
];
