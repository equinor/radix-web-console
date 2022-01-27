import { EnvironmentVariableModel } from '.';

import { TestDependencyDataType } from '../model-types';

export const testData: TestDependencyDataType<EnvironmentVariableModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'name',
    value: 'value',
    metadata: {
      radixConfigValue: 'radixValue',
    },
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
