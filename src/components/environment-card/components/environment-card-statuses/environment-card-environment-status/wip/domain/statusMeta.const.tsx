import { CircularProgress, Icon } from '@equinor/eds-core-react'
import { check, error_outlined, stop_circle, warning_outlined } from '@equinor/eds-icons'
import type { StatusMeta, SupportedStatusValues } from './statusMeta.types'

// Each map gives every one of its own status values a StatusMeta. The `weight` breaks ties when
// several values collapse to the same alert level (e.g. many 'Warning'): higher weight wins, so
// the most noteworthy value (and its icon) is the one shown. Weights and icons are scoped to
// their own map — they are never compared against another map's.

export const ReplicaStatusMap = {
  Running: { alertLevel: 'None', weight: 0, icon: <Icon data={check} /> },
  Succeeded: { alertLevel: 'None', weight: 1, icon: <Icon data={check} /> },
  Starting: { alertLevel: 'None', weight: 2, icon: <CircularProgress size={16} /> },
  Stopped: { alertLevel: 'Warning', weight: 3, icon: <Icon data={check} /> }, // TODO
  Pending: { alertLevel: 'None', weight: 4, icon: <CircularProgress size={16} /> },
  Terminated: { alertLevel: 'Warning', weight: 5, icon: <Icon data={warning_outlined} /> },
  Failing: { alertLevel: 'Danger', weight: 6, icon: <Icon data={error_outlined} /> },
  Failed: { alertLevel: 'Danger', weight: 7, icon: <Icon data={error_outlined} /> },
} as const satisfies Record<SupportedStatusValues['ReplicaStatus'], StatusMeta>

export const ComponentStatusMap = {
  Consistent: { alertLevel: 'None', weight: 0, icon: <Icon data={check} /> },
  Stopped: { alertLevel: 'None', weight: 1, icon: <Icon data={stop_circle} /> }, // TODO
  Outdated: { alertLevel: 'Warning', weight: 2, icon: <Icon data={warning_outlined} /> }, // TODO
  Reconciling: { alertLevel: 'None', weight: 3, icon: <CircularProgress size={16} /> },
  Restarting: { alertLevel: 'None', weight: 4, icon: <CircularProgress size={16} /> },
} as const satisfies Record<SupportedStatusValues['ComponentStatus'], StatusMeta>

export const AuxiliaryResourceDeploymentStatusMap = {
  Consistent: { alertLevel: 'None', weight: 0, icon: <Icon data={check} /> },
  Stopped: { alertLevel: 'None', weight: 1, icon: <Icon data={stop_circle} /> }, // TODO
  Reconciling: { alertLevel: 'None', weight: 2, icon: <CircularProgress size={16} /> },
} as const satisfies Record<SupportedStatusValues['AuxiliaryResourceDeploymentStatus'], StatusMeta>

export const DeploymentStatusMap = {
  Inactive: { alertLevel: 'None', weight: 0, icon: <Icon data={check} /> }, // TODO
  Ready: { alertLevel: 'None', weight: 1, icon: <Icon data={check} /> },
  Reconciling: { alertLevel: 'None', weight: 2, icon: <CircularProgress size={16} /> },
  Failed: { alertLevel: 'Danger', weight: 3, icon: <Icon data={error_outlined} /> },
} as const satisfies Record<SupportedStatusValues['DeploymentStatus'], StatusMeta>

export const JobStatusMap = {
  Succeeded: { alertLevel: 'None', weight: 0, icon: <Icon data={check} /> },
  Running: { alertLevel: 'None', weight: 1, icon: <Icon data={check} /> },
  Stopped: { alertLevel: 'None', weight: 2, icon: <Icon data={stop_circle} /> }, // TODO
  StoppedNoChanges: { alertLevel: 'None', weight: 3, icon: <Icon data={stop_circle} /> }, // TODO
  Queued: { alertLevel: 'Warning', weight: 4, icon: <Icon data={warning_outlined} /> }, // TODO
  Waiting: { alertLevel: 'Warning', weight: 5, icon: <Icon data={warning_outlined} /> }, // TODO
  Stopping: { alertLevel: 'Warning', weight: 6, icon: <Icon data={warning_outlined} /> }, // TODO
  Failed: { alertLevel: 'Danger', weight: 7, icon: <Icon data={error_outlined} /> },
} as const satisfies Record<NonNullable<SupportedStatusValues['LatestJobStatus']>, StatusMeta>
