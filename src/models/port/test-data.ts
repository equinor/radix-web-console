import { PortModel } from '.';

import { TestDependencyDataType } from '../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<PortModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'name',
    port: 443,
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'name',
    port: '808O' as unknown as number,
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 'name',
    port: undefined,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
    port: undefined,
  },
];
