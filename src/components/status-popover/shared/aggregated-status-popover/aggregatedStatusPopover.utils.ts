import { ALERT_LEVEL_SEVERITY_MAP } from '../../../../domain/status-meta/statusMeta.const'
import type { AlertLevel } from '../../../../domain/status-meta/statusMeta.types'

/** Returns the alert level with the highest severity, defaulting to 'None'. */
export const getMostSevereAlertLevel = (alertLevels: AlertLevel[]): AlertLevel => {
  return alertLevels.reduce(
    (mostSevere, alertLevel) =>
      ALERT_LEVEL_SEVERITY_MAP[alertLevel] > ALERT_LEVEL_SEVERITY_MAP[mostSevere] ? alertLevel : mostSevere,
    'None'
  )
}
