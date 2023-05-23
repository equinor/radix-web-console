import { DeployKeyAndSecretModel } from '.';

import { TestDependencyDataType } from '../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<DeployKeyAndSecretModel> = [
  {
    __testDescription: 'Valid full object',
    publicDeployKey: 'publicDeployKey',
    sharedSecret: 'sharedSecret',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    publicDeployKey: true as unknown as string,
    sharedSecret: true as unknown as string,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    publicDeployKey: undefined,
    sharedSecret: undefined,
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    publicDeployKey: undefined,
    sharedSecret: true as unknown as string,
  },
];