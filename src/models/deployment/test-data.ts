import { DeploymentModel } from '.';

import { testData as ComponentData } from '../component/test-data';
import { TestDependencyDataType } from '../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<DeploymentModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'name',
    createdByJob: 'Roar',
    environment: 'dev',
    activeFrom: new Date(),
    activeTo: new Date(),
    gitCommitHash: '438geryhgofiahwur4f79ew4yh',
    gitTags: 'tag1 tag2 some,tag',
    repository: 'https://github.com/equinor/radix-canary-golang',
    components: [ComponentData[0]],
  },
  {
    __testDescription: 'Valid partial object',
    name: 'name',
    createdByJob: 'Roar',
    environment: 'dev',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'name',
    createdByJob: 9655249 as unknown as string,
    environment: 'dev',
    activeFrom: new Date(),
    activeTo: new Date(),
    gitCommitHash: '438geryhgofiahwur4f79ew4yh',
    gitTags: 'tag1 tag2 some,tag',
    repository: 'https://github.com/equinor/radix-canary-golang',
    components: [ComponentData[0]],
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 'name',
    createdByJob: 'Roar',
    environment: ['dev', 'master'] as unknown as string,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
    createdByJob: undefined,
    environment: undefined,
  },
];
