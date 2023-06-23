import { ImageModel } from '.';

import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ImageModel> = [
  {
    __testDescription: 'Valid full object',
    image: 'image',
    baseImage: 'alpine:3.15',
  },
  {
    __testDescription: 'Valid partial object',
    image: 'image',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    image: 'image',
    baseImage: false as unknown as string,
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    image: ['image1', 'image2'] as unknown as string,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    image: undefined,
  },
];
