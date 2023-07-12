import { ReceiverConfigModel } from '.';

import { SlackConfigModel } from '../slack-config';
import { testData as SlackConfigData } from '../slack-config/test-data';
import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ReceiverConfigModel> = [
  {
    __testDescription: 'Valid full object',
    slackConfig: SlackConfigData[0],
  },
  {
    __testDescription: 'Valid empty object',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    slackConfig: [SlackConfigData[0]] as unknown as SlackConfigModel,
  },
];
