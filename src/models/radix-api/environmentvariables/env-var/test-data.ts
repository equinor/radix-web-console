import { EnvVarModel } from '.';

import { testData as EnvironmentVariableMetadataData } from '../env-var-metadata/test-data';
import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<EnvVarModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'name',
    value: 'value',
    metadata: EnvironmentVariableMetadataData[0],
  },
  {
    __testDescription: 'Valid partial object',
    name: 'name',
    value: 'value',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'name',
    value: ['value'] as unknown as string,
    metadata: EnvironmentVariableMetadataData[0],
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 501 as unknown as string,
    value: 'value',
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
    value: undefined,
  },
];