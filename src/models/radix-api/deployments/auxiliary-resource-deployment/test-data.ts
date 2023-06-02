import { AuxiliaryResourceDeploymentModel } from '.';

import { ComponentStatus } from '../component-status';
import { ReplicaSummaryNormalizedModel } from '../replica-summary';
import { testData as ReplicaSummaryData } from '../replica-summary/test-data';
import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<AuxiliaryResourceDeploymentModel> =
  [
    {
      __testDescription: 'Valid full object',
      status: ComponentStatus.ConsistentComponent,
      replicaList: [
        ReplicaSummaryData[0] as unknown as ReplicaSummaryNormalizedModel,
      ],
    },
    {
      __testDescription: 'Valid partial object',
      status: ComponentStatus.ComponentRestarting,
      replicaList: undefined,
    },
    {
      __testDescription: 'Invalid full object',
      __testIsInvalidSample: true,
      status: 123 as unknown as ComponentStatus,
      replicaList:
        ReplicaSummaryData[0] as unknown as Array<ReplicaSummaryNormalizedModel>,
    },
    {
      __testDescription: 'Invalid partial object',
      __testIsInvalidSample: true,
      status: 123 as unknown as ComponentStatus,
    },
    {
      __testDescription: 'Invalid empty object',
      __testIsInvalidSample: true,
      status: undefined,
    },
  ];
