import { ReplicaSummaryModel } from '.';

import { ReplicaStatus } from '../replica-status';
import { testData as ResourceRequirementsData } from '../resource-requirements/test-data';
import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ReplicaSummaryModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'a-replica',
    replicaStatus: { status: ReplicaStatus.Running },
    created: new Date().toString(),
    image: 'any-image:latest',
    imageId: 'any-image@sha256:e0e0075ad506f4c803c1c2cec0e268b046c3c1dd8a',
    restartCount: 5,
    statusMessage: 'statusMessage',
    resources: ResourceRequirementsData[0],
  },
  {
    __testDescription: 'Valid partial object',
    name: 'b-replica',
    replicaStatus: { status: ReplicaStatus.Running },
    created: new Date().toString(),
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'c-replica',
    replicaStatus: { status: 'Pouting' },
    created: new Date().toString(),
    image: 'any-image:latest',
    imageId: 'any-image@sha256:e0e0075ad506f4c803c1c2cec0e268b046c3c1dd8a',
    restartCount: 5,
    statusMessage: 'statusMessage',
    resources: ResourceRequirementsData[0],
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 'd-replica',
    replicaStatus: { status: ReplicaStatus.Running },
    created: 'yesteryear',
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
    replicaStatus: undefined,
    created: undefined,
  },
];