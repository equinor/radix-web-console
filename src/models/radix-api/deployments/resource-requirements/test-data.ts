import { ResourceRequirementsModel } from '.';

import { ResourcesModel } from '../resources';
import { testData as ResourcesData } from '../resources/test-data';
import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ResourceRequirementsModel> = [
  {
    __testDescription: 'Valid full object',
    limits: ResourcesData[0],
    requests: ResourcesData[0],
  },
  {
    __testDescription: 'Valid empty object',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    limits: ResourcesData[0],
    requests: { cpu: new Date() } as unknown as ResourcesModel,
  },
];
