import { AlertingConfigModel, UpdateAlertingConfigModel } from '.';

import { TestDependencyDataType } from '../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const alertingTestData: TestDependencyDataType<AlertingConfigModel> = [
  {
    __testDescription: 'Valid full object',
    enabled: true,
    ready: true,
    alertNames: ['a1', 'a2'],
    alerts: [{ alert: 'a1', receiver: 'receiver' }],
    receivers: { receiver: { slackConfig: { enabled: false } } },
    receiverSecretStatus: {
      receiver: { slackConfig: { webhookUrlConfigured: false } },
    },
  },
  {
    __testDescription: 'Valid partial object',
    enabled: true,
    ready: true,
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    enabled: true,
    ready: true,
    alertNames: ['a1', 'a2'],
    alerts: [{ alert: 'a1', receiver: 'receiver' }],
    receivers: [
      { receiver: { slackConfig: { enabled: false } } },
    ] as unknown as Record<string, unknown>,
    receiverSecretStatus: {
      receiver: { slackConfig: { webhookUrlConfigured: false } },
    },
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    enabled: 'frue' as unknown as boolean,
    ready: true,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    enabled: undefined,
    ready: undefined,
  },
];

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const updateAlertingTestData: TestDependencyDataType<UpdateAlertingConfigModel> =
  [
    {
      __testDescription: 'Valid full object',
      alerts: [{ alert: 'a1', receiver: 'receiver' }],
      receivers: { receiver: { slackConfig: { enabled: false } } },
      receiverSecrets: { secrets: { slackConfig: { webhookUrl: 'url' } } },
    },
    {
      __testDescription: 'Valid partial object',
      alerts: [{ alert: 'a1', receiver: 'receiver' }],
    },
    {
      __testDescription: 'Invalid full object',
      __testIsInvalidSample: true,
      alerts: [{ alert: 'a1', receiver: 'receiver' }],
      receivers: [
        { receiver: { slackConfig: { enabled: false } } },
      ] as unknown as Record<string, unknown>,
      receiverSecrets: { secrets: { slackConfig: { webhookUrl: 'url' } } },
    },
    {
      __testDescription: 'Invalid partial object',
      __testIsInvalidSample: true,
      alerts: { 1: 'test', 2: 'best' } as unknown as Array<{ alert: string }>,
    },
    {
      __testDescription: 'Invalid empty object',
      __testIsInvalidSample: true,
      alerts: undefined,
    },
  ];
