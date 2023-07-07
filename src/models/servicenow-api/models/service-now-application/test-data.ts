import { ApplicationModel } from '.';

import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ApplicationModel> = [
  {
    __testDescription: 'Valid full object',
    id: 'anyid',
    number: '55',
    name: 'any name',
    description: 'any desc',
    productOwner: 'any owner',
    technicalContactPersons: 'any tech contacts',
  },
  {
    __testDescription: 'Valid partial object',
    id: 'anyid',
    name: 'any name',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    id: 'anyid',
    number: '55',
    name: 'any name',
    description: { time: new Date(), details: 'unknown' } as unknown as string,
    productOwner: 'any owner',
    technicalContactPersons: 'any tech contacts',
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    id: { guid: 250 } as unknown as string,
    name: 'any name',
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    id: undefined,
    name: undefined,
  },
];
