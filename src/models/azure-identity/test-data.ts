import { AzureIdentityModel } from '.';

import { TestDependencyDataType } from '../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<AzureIdentityModel> = [
  {
    __testDescription: 'Valid full object',
    clientId: 'any-client-id',
    serviceAccountName: 'any-sa',
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    clientId: undefined,
    serviceAccountName: undefined,
  },
];
