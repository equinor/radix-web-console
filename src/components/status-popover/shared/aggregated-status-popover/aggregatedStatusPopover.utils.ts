import type { AlertLevel } from '../../../environment-card/components/environment-card-statuses/environment-card-environment-status/wip/domain/statusMeta.types'
import { AlertLevelWeightMap } from './aggregatedStatusPopover.const'

/** Returns the alert level with the highest severity weight, defaulting to 'Good'. */
export const getMostSevereAlertLevel = (alertLevels: AlertLevel[]): AlertLevel => {
  return alertLevels.reduce(
    (mostSevere, alertLevel) =>
      AlertLevelWeightMap[alertLevel] > AlertLevelWeightMap[mostSevere] ? alertLevel : mostSevere,
    'None'
  )
}
