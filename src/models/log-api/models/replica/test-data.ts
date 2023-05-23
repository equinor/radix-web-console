import { ReplicaModel } from '.';

import { ContainerModel } from '../container';
import { testData as ContainerData } from '../container/test-data';
import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ReplicaModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'name',
    creationTimestamp: new Date(),
    lastKnown: new Date(),
    containers: [ContainerData[0]],
  },
  {
    __testDescription: 'Valid partial object',
    name: 'name',
    containers: [ContainerData[0]],
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: ['name'] as unknown as string,
    creationTimestamp: new Date(),
    lastKnown: new Date(),
    containers: [ContainerData[0]],
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 'name',
    containers: {} as unknown as Array<ContainerModel>,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
    containers: undefined,
  },
];
