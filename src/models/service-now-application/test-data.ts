import { ServiceNowApplicationModel } from '.';

import { TestDependencyDataType } from '../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ServiceNowApplicationModel> = [
  {
    __testDescription: 'Valid full object',
    id: 'anyid',
    name: 'any name',
    description: 'any desc',
    number: 'any number',
    productOwner: 'any owner',
    technicalContactPersons: 'any tech contacts',
  },
  {
    __testDescription: 'Valid minimal object',
    id: 'anyid',
    name: 'any name',
  },
  {
    __testDescription: 'Missing required property `id`',
    __testIsInvalidSample: true,
    id: undefined,
    name: 'any name',
  },
  {
    __testDescription: 'Missing required property `name`',
    __testIsInvalidSample: true,
    id: 'any id',
    name: undefined,
  },
];
