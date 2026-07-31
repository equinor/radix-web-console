import { CircularProgress, Icon } from '@equinor/eds-core-react'
import { check, error_outlined, run, stop, warning_outlined } from '@equinor/eds-icons'
import { upperFirst } from 'lodash-es'
import type React from 'react'
import { StatusBadgeTemplate } from '../status-badges/status-badge-template'
import { StatusPopover } from '../status-popover/status-popover'
import { EnvironmentStatus, getEnvironmentStatusType } from './environment-status-utils'
import './style.css'

export type EnvironmentCardStatusMap = Record<string, EnvironmentStatus>

const StatusIconMap: Record<EnvironmentStatus, React.JSX.Element> = {
  [EnvironmentStatus.Consistent]: <Icon data={check} />,
  [EnvironmentStatus.Running]: <Icon data={run} />,
  [EnvironmentStatus.Starting]: <CircularProgress />,
  [EnvironmentStatus.Stopped]: <Icon data={stop} />,
  [EnvironmentStatus.Warning]: <Icon data={warning_outlined} />,
  [EnvironmentStatus.Danger]: <Icon data={error_outlined} />,
}

const EnvironmentStatusIcon = ({ status }: { status: EnvironmentStatus }) => {
  switch (status) {
    case EnvironmentStatus.Warning:
      return <Icon className="env_card-indicator--warning" data={warning_outlined} size={18} />
    case EnvironmentStatus.Danger:
      return <Icon data={error_outlined} />
    default:
      return <Icon data={check} />
  }
}

export interface EnvironmentCardStatusProps {
  title?: string
  statusElements: EnvironmentCardStatusMap
}

export const EnvironmentCardStatus = ({ title, statusElements }: EnvironmentCardStatusProps) => {
  const keys = Object.keys(statusElements ?? {})
  const aggregatedStatus: EnvironmentStatus = keys.reduce(
    (obj, key) => Math.max(obj, statusElements[key] ?? EnvironmentStatus.Consistent),
    EnvironmentStatus.Consistent
  )

  return (
    <StatusPopover
      title={title}
      type={getEnvironmentStatusType(aggregatedStatus)}
      icon={<EnvironmentStatusIcon status={aggregatedStatus} />}
    >
      <div className="grid grid--gap-small">
        {keys.map((key) => (
          <StatusBadgeTemplate
            key={key}
            type={getEnvironmentStatusType(statusElements[key])}
            icon={StatusIconMap[statusElements[key]]}
          >
            {upperFirst(key)}
          </StatusBadgeTemplate>
        ))}
      </div>
    </StatusPopover>
  )
}
