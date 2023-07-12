import { AlertingConfigModel } from '.';

import { testData as AlertConfigData } from '../alert-config/test-data';
import { testData as ReceiverConfigData } from '../receiver-config/test-data';
import { testData as ReceiverConfigSecretStatusData } from '../receiver-config-secret-status/test-data';
import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<AlertingConfigModel> = [
  {
    __testDescription: 'Valid full object',
    enabled: true,
    ready: false,
    receivers: { b: ReceiverConfigData[0] },
    receiverSecretStatus: { a: ReceiverConfigSecretStatusData[0] },
    alerts: [AlertConfigData[0]],
    alertNames: ['name1', 'name2'],
  },
  {
    __testDescription: 'Valid partial object',
    enabled: true,
    ready: false,
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    enabled: true,
    ready: false,
    receivers: { b: ReceiverConfigData[0] },
    receiverSecretStatus: { a: ReceiverConfigSecretStatusData[0] },
    alerts: [AlertConfigData[0]],
    alertNames: 'name1' as unknown as Array<string>,
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    enabled: {} as unknown as boolean,
    ready: true,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    enabled: undefined,
    ready: undefined,
  },
];
