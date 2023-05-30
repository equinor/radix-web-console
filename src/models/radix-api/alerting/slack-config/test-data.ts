import { SlackConfigModel } from '.';

import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<SlackConfigModel> = [
  {
    __testDescription: 'Valid full object',
    enabled: true,
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    enabled: {} as unknown as boolean,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    enabled: undefined,
  },
];
