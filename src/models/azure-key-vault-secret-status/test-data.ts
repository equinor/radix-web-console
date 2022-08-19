import { AzureKeyVaultSecretStatusModel } from '.';
import { TestDependencyDataType } from '../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<AzureKeyVaultSecretStatusModel> =
  [
    {
      __testDescription: 'Valid full object',
      replicaName: 'replica-abc',
      jobName: 'job-abc',
      batchName: 'batch-abc',
      version: '0001',
      replicaCreatedTimestamp: new Date('2022-07-19T14:31:23Z'),
    },
    {
      __testDescription: 'Valid partial object',
      replicaName: 'replica-abc',
      version: '0001',
      replicaCreatedTimestamp: new Date('2022-07-19T14:31:23Z'),
    },
    {
      __testDescription: 'Invalid full object',
      __testIsInvalidSample: true,
      replicaName: 'replica-abc',
      jobName: 'job-abc',
      batchName: 'batch-abc',
      version: '0001',
      replicaCreatedTimestamp: null,
    },
    {
      __testDescription: 'Invalid partial object',
      __testIsInvalidSample: true,
      version: '0001',
      replicaCreatedTimestamp: null,
    },
    {
      __testDescription: 'Invalid empty object',
      __testIsInvalidSample: true,
      version: undefined,
      replicaCreatedTimestamp: undefined,
    },
  ];
