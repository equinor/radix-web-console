import { BuildSecretModel } from '.';

import { BuildSecretStatus } from '../build-secret-status';
import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<BuildSecretModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'name',
    status: BuildSecretStatus.Consistent,
  },
  {
    __testDescription: 'Valid partial object',
    name: 'name',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'name',
    status: { value: 'status' } as unknown as BuildSecretStatus,
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 1234 as unknown as string,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
  },
];
