import { Icon } from '@equinor/eds-core-react'
import { upperFirst } from 'lodash-es'
import type { EnvironmentStatusElement } from '../../../environment-card/components/EnvironmentCardStatuses'
import { StatusBadgeTemplate } from '../../../status-badges/status-badge-template'
import { StatusPopover } from '../../../status-popover/status-popover'
import {
  getIconForEnvironmentStatus,
  getMostSevereStatus,
  getTypeForEnvironmentStatus,
} from './environmentCardEnvironmentStatus.utils'

interface EnvironmentCardEnvironmentStatusProps {
  statusElements: EnvironmentStatusElement
}

export const EnvironmentCardEnvironmentStatus = ({ statusElements }: EnvironmentCardEnvironmentStatusProps) => {
  const entries = Object.entries(statusElements)

  if (entries.length === 0) {
    return null
  }

  const aggregatedStatus = getMostSevereStatus(entries.map(([, status]) => status))
  const icon = getIconForEnvironmentStatus(aggregatedStatus)
  const type = getTypeForEnvironmentStatus(aggregatedStatus)

  return (
    <StatusPopover title="Environment Status" type={type} icon={<Icon data={icon} />}>
      <div className="grid grid--gap-small">
        {entries.map(([key, status]) => (
          <StatusBadgeTemplate
            key={key}
            type={getTypeForEnvironmentStatus(status)}
            icon={<Icon data={getIconForEnvironmentStatus(status)} />}
          >
            {upperFirst(key)}
          </StatusBadgeTemplate>
        ))}
      </div>
    </StatusPopover>
  )
}
