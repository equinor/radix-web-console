import { ReceiverConfigSecretStatusModel } from '.';

import { SlackConfigSecretStatusModel } from '../slack-config-secret-status';
import { testData as SlackConfigSecretStatusData } from '../slack-config-secret-status/test-data';
import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ReceiverConfigSecretStatusModel> =
  [
    {
      __testDescription: 'Valid full object',
      slackConfig: SlackConfigSecretStatusData[0],
    },
    {
      __testDescription: 'Valid empty object',
    },
    {
      __testDescription: 'Invalid full object',
      __testIsInvalidSample: true,
      slackConfig: [
        SlackConfigSecretStatusData[0],
      ] as unknown as SlackConfigSecretStatusModel,
    },
  ];
