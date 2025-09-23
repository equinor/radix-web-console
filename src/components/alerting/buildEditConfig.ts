import { cloneDeep } from 'lodash-es'
import type {
  AlertingConfig,
  ReceiverConfigMap,
  UpdateAlertingConfig,
  UpdateReceiverConfigSecretsMap,
} from '../../store/radix-api'

const buildReceiverSecrets = (receviers: ReceiverConfigMap) => {
  const secretsConfig: UpdateReceiverConfigSecretsMap = {}
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

export const buildEditConfig = (config: AlertingConfig): UpdateAlertingConfig => {
  return {
    alerts: config.alerts ? cloneDeep(config.alerts) : [],
    receivers: config.receivers ? cloneDeep(config.receivers) : {},
    receiverSecrets: config.receivers ? buildReceiverSecrets(config.receivers) : {},
  }
}
