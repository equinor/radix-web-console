import { ImageWithLastScanModel } from '.';

import { testData as ImageData } from '../image/test-data';
import { testData as ImageScanData } from '../image-scan/test-data';
import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ImageWithLastScanModel> = [
  {
    __testDescription: 'Valid object',
    ...ImageData[0],
    ...ImageScanData[0],
  },
];
