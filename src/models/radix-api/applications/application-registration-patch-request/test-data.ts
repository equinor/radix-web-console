import { ApplicationRegistrationPatchRequestModel } from '.';

import { testData as ApplicationRegistrationPatchData } from '../application-registration-patch/test-data';
import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ApplicationRegistrationPatchRequestModel> =
  [
    {
      __testDescription: 'Valid full object',
      applicationRegistrationPatch: ApplicationRegistrationPatchData[0],
      acknowledgeWarnings: true,
    },
    {
      __testDescription: 'Valid empty object',
    },
    {
      __testDescription: 'Invalid full object',
      __testIsInvalidSample: true,
      applicationRegistrationPatch: ApplicationRegistrationPatchData[0],
      acknowledgeWarnings: 'cake' as unknown as boolean,
    },
  ];
