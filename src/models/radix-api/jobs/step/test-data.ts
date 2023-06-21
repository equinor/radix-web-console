import { StepModel } from '.';

import { RadixJobCondition } from '../radix-job-condition';
import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<StepModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'A step',
    status: RadixJobCondition.Succeeded,
    started: new Date('2018-11-19T14:31:23Z'),
    ended: new Date('2018-11-19T14:34:23Z'),
    podName: 'podname',
    components: ['a', 'b'],
  },
  {
    __testDescription: 'Valid partial object',
    name: 'B step',
    status: RadixJobCondition.Queued,
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'C step',
    status: RadixJobCondition.Succeeded,
    started: new Date('2018-11-19T14:31:23Z'),
    ended: new Date('2018-11-19T14:34:23Z'),
    podName: 'podname',
    components: 'a, b, c, d' as unknown as Array<string>,
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 'D step',
    status: '' as unknown as RadixJobCondition,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
    status: undefined,
  },
];