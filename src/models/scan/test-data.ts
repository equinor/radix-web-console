import { ScanModel } from '.';

import { TestDependencyDataType } from '../model-types';
import { ScanStatus } from '../scan-status';
import { testData as VulnerabilityData } from '../scan-api/models/vulnerability-summary/test-data';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ScanModel> = [
  {
    __testDescription: 'Valid full object',
    status: ScanStatus.Success,
    reason: 'any reason',
    vulnerabilities: VulnerabilityData[0],
  },
  {
    __testDescription: 'Valid partial object',
    status: ScanStatus.Missing,
    vulnerabilities: VulnerabilityData[0],
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    status: ScanStatus.Success,
    reason: {} as unknown as string,
    vulnerabilities: VulnerabilityData[0],
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    status: '[object Object]' as unknown as ScanStatus,
    vulnerabilities: VulnerabilityData[0],
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    status: undefined,
    vulnerabilities: undefined,
  },
];
