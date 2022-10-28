import { ApplicationSummaryModel } from '.';

import { testData as ComponentData } from '../component/test-data';
import { JobSummaryModel } from '../job-summary';
import { testData as JobSummaryData } from '../job-summary/test-data';
import { TestDependencyDataType } from '../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ApplicationSummaryModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'My app 1',
    latestJob: JobSummaryData[0],
    environmentActiveComponents: { test: [ComponentData[0]] },
  },
  {
    __testDescription: 'Valid partial object',
    name: 'My app 2',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'My app 1',
    latestJob: [JobSummaryData[0]] as unknown as JobSummaryModel,
    environmentActiveComponents: { test: [ComponentData[0]] },
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: {} as unknown as string,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
  },
];
