import { AzureKeyVaultSecretVersionModel } from '.';

import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<AzureKeyVaultSecretVersionModel> =
  [
    {
      __testDescription: 'Valid full object',
      replicaName: 'replica-abc',
      jobName: 'job-abc',
      batchName: 'batch-abc',
      version: '0001',
      replicaCreated: new Date('2022-07-19T14:31:23Z'),
      jobCreated: new Date('2022-07-19T14:31:23Z'),
      batchCreated: new Date('2022-07-19T14:31:23Z'),
    },
    {
      __testDescription: 'Valid partial object',
      replicaName: 'replica-abc',
      replicaCreated: new Date('2022-07-19T14:31:23Z'),
    },
    {
      __testDescription: 'Invalid full object',
      __testIsInvalidSample: true,
      replicaName: ['anders', 'rolf'] as unknown as string,
      jobName: 'job-abc',
      batchName: 'batch-abc',
      version: '0001',
      replicaCreated: new Date('2022-07-19T14:31:23Z'),
      jobCreated: new Date('2022-07-19T14:31:23Z'),
      batchCreated: new Date('2022-07-19T14:31:23Z'),
    },
    {
      __testDescription: 'Invalid partial object',
      __testIsInvalidSample: true,
      replicaName: 'name',
      replicaCreated: 'undefined' as unknown as Date,
    },
    {
      __testDescription: 'Invalid empty object',
      __testIsInvalidSample: true,
      replicaName: undefined,
      replicaCreated: undefined,
    },
  ];
