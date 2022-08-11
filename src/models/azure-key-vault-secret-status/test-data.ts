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
      version: '0001',
    },
    {
      __testDescription: 'Valid partial object',
      version: '0001',
    },
    {
      __testDescription: 'Invalid full object',
      __testIsInvalidSample: true,
      replicaName: 'replica-abc',
      version: '0001',
    },
    {
      __testDescription: 'Invalid partial object',
      __testIsInvalidSample: true,
      version: '0001',
    },
    {
      __testDescription: 'Invalid empty object',
      __testIsInvalidSample: true,
      version: undefined,
    },
  ];
