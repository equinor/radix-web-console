import { Icon, Typography } from '@equinor/eds-core-react'
import { check_circle_outlined, warning_outlined } from '@equinor/eds-icons'
import { Fragment, type FunctionComponent } from 'react'
import type { AlertingConfig } from '../../store/radix-api'

export const AlertingConfigStatus: FunctionComponent<{
  config: AlertingConfig
}> = ({ config }) => {
  if (!config.enabled || !config.ready) {
    return null
  }

  return (
    <>
      {Object.entries(config.receiverSecretStatus ?? {}).map(([key, value]) => (
        <Fragment key={key}>
          {value.slackConfig?.webhookUrlConfigured ? (
            <div className="alerting-status alerting-status--success">
              <Icon data={check_circle_outlined} />
              <Typography>Slack webhook URL is configured.</Typography>
            </div>
          ) : (
            <div className="alerting-status alerting-status--warning">
              <Icon data={warning_outlined} />
              <Typography>
                Missing required Slack webhook URL. Radix cannot send alerts until the webhook is configured.
              </Typography>
            </div>
          )}
        </Fragment>
      ))}
    </>
  )
}
