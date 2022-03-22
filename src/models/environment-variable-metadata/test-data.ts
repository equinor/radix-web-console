import { EnvironmentVariableMetadataModel } from '.';

import { TestDependencyDataType } from '../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<EnvironmentVariableMetadataModel> =
  [
    {
      __testDescription: 'Valid full object',
      radixConfigValue: 'radixValue',
    },
    {
      __testDescription: 'Valid empty object',
    },
    {
      __testDescription: 'Invalid full object',
      __testIsInvalidSample: true,
      radixConfigValue: ['val1', 'val2'] as unknown as string,
    },
  ];
