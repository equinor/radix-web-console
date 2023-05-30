import { HorizontalScalingSummaryModel } from '.';

import { TestDependencyDataType } from '../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<HorizontalScalingSummaryModel> = [
  {
    __testDescription: 'Valid full object',
    maxReplicas: 2,
    minReplicas: 3,
    currentCPUUtilizationPercentage: 47,
    targetCPUUtilizationPercentage: 32,
    currentMemoryUtilizationPercentage: 17,
    targetMemoryUtilizationPercentage: 33,
  },
  {
    __testDescription: 'Valid partial object',
    maxReplicas: 2,
    minReplicas: 3,
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    maxReplicas: 2,
    minReplicas: 'o' as unknown as number,
    currentCPUUtilizationPercentage: 47,
    targetCPUUtilizationPercentage: 32,
    currentMemoryUtilizationPercentage: 17,
    targetMemoryUtilizationPercentage: 33,
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    maxReplicas: 2,
    minReplicas: undefined,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    maxReplicas: undefined,
    minReplicas: undefined,
    currentCPUUtilizationPercentage: undefined,
    targetCPUUtilizationPercentage: undefined,
    currentMemoryUtilizationPercentage: undefined,
    targetMemoryUtilizationPercentage: undefined,
  },
];
