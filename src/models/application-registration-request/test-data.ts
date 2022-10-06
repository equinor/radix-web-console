import { ApplicationRegistrationRequestModel } from '.';

import { testData as ApplicationRegistrationData } from '../application-registration/test-data';
import { TestDependencyDataType } from '../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ApplicationRegistrationRequestModel> =
  [
    {
      __testDescription: 'Valid full object',
      applicationRegistration: ApplicationRegistrationData[0],
      acknowledgeWarnings: true,
    },
    {
      __testDescription: 'Valid empty object',
    },
    {
      __testDescription: 'Invalid full object',
      __testIsInvalidSample: true,
      applicationRegistration: ApplicationRegistrationData[0],
      acknowledgeWarnings: 'cake' as unknown as boolean,
    },
  ];
