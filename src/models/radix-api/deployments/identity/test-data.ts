import { IdentityModel } from '.';

import { AzureIdentityModel } from '../azure-identity';
import { testData as AzureIdentityData } from '../azure-identity/test-data';
import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<IdentityModel> = [
  {
    __testDescription: 'Valid full object',
    azure: AzureIdentityData[0],
  },
  {
    __testDescription: 'Valid empty object',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    azure: {} as unknown as AzureIdentityModel,
  },
];
