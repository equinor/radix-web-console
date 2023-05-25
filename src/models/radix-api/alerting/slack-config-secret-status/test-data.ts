import { SlackConfigSecretStatusModel } from '.';

import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<SlackConfigSecretStatusModel> = [
  {
    __testDescription: 'Valid full object',
    webhookUrlConfigured: true,
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    webhookUrlConfigured: {} as unknown as boolean,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    webhookUrlConfigured: undefined,
  },
];
