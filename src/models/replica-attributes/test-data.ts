import {
  ReplicaNodeModel,
  ReplicaResourceModel,
  ReplicaResourcesModel,
} from '.';

import { TestDependencyDataType } from '../model-types';

/*
 * TestData array for ReplicaNodeModel
 *
 * Note: First object should always be valid
 */
export const replicaNodeTestData: TestDependencyDataType<ReplicaNodeModel> = [
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

/*
 * TestData array for ReplicaResourceModel
 *
 * Note: First object should always be valid
 */
export const replicaResourceTestData: TestDependencyDataType<ReplicaResourceModel> =
  [
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

/*
 * TestData array for ReplicaResourcesModel
 *
 * Note: First object should always be valid
 */
export const replicaResourcesTestData: TestDependencyDataType<ReplicaResourcesModel> =
  [
    {
      __testDescription: 'Valid full object',
      limits: replicaResourceTestData[0],
      requests: replicaResourceTestData[0],
    },
    {
      __testDescription: 'Valid empty object',
    },
    {
      __testDescription: 'Invalid full object',
      __testIsInvalidSample: true,
      limits: replicaResourceTestData[0],
      requests: { cpu: new Date() } as unknown as ReplicaResourceModel,
    },
  ];
