import { Fragment } from 'react';

import { Alerting, AlertingProps } from '.';

import { RequestState } from '../../state/state-utils/request-states';

const noopFunc = () => void 0;

const testData: Array<AlertingProps> = [
  {
    alertingConfig: { enabled: false, ready: false },
    isAlertingEditEnabled: false,
    isAlertingEditDirty: false,
    disableAlerting: noopFunc,
    editAlertingDisable: noopFunc,
    editAlertingEnable: noopFunc,
    editAlertingSetSlackUrl: noopFunc,
    enableAlerting: noopFunc,
    updateAlerting: noopFunc,
  },
  {
    alertingConfig: { enabled: true, ready: false },
    isAlertingEditEnabled: false,
    isAlertingEditDirty: false,
    disableAlerting: noopFunc,
    editAlertingDisable: noopFunc,
    editAlertingEnable: noopFunc,
    editAlertingSetSlackUrl: noopFunc,
    enableAlerting: noopFunc,
    updateAlerting: noopFunc,
  },
  {
    alertingConfig: {
      enabled: true,
      ready: true,
      receiverSecretStatus: {
        slack1: { slackConfig: { webhookUrlConfigured: false } },
      },
    },
    isAlertingEditEnabled: false,
    isAlertingEditDirty: false,
    disableAlerting: noopFunc,
    editAlertingDisable: noopFunc,
    editAlertingEnable: noopFunc,
    editAlertingSetSlackUrl: noopFunc,
    enableAlerting: noopFunc,
    updateAlerting: noopFunc,
  },
  {
    alertingConfig: {
      enabled: true,
      ready: true,
      receiverSecretStatus: {
        slack1: { slackConfig: { webhookUrlConfigured: true } },
      },
    },
    isAlertingEditEnabled: false,
    isAlertingEditDirty: false,
    disableAlerting: noopFunc,
    editAlertingDisable: noopFunc,
    editAlertingEnable: noopFunc,
    editAlertingSetSlackUrl: noopFunc,
    enableAlerting: noopFunc,
    updateAlerting: noopFunc,
  },
  {
    alertingConfig: { enabled: false, ready: false },
    isAlertingEditEnabled: false,
    isAlertingEditDirty: false,
    enableAlertingRequestState: RequestState.FAILURE,
    enableAlertingLastError: 'enable error',
    disableAlerting: noopFunc,
    editAlertingDisable: noopFunc,
    editAlertingEnable: noopFunc,
    editAlertingSetSlackUrl: noopFunc,
    enableAlerting: noopFunc,
    updateAlerting: noopFunc,
  },
  {
    alertingConfig: {
      enabled: true,
      ready: true,
      receiverSecretStatus: {
        slack1: { slackConfig: { webhookUrlConfigured: true } },
      },
    },
    isAlertingEditEnabled: false,
    isAlertingEditDirty: false,
    disableAlertingRequestState: RequestState.FAILURE,
    disableAlertingLastError: 'disable error',
    disableAlerting: noopFunc,
    editAlertingDisable: noopFunc,
    editAlertingEnable: noopFunc,
    editAlertingSetSlackUrl: noopFunc,
    enableAlerting: noopFunc,
    updateAlerting: noopFunc,
  },
];

export default (
  <div style={{ maxWidth: '1000px', margin: '20px' }}>
    {testData.map((props, i) => (
      <Fragment key={i}>
        <Alerting {...props} />
        <hr />
      </Fragment>
    ))}
  </div>
);
