import { DeploymentSummaryModel } from '.';

import { TestDependencyDataType } from '../model-types';

export const testData: TestDependencyDataType<DeploymentSummaryModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'name',
    environment: 'qa',
    activeFrom: new Date(),
    activeTo: new Date(),
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
    environment: 'qa',
    activeFrom: new Date(),
    activeTo: new Date(),
    createdByJob: 'created-by-me',
    pipelineJobType: 'job',
    promotedFromEnvironment: 1996 as any,
    commitID: 'commitID',
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 1972 as any,
    environment: undefined,
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
