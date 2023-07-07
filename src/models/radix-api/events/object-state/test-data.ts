import { ObjectStateModel } from '.';

import { TestDependencyDataType } from '../../../model-types';
import { PodStateModel } from '../pod-state';
import { testData as PodStateData } from '../pod-state/test-data';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ObjectStateModel> = [
  {
    __testDescription: 'Valid full object',
    pod: PodStateData[0],
  },
  {
    __testDescription: 'Valid empty object',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    pod: [PodStateData[0]] as unknown as PodStateModel,
  },
];
