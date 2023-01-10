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
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    clientId: 'any-client-id',
    serviceAccountName: ['name1', 'name2'] as unknown as string,
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    clientId: 'any-client-id',
    serviceAccountName: undefined,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    clientId: undefined,
    serviceAccountName: undefined,
  },
];
