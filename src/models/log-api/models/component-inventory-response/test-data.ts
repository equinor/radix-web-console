import { ComponentInventoryResponseModel } from '.';

import { ReplicaModel } from '../replica';
import { testData as ReplicaData } from '../replica/test-data';
import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ComponentInventoryResponseModel> =
  [
    {
      __testDescription: 'Valid full object',
      replicas: [ReplicaData[0]],
    },
    {
      __testDescription: 'Invalid full object',
      __testIsInvalidSample: true,
      replicas: {} as unknown as Array<ReplicaModel>,
    },
    {
      __testDescription: 'Invalid empty object',
      __testIsInvalidSample: true,
      replicas: undefined,
    },
  ];
