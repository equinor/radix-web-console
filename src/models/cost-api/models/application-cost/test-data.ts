import { ApplicationCostModel } from '.';

import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ApplicationCostModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'a-name',
    owner: 'a-user@equinor.com',
    creator: 'servant',
    wbs: 'wbs',
    costPercentageByCpu: 15,
    costPercentageByMemory: 85,
    comment: 'a comment',
    cost: 100,
    currency: 'usd',
  },
  {
    __testDescription: 'Valid partial object',
    name: 'name',
    owner: 'a-user@equinor.com',
    creator: 'master',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'a-name',
    owner: 'a-user@equinor.com',
    creator: 'servant',
    wbs: 'wbs',
    costPercentageByCpu: 15,
    costPercentageByMemory: 85,
    comment: 'a comment',
    cost: 'a slice of pizza' as unknown as number,
    currency: 'usd',
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 'a-name',
    owner: 2022 as unknown as string,
    creator: 'servant',
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
    owner: undefined,
    creator: undefined,
  },
];
