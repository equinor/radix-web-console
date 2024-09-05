import { cloneDeep } from 'lodash'
import type {
  AlertingConfig,
  ReceiverConfigMap,
  UpdateAlertingConfig,
} from '../../store/radix-api'

const buildReceiverSecrets = (receviers: ReceiverConfigMap) => {
  const secretsConfig = {}
  if (!receviers) {
    return secretsConfig
  }

  for (const [receiverName, receiver] of Object.entries(receviers)) {
    secretsConfig[receiverName] = {}
    if (receiver.slackConfig) {
      secretsConfig[receiverName].slackConfig = { webhookUrl: undefined }
    }
  }

  return secretsConfig
}

export const buildEditConfig = (
  config: AlertingConfig
): UpdateAlertingConfig => {
  return {
    alerts: cloneDeep(config.alerts),
    receivers: cloneDeep(config.receivers),
    receiverSecrets: buildReceiverSecrets(config.receivers),
  }
}
