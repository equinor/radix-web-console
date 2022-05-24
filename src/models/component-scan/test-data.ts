import { ComponentScanModel } from '.';

import { TestDependencyDataType } from '../model-types';
import { testData as VulnerabilityData } from '../vulnerability/test-data';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ComponentScanModel> = [
  {
    __testDescription: 'Valid full object',
    image: 'image',
    baseImage: 'alpine:3.15',
    scanSuccess: true,
    scanTime: new Date(),
    vulnerabilities: [VulnerabilityData[0]],
  },
  {
    __testDescription: 'Valid partial object',
    image: 'image',
    baseImage: 'alpine:3.15',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    image: 'image',
    baseImage: 3.15 as unknown as string,
    scanSuccess: true,
    scanTime: new Date(),
    vulnerabilities: [VulnerabilityData[0]],
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    image: 'image',
    baseImage: { alpine: 3.15 } as unknown as string,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    image: undefined,
    baseImage: undefined,
  },
];
