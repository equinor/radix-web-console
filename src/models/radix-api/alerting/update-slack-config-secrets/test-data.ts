import { UpdateSlackConfigSecretsModel } from '.';

import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<UpdateSlackConfigSecretsModel> = [
  {
    __testDescription: 'Valid full object',
    webhookUrl: 'webhookUrl',
  },
  {
    __testDescription: 'Valid empty object',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    webhookUrl: ['webhookUrl'] as unknown as string,
  },
];
