import { ResourcesModel } from '.';

import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ResourcesModel> = [
  {
    __testDescription: 'Valid full object',
    cpu: '500m',
    memory: '250m',
  },
  {
    __testDescription: 'Valid empty object',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    cpu: '500m',
    memory: [5] as unknown as string,
  },
];
