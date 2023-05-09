import { ReplicaModel } from '.';

import { ContainerModel } from '../container';
import { testData as containerData } from '../container/test-data';
import { TestDependencyDataType } from '../../model-types';

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
    containers: [containerData[0]],
  },
  {
    __testDescription: 'Valid partial object',
    name: 'name',
    containers: [containerData[0]],
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: ['name'] as unknown as string,
    creationTimestamp: new Date(),
    containers: [containerData[0]],
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 'name',
    containers: containerData[0] as unknown as Array<ContainerModel>,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
    containers: undefined,
  },
];
