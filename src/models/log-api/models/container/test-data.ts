import { ContainerModel } from '.';

import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ContainerModel> = [
  {
    __testDescription: 'Valid full object',
    id: 'id',
    name: 'name',
    creationTimestamp: new Date(),
    lastKnown: new Date(),
  },
  {
    __testDescription: 'Valid partial object',
    id: 'id',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    id: { msg: 'error' } as unknown as string,
    name: 'name',
    creationTimestamp: new Date(),
    lastKnown: new Date(),
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    id: new Date() as unknown as string,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    id: undefined,
  },
];
