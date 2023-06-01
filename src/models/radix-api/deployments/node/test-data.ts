import { NodeModel } from '.';

import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<NodeModel> = [
  {
    __testDescription: 'Valid full object',
    gpu: '500m',
    gpuCount: '250m',
  },
  {
    __testDescription: 'Valid empty object',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    gpu: '500m',
    gpuCount: 5 as unknown as string,
  },
];
