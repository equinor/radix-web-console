import { ReplicaSummaryModel } from '.';

import { TestDependencyDataType } from '../model-types';
import { ReplicaStatusEnum } from '../replica-status-enum';

export const testData: TestDependencyDataType<ReplicaSummaryModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'a-replica',
    replicaStatus: { status: ReplicaStatusEnum.Running },
    created: new Date().toString(),
    image: 'any-image:latest',
    imageId: 'any-image@sha256:e0e0075ad506f4c803c1c2cec0e268b046c3c1dd8a',
    restartCount: 5,
    statusMessage: 'statusMessage',
  },
  {
    __testDescription: 'Valid partial object',
    name: 'b-replica',
    replicaStatus: { status: ReplicaStatusEnum.Running },
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
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 'd-replica',
    replicaStatus: { status: ReplicaStatusEnum.Running },
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
