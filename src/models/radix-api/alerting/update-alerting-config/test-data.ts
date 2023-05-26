import { UpdateAlertingConfigModel } from '.';

import { AlertConfigModel } from '../alert-config';
import { testData as AlertConfigData } from '../alert-config/test-data';
import { testData as ReceiverConfigData } from '../receiver-config/test-data';
import { testData as UpdateReceiverConfigSecretsData } from '../update-receiver-config-secrets/test-data';
import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<UpdateAlertingConfigModel> = [
  {
    __testDescription: 'Valid full object',
    receiverSecrets: { a: UpdateReceiverConfigSecretsData[0] },
    receivers: { b: ReceiverConfigData[0] },
    alerts: [AlertConfigData[0]],
  },
  {
    __testDescription: 'Valid partial object',
    alerts: [AlertConfigData[0]],
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    receiverSecrets: { a: UpdateReceiverConfigSecretsData[0] },
    receivers: { b: ReceiverConfigData[4] },
    alerts: AlertConfigData[0] as unknown as Array<AlertConfigModel>,
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    alerts: AlertConfigData[0] as unknown as Array<AlertConfigModel>,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    alerts: undefined,
  },
];
