import { upperFirst } from 'lodash-es'
import { memo } from 'react'
import { AggregatedStatusPopover } from '../../../../aggregated-status-popover/AggregatedStatusPopover'
import type { StatusItem } from '../../../../aggregated-status-popover/aggregatedStatusPopover.types'
import type { EnvironmentStatusElements } from './environmentCardEnvironmentStatus.types'

interface EnvironmentCardEnvironmentStatusProps {
  statusElements: EnvironmentStatusElements
}

export const EnvironmentCardEnvironmentStatusComponent = (props: EnvironmentCardEnvironmentStatusProps) => {
  const items: StatusItem[] = Object.entries(props.statusElements).map(([key, status]) => ({
    label: upperFirst(key),
    status,
  }))

  return <AggregatedStatusPopover title="Environment Status" items={items} />
}

export const EnvironmentCardEnvironmentStatus = memo(EnvironmentCardEnvironmentStatusComponent)
