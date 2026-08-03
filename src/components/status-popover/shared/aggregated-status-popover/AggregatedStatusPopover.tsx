import { Icon } from '@equinor/eds-core-react'
import type { ReactNode } from 'react'
import { StatusBadgeTemplate } from '../../../status-badges/status-badge-template'
import { StatusPopover } from '../../status-popover'
import { AlertLevelPresentationMap } from './aggregatedStatusPopover.const'
import type { StatusItem } from './aggregatedStatusPopover.types'
import { getMostSevereAlertLevel } from './aggregatedStatusPopover.utils'

interface AggregatedStatusPopoverProps {
  title: ReactNode
  items: StatusItem[]
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
  const aggregated = AlertLevelPresentationMap[mostSevereAlertLevel]

  return (
    <StatusPopover title={title} type={aggregated.type} icon={<Icon data={aggregated.icon} />}>
      <div className="grid grid--gap-small">
        {items.map((item) => (
          <StatusBadgeTemplate
            key={item.label}
            type={AlertLevelPresentationMap[item.alertLevel].type}
            icon={<Icon data={item.icon} />}
          >
            {item.label}
          </StatusBadgeTemplate>
        ))}
      </div>
    </StatusPopover>
  )
}
