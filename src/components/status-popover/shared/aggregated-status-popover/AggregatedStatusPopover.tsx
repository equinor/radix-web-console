import type { ReactNode } from 'react'
import { StatusBadgeTemplate } from '../../../status-badges/status-badge-template'
import { StatusPopover } from '../../status-popover'
import { AGGREGATED_STATUS_MAP } from './aggregatedStatusPopover.const'
import type { StatusItem } from './aggregatedStatusPopover.types'
import { getMostSevereAlertLevel } from './aggregatedStatusPopover.utils'

interface AggregatedStatusPopoverProps {
  readonly title: ReactNode
  readonly items: ReadonlyArray<StatusItem>
}

/**
 * Goes through the list of items and finds the most severe status,
 * then renders a popover with the aggregated status and a list of all items.
 * If the list of items is empty, returns null.
 */
export const AggregatedStatusPopover = (props: AggregatedStatusPopoverProps) => {
  const { title, items } = props

  if (items.length === 0) {
    return null
  }

  const mostSevereAlertLevel = getMostSevereAlertLevel(items.map((item) => item.alertLevel))
  const aggregatedStatus = AGGREGATED_STATUS_MAP[mostSevereAlertLevel]

  return (
    <StatusPopover title={title} type={aggregatedStatus.type} icon={aggregatedStatus.icon}>
      <div className="grid grid--gap-small">
        {items.map((item) => (
          <StatusBadgeTemplate key={item.label} type={AGGREGATED_STATUS_MAP[item.alertLevel].type} icon={item.icon}>
            {item.label}
          </StatusBadgeTemplate>
        ))}
      </div>
    </StatusPopover>
  )
}
