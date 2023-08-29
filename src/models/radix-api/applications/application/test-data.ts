import { ApplicationModel } from '.';

import { testData as ApplicationAliasData } from '../application-alias/test-data';
import { testData as ApplicationRegistrationData } from '../application-registration/test-data';
import { testData as EnvironmentSummaryData } from '../../environments/environment-summary/test-data';
import { testData as JobSummaryData } from '../../jobs/job-summary/test-data';
import { TestDependencyDataType } from '../../../model-types';
import { ApplicationRegistrationModel } from '../application-registration';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ApplicationModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'my-name',
    registration: ApplicationRegistrationData[0],
    environments: [EnvironmentSummaryData[0]],
    jobs: [JobSummaryData[0]],
    appAlias: ApplicationAliasData[0],
    userIsAdmin: true,
  },
  {
    __testDescription: 'Valid partial object',
    name: 'my-name',
    registration: ApplicationRegistrationData[0],
    userIsAdmin: true,
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'my-name',
    registration: [] as unknown as ApplicationRegistrationModel,
    environments: [EnvironmentSummaryData[0]],
    jobs: [JobSummaryData[0]],
    appAlias: ApplicationAliasData[0],
    userIsAdmin: true,
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: true as unknown as string,
    registration: ApplicationRegistrationData[0],
    userIsAdmin: true,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
    registration: undefined,
    userIsAdmin: undefined,
  },
];
