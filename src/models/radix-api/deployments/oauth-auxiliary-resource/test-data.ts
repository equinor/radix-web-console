import { OAuthAuxiliaryResourceModel } from '.';

import { AuxiliaryResourceDeploymentModel } from '../auxiliary-resource-deployment';
import { testData as AuxiliaryResourceDeploymentData } from '../auxiliary-resource-deployment/test-data';
import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<OAuthAuxiliaryResourceModel> = [
  {
    __testDescription: 'Valid full object',
    deployment: AuxiliaryResourceDeploymentData[0],
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    deployment: [
      AuxiliaryResourceDeploymentData[0],
    ] as unknown as AuxiliaryResourceDeploymentModel,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    deployment: undefined,
  },
];
