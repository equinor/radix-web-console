import { EnvironmentVulnerabilitiesModel } from '.';

import { testData as ImageWithLastScanData } from '../image-with-last-scan/test-data';
import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<EnvironmentVulnerabilitiesModel> =
  [
    {
      __testDescription: 'Valid full object',
      name: 'test',
      components: {
        prod: ImageWithLastScanData[0],
        qa: ImageWithLastScanData[0],
      },
      jobs: {
        job1: ImageWithLastScanData[0],
        job2: ImageWithLastScanData[0],
      },
    },
    {
      __testDescription: 'Valid partial object',
      name: 'test',
    },
    {
      __testDescription: 'Invalid full object',
      __testIsInvalidSample: true,
      name: 123 as unknown as string,
      components: {
        prod: ImageWithLastScanData[0],
        qa: ImageWithLastScanData[0],
      },
      jobs: {
        job1: ImageWithLastScanData[0],
        job2: ImageWithLastScanData[0],
      },
    },
    {
      __testDescription: 'Invalid partial object',
      __testIsInvalidSample: true,
      name: ['test'] as unknown as string,
    },
    {
      __testDescription: 'Invalid empty object',
      __testIsInvalidSample: true,
      name: undefined,
    },
  ];
