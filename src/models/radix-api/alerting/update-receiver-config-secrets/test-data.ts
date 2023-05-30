import { UpdateReceiverConfigSecretsModel } from '.';

import { testData as UpdateSlackConfigSecretsData } from '../update-slack-config-secrets/test-data';
import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<UpdateReceiverConfigSecretsModel> =
  [
    {
      __testDescription: 'Valid full object',
      slackConfig: UpdateSlackConfigSecretsData[0],
    },
    {
      __testDescription: 'Valid empty object',
    },
    {
      __testDescription: 'Invalid full object',
      __testIsInvalidSample: true,
      slackConfig: { webhookUrl: [] as unknown as string },
    },
  ];
