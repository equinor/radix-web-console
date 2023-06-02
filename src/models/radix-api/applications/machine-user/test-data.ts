import { MachineUserModel } from '.';

import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<MachineUserModel> = [
  {
    __testDescription: 'Valid full object',
    token: 'token',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    token: true as unknown as string,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    token: undefined,
  },
];
