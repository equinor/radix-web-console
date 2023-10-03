import { Fragment } from 'react';

import { Alerting } from '.';

import { RequestState } from '../../state/state-utils/request-states';

const noopFunc = () => void 0;

const testData = [
  {
    alertingConfig: {
      enabled: false,
      ready: false,
    },
    isAlertingEditEnabled: false,
    isAlertingEditDirty: false,
  },
  {
    alertingConfig: {
      enabled: true,
      ready: false,
    },
    isAlertingEditEnabled: false,
    isAlertingEditDirty: false,
  },
  {
    alertingConfig: {
      enabled: true,
      ready: true,
      receiverSecretStatus: {
        slack1: {
          slackConfig: {
            webhookUrlConfigured: false,
          },
        },
      },
    },
    isAlertingEditEnabled: false,
    isAlertingEditDirty: false,
  },
  {
    alertingConfig: {
      enabled: true,
      ready: true,
      receiverSecretStatus: {
        slack1: {
          slackConfig: {
            webhookUrlConfigured: true,
          },
        },
      },
    },
    isAlertingEditEnabled: false,
    isAlertingEditDirty: false,
  },
  {
    alertingConfig: {
      enabled: false,
      ready: false,
    },
    isAlertingEditEnabled: false,
    isAlertingEditDirty: false,
    enableAlertingRequestState: RequestState.FAILURE,
    enableAlertingLastError: 'enable error',
  },
  {
    alertingConfig: {
      enabled: true,
      ready: true,
      receiverSecretStatus: {
        slack1: {
          slackConfig: {
            webhookUrlConfigured: true,
          },
        },
      },
    },
    isAlertingEditEnabled: false,
    isAlertingEditDirty: false,
    disableAlertingRequestState: RequestState.FAILURE,
    disableAlertingLastError: 'disable error',
  },
];

export default (
  <div style={{ maxWidth: '1000px', margin: '20px' }}>
    {testData.map((d, i) => (
      <Fragment key={i}>
        <Alerting
          alertingConfig={d.alertingConfig}
          isAlertingEditEnabled={d.isAlertingEditEnabled}
          isAlertingEditDirty={d.isAlertingEditDirty}
          enableAlertingRequestState={d.enableAlertingRequestState}
          enableAlertingLastError={d.enableAlertingLastError}
          disableAlertingRequestState={d.disableAlertingRequestState}
          disableAlertingLastError={d.disableAlertingLastError}
          editAlertingEnable={noopFunc}
          editAlertingDisable={noopFunc}
          enableAlerting={noopFunc}
          disableAlerting={noopFunc}
          updateAlerting={noopFunc}
          editAlertingSetSlackUrl={noopFunc}
        />
        <hr />
      </Fragment>
    ))}
  </div>
);
