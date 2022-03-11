import { ApplicationSummaryModel } from '.';

import { testData as JobSummaryData } from '../job-summary/test-data';
import { TestDependencyDataType } from '../model-types';

export const testData: TestDependencyDataType<ApplicationSummaryModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'My app 1',
    latestJob: JobSummaryData[0],
  },
  {
    __testDescription: 'Valid partial object',
    name: 'My app 2',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'My app 1',
    latestJob: [JobSummaryData[0]] as any,
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: {} as any,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
  },
];
