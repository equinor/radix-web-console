import { ApplicationCostSetModel } from '.';

import { testData as ApplicationCostData } from '../application-cost/test-data';
import { TestDependencyDataType } from '../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ApplicationCostSetModel> = [
  {
    __testDescription: 'Valid full object',
    applicationCosts: [ApplicationCostData[0]],
    from: '2018-11-19T14:31:23Z',
    to: '2018-11-19T14:31:23Z',
    totalRequestedCpu: 10,
    totalRequestedMemory: 11,
  },
  {
    __testDescription: 'Valid partial object',
    applicationCosts: [ApplicationCostData[0]],
    from: '2018-11-19T14:31:23Z',
    to: '2018-11-19T14:31:23Z',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    applicationCosts: [ApplicationCostData[0]],
    from: '2018-11-19T14:31:23Z',
    to: '2018-11-19T14:31:23Z',
    totalRequestedCpu: 'twelve' as unknown as number,
    totalRequestedMemory: 11,
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    applicationCosts: [ApplicationCostData[0]],
    from: undefined,
    to: '2018-11-19T14:31:23Z',
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    applicationCosts: undefined,
    from: undefined,
    to: undefined,
  },
];
