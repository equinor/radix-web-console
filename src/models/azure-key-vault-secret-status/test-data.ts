import { AzureKeyVaultSecretStatusModel } from '.';
import { ConfigurationStatus } from '../configuration-status';
import { TestDependencyDataType } from '../model-types';
import { SecretType } from '../secret-type';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<AzureKeyVaultSecretStatusModel> =
  [
    {
      __testDescription: 'Valid full object',
      name: 'name',
      podName: 'pod-abc',
      version: '0001',
    },
    {
      __testDescription: 'Valid partial object',
      name: 'name',
      version: '0001',
    },
    {
      __testDescription: 'Invalid full object',
      __testIsInvalidSample: true,
      name: 'name',
      podName: 'pod-abc',
      version: '0001',
    },
    {
      __testDescription: 'Invalid partial object',
      __testIsInvalidSample: true,
      name: 'name',
      version: '0001',
    },
    {
      __testDescription: 'Invalid empty object',
      __testIsInvalidSample: true,
      name: undefined,
      version: undefined,
    },
  ];
