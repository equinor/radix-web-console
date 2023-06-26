import { ImageScanModel } from '.';

import { testData as VulnerabilityData } from '../vulnerability/test-data';
import { testData as VulnerabilitySummaryData } from '../vulnerability-summary/test-data';
import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ImageScanModel> = [
  {
    __testDescription: 'Valid full object',
    scanSuccess: true,
    scanTime: new Date(),
    vulnerabilitySummary: VulnerabilitySummaryData[0],
    vulnerabilities: [VulnerabilityData[0]],
  },
  {
    __testDescription: 'Valid empty object',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    scanSuccess: 'Missing' as unknown as boolean,
    scanTime: new Date(),
    vulnerabilitySummary: VulnerabilitySummaryData[0],
    vulnerabilities: [VulnerabilityData[0]],
  },
];
