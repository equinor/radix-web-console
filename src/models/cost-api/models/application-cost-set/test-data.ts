import { ApplicationCostSetModel } from '.';

import { testData as ApplicationCostData } from '../application-cost/test-data';
import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ApplicationCostSetModel> = [
  {
    __testDescription: 'Valid full object',
    from: new Date('2018-11-19T14:31:23Z'),
    to: new Date('2018-11-19T14:31:23Z'),
    applicationCosts: [ApplicationCostData[0]],
    totalRequestedCpu: 10,
    totalRequestedMemory: 11,
  },
  {
    __testDescription: 'Valid partial object',
    from: new Date('2018-11-19T14:31:23Z'),
    to: new Date('2018-11-19T14:31:23Z'),
    applicationCosts: [ApplicationCostData[0]],
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    from: new Date('2018-11-19T14:31:23Z'),
    to: new Date('2018-11-19T14:31:23Z'),
    applicationCosts: [ApplicationCostData[0]],
    totalRequestedCpu: 'twelve' as unknown as number,
    totalRequestedMemory: 11,
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    from: undefined,
    to: new Date('2018-11-19T14:31:23Z'),
    applicationCosts: [ApplicationCostData[0]],
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    from: undefined,
    to: undefined,
    applicationCosts: undefined,
  },
];
