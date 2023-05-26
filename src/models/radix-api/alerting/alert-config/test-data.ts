import { AlertConfigModel } from '.';

import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<AlertConfigModel> = [
  {
    __testDescription: 'Valid full object',
    alert: 'a1',
    receiver: 'receiver',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    alert: 'a1',
    receiver: ['receiver1'] as unknown as string,
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    alert: 'a1',
    receiver: undefined,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    alert: undefined,
    receiver: undefined,
  },
];
