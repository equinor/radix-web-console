import { autorenew, check, error_outlined, type IconData, stop, warning_outlined } from '@equinor/eds-icons'
import { EnvironmentStatus as EnvironmentStatusEnum } from '../../../environments-summary/environment-status-utils'
import type { StatusPopoverType } from '../../../status-popover/status-popover'

export type EnvironmentStatus = 'Consistent' | 'Running' | 'Starting' | 'Stopped' | 'Warning' | 'Danger'

const StatusMap: Record<
  EnvironmentStatus,
  {
    icon: IconData
    type: StatusPopoverType
    rank: number
  }
> = {
  Consistent: { icon: check, type: 'default', rank: 0 },
  Running: { icon: check, type: 'default', rank: 1 },
  Starting: { icon: autorenew, type: 'default', rank: 2 },
  Stopped: { icon: stop, type: 'default', rank: 3 },
  Warning: { icon: warning_outlined, type: 'warning', rank: 4 },
  Danger: { icon: error_outlined, type: 'danger', rank: 5 },
}

export const getMostSevereStatus = (statuses: EnvironmentStatus[]): EnvironmentStatus =>
  statuses.reduce(
    (mostSevere, status) => (StatusMap[status].rank > StatusMap[mostSevere].rank ? status : mostSevere),
    'Consistent'
  )

export const toEnvironmentStatus = (status: EnvironmentStatusEnum): EnvironmentStatus =>
  EnvironmentStatusEnum[status] as EnvironmentStatus

export const getIconForEnvironmentStatus = (status: EnvironmentStatus): IconData => StatusMap[status].icon

export const getTypeForEnvironmentStatus = (status: EnvironmentStatus): StatusPopoverType => StatusMap[status].type
