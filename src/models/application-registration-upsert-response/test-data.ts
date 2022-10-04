import { ApplicationRegistrationUpsertResponseModel } from '.';

import { testData as ApplicationRegistrationData } from '../application-registration/test-data';
import { TestDependencyDataType } from '../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ApplicationRegistrationUpsertResponseModel> =
  [
    {
      __testDescription: 'Valid full object',
      applicationRegistration: ApplicationRegistrationData[0],
      warnings: ['warn_1', 'warn_2'],
    },
    {
      __testDescription: 'Valid empty object',
    },
    {
      __testDescription: 'Invalid full object',
      __testIsInvalidSample: true,
      applicationRegistration: ApplicationRegistrationData[0],
      warnings: true as unknown as Array<string>,
    },
  ];
