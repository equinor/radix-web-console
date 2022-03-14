import { EnvironmentVariableModel } from '.';

import { testData as EnvironmentVariableMetadataData } from '../environment-variable-metadata/test-data';
import { TestDependencyDataType } from '../model-types';

export const testData: TestDependencyDataType<EnvironmentVariableModel> = [
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
    __testDescription: 'Invalid type partial object',
    __testIsInvalidSample: true,
    name: 501 as any,
    value: 'value',
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: undefined,
    value: 'value',
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
    value: undefined,
  },
];
