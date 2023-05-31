import { DeploymentSummaryModel } from '.';

import { testData as ComponentSummaryData } from '../component-summary/test-data';
import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<DeploymentSummaryModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'name',
    components: [ComponentSummaryData[0]],
    environment: 'qa',
    activeFrom: new Date(),
    activeTo: new Date(),
    gitCommitHash: 'gitCommitHash',
    gitTags: 'gitTags',
    createdByJob: 'created-by-me',
    pipelineJobType: 'job',
    promotedFromEnvironment: 'dev',
    commitID: 'commitID',
  },
  {
    __testDescription: 'Valid partial object',
    name: 'name',
    environment: 'qa',
    activeFrom: new Date(),
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'name',
    components: [ComponentSummaryData[0]],
    environment: 'qa',
    activeFrom: new Date(),
    activeTo: new Date(),
    gitCommitHash: 'gitCommitHash',
    gitTags: 'gitTags',
    createdByJob: 'created-by-me',
    pipelineJobType: 'job',
    promotedFromEnvironment: 1996 as unknown as string,
    commitID: 'commitID',
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 1972 as unknown as string,
    environment: 'qa',
    activeFrom: new Date(),
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
    environment: undefined,
    activeFrom: undefined,
  },
];
