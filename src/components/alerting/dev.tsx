import { type ComponentProps, Fragment } from 'react'

import { Alerting } from '.'

const noopFunc = async () => {}
type AlertingProps = ComponentProps<typeof Alerting>
const testData: Array<AlertingProps> = [
  {
    isSaving: false,
    alertingConfig: { enabled: false, ready: false },
    disableAlerting: noopFunc,
    enableAlerting: noopFunc,
    updateAlerting: noopFunc,
  },
  {
    isSaving: false,
    alertingConfig: { enabled: true, ready: false },
    disableAlerting: noopFunc,
    enableAlerting: noopFunc,
    updateAlerting: noopFunc,
  },
  {
    isSaving: false,
    alertingConfig: {
      enabled: true,
      ready: true,
      receiverSecretStatus: {
        slack1: { slackConfig: { webhookUrlConfigured: false } },
      },
    },
    disableAlerting: noopFunc,
    enableAlerting: noopFunc,
    updateAlerting: noopFunc,
  },
  {
    isSaving: false,
    alertingConfig: {
      enabled: true,
      ready: true,
      receiverSecretStatus: {
        slack1: { slackConfig: { webhookUrlConfigured: true } },
      },
    },
    disableAlerting: noopFunc,
    enableAlerting: noopFunc,
    updateAlerting: noopFunc,
  },
  {
    isSaving: false,
    alertingConfig: { enabled: false, ready: false },
    disableAlerting: noopFunc,
    enableAlerting: noopFunc,
    updateAlerting: noopFunc,
  },
  {
    isSaving: false,
    alertingConfig: {
      enabled: true,
      ready: true,
      receiverSecretStatus: {
        slack1: { slackConfig: { webhookUrlConfigured: true } },
      },
    },
    disableAlerting: noopFunc,
    enableAlerting: noopFunc,
    updateAlerting: noopFunc,
  },
]

export default (
  <div style={{ maxWidth: '1000px', margin: '20px' }}>
    {testData.map((props, i) => (
      <Fragment key={i}>
        <Alerting {...props} />
        <hr />
      </Fragment>
    ))}
  </div>
)
