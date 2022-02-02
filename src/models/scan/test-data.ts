import { ScanModel } from '.';

import { TestDependencyDataType } from '../model-types';
import { ScanStatus } from '../scan-status';

export const testData: TestDependencyDataType<ScanModel> = [
  {
    __testDescription: 'Success status',
    status: ScanStatus.Success,
    reason: 'any reason',
    vulnerabilities: null,
  },
  {
    __testDescription: 'Missing status',
    status: ScanStatus.Missing,
    reason: 'any reason',
    vulnerabilities: null,
  },
  {
    __testDescription: 'Vulnerabilities is set',
    status: ScanStatus.Success,
    vulnerabilities: {
      critical: 5,
    },
  },
  {
    __testDescription: 'invalid vulnerabilities prop should not fail',
    status: ScanStatus.Success,
    vulnerabilities: 'a string' as any,
  },
  {
    __testDescription: 'invalid status',
    __testIsInvalidSample: true,
    status: 'Invalid' as any,
    vulnerabilities: undefined,
  },
];
