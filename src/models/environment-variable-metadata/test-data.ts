import { EnvironmentVariableMetadataModel } from '.';

import { TestDependencyDataType } from '../model-types';

export const testData: TestDependencyDataType<EnvironmentVariableMetadataModel> =
  [
    {
      __testDescription: 'Valid object',
      radixConfigValue: 'radixValue',
    },
    {
      __testDescription: 'Valid empty object',
    },
    {
      __testDescription: 'Invalid object',
      __testIsInvalidSample: true,
      radixConfigValue: 1337 as any,
    },
  ];
