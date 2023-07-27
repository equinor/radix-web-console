import { ScheduledJobRequestModel } from '.';

import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ScheduledJobRequestModel> = [
  {
    __testDescription: 'Valid full object',
    deploymentName: 'test-app-deployment',
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    deploymentName: undefined,
  },
];
