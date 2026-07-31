import { Icon } from '@equinor/eds-core-react'
import type { ReactNode } from 'react'
import {
  getIconForEnvironmentStatus,
  getMostSevereStatus,
  getTypeForEnvironmentStatus,
} from '../environment-card/common/utils'
import { StatusBadgeTemplate } from '../status-badges/status-badge-template'
import { StatusPopover } from '../status-popover/status-popover'
import type { StatusItem } from './aggregatedStatusPopover.types'

interface AggregatedStatusPopoverProps {
  title: ReactNode
  items: StatusItem[]
}

export const AggregatedStatusPopover = (props: AggregatedStatusPopoverProps) => {
  const { title, items } = props

  if (items.length === 0) {
    return null
  }

  const aggregatedStatus = getMostSevereStatus(items.map((item) => item.status))

  return (
    <StatusPopover
      title={title}
      type={getTypeForEnvironmentStatus(aggregatedStatus)}
      icon={<Icon data={getIconForEnvironmentStatus(aggregatedStatus)} />}
    >
      <div className="grid grid--gap-small">
        {items.map((item) => (
          <StatusBadgeTemplate
            key={item.label}
            type={getTypeForEnvironmentStatus(item.status)}
            icon={<Icon data={getIconForEnvironmentStatus(item.status)} />}
          >
            {item.label}
          </StatusBadgeTemplate>
        ))}
      </div>
    </StatusPopover>
  )
}
