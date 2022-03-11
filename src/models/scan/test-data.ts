import { ScanModel } from '.';

import { TestDependencyDataType } from '../model-types';
import { ScanStatus } from '../scan-status';
import { testData as VulnerabilityData } from '../vulnerability-summary/test-data';

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
    reason: {} as any,
    vulnerabilities: VulnerabilityData[0],
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    status: '[object Object]' as any,
    vulnerabilities: VulnerabilityData[0],
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    status: undefined,
    vulnerabilities: undefined,
  },
];
