import { ApplicationModel } from '.';

import { testData as ApplicationRegistrationData } from '../application-registration/test-data';
import { TestDependencyDataType } from '../model-types';
import { testData as EnvironmentSummaryData } from '../radix-api/environments/environment-summary/test-data';
import { testData as JobSummaryData } from '../radix-api/jobs/job-summary/test-data';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ApplicationModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'my-name',
    owner: 'them',
    repository: 'rep-osi/tory',
    creator: 'that guy',
    jobs: [JobSummaryData[0]],
    registration: ApplicationRegistrationData[0],
    environments: [EnvironmentSummaryData[0]],
    appAlias: {
      componentName: 'compName',
      environmentName: 'envName',
      url: 'lru',
    },
  },
  {
    __testDescription: 'Valid partial object',
    name: 'my-name',
    owner: 'them',
    repository: 'rep-osi/tory',
    creator: 'that guy',
    jobs: [JobSummaryData[0]],
    registration: ApplicationRegistrationData[0],
    environments: [EnvironmentSummaryData[0]],
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'my-name',
    owner: 'them',
    repository: 'rep-osi/tory',
    creator: 'that guy',
    jobs: [JobSummaryData[0]],
    registration: ApplicationRegistrationData[0],
    environments: [EnvironmentSummaryData[0]],
    appAlias: {
      componentName: {
        a: 'test',
        b: ['t', 'e', 's', 't'],
      } as unknown as string,
      environmentName: 'envName',
      url: 'lru',
    },
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 'my-name',
    owner: 'them',
    repository: 321 as unknown as string,
    creator: 'that guy',
    jobs: [JobSummaryData[0]],
    registration: ApplicationRegistrationData[0],
    environments: [EnvironmentSummaryData[0]],
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
    owner: undefined,
    repository: undefined,
    creator: undefined,
    jobs: undefined,
    registration: undefined,
    environments: undefined,
  },
];
