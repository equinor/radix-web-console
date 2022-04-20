import { PodStateModel } from '.';

import { TestDependencyDataType } from '../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<PodStateModel> = [
  {
    __testDescription: 'Valid full object',
    ready: true,
    started: true,
    restartCount: 0,
  },
  {
    __testDescription: 'Valid partial object',
    ready: false,
    restartCount: 0,
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    ready: 'true' as unknown as boolean,
    started: true,
    restartCount: 0,
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    ready: false,
    started: true,
    restartCount: {} as unknown as number,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    ready: undefined,
    restartCount: undefined,
  },
];
