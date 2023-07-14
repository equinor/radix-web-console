/*
 * TestData array
 *
 * Note: First object should always be valid
 */
import { TestDependencyDataType } from '../../../model-types';
import { DeploymentItemModel } from '.';

export const testData: TestDependencyDataType<DeploymentItemModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'name',
    activeFrom: new Date(),
    activeTo: new Date(),
    gitCommitHash: 'gitCommitHash',
  },
  {
    __testDescription: 'Valid partial object',
    name: 'name',
    activeFrom: new Date(),
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'name',
    activeFrom: new Date(),
    activeTo: new Date(),
    gitCommitHash: 'gitCommitHash',
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 1972 as unknown as string,
    activeFrom: new Date(),
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
    activeFrom: undefined,
  },
];
