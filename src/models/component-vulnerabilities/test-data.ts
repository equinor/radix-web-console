import { ComponentVulnerabilitiesModel } from '.';

import { TestDependencyDataType } from '../model-types';
import { testData as VulnerabilityData } from '../vulnerability/test-data';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ComponentVulnerabilitiesModel> = [
  {
    __testDescription: 'Valid full object',
    baseImage: 'alpine:3.15',
    vulnerabilities: [VulnerabilityData[0]],
  },
  {
    __testDescription: 'Valid partial object',
    baseImage: 'alpine:3.15',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    baseImage: 3.15 as unknown as string,
    vulnerabilities: [VulnerabilityData[0]],
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    baseImage: { alpine: 3.15 } as unknown as string,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    baseImage: undefined,
  },
];
