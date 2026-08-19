import { CircularProgress, Icon } from '@equinor/eds-core-react'
import { check, error_outlined, stop_circle, warning_outlined } from '@equinor/eds-icons'
import type { AlertLevel, StatusMeta, SupportedStatusValues } from './statusMeta.types'

// Each map gives every one of its own status values a StatusMeta. The `priority` breaks ties when
// several values collapse to the same alert level (e.g. many 'Warning'). higher priority wins, so
// the most noteworthy value (and its icon) is the one shown.

export const REPLICA_STATUS_MAP = {
  Running: { alertLevel: 'None', priority: 0, icon: <Icon data={check} /> },
  Succeeded: { alertLevel: 'None', priority: 1, icon: <Icon data={check} /> },
  Stopped: { alertLevel: 'None', priority: 2, icon: <Icon data={check} /> },
  Starting: { alertLevel: 'Loading', priority: 3, icon: <CircularProgress size={16} /> },
  Pending: { alertLevel: 'Loading', priority: 4, icon: <CircularProgress size={16} /> },
  Failing: { alertLevel: 'Danger', priority: 5, icon: <Icon data={error_outlined} /> },
  Terminated: { alertLevel: 'Danger', priority: 6, icon: <Icon data={error_outlined} /> },
  Failed: { alertLevel: 'Danger', priority: 7, icon: <Icon data={error_outlined} /> },
} as const satisfies Record<SupportedStatusValues['ReplicaStatus'], StatusMeta>

export const COMPONENT_STATUS_MAP = {
  Consistent: { alertLevel: 'None', priority: 0, icon: <Icon data={check} /> },
  Stopped: { alertLevel: 'None', priority: 1, icon: <Icon data={stop_circle} /> },
  Reconciling: { alertLevel: 'Loading', priority: 2, icon: <CircularProgress size={16} /> },
  Restarting: { alertLevel: 'Loading', priority: 3, icon: <CircularProgress size={16} /> },
  Outdated: { alertLevel: 'Warning', priority: 4, icon: <Icon data={warning_outlined} /> },
} as const satisfies Record<SupportedStatusValues['ComponentStatus'], StatusMeta>

export const AUXILIARY_RESOURCE_DEPLOYMENT_STATUS_MAP = {
  Consistent: { alertLevel: 'None', priority: 0, icon: <Icon data={check} /> },
  Stopped: { alertLevel: 'None', priority: 1, icon: <Icon data={stop_circle} /> },
  Reconciling: { alertLevel: 'Loading', priority: 2, icon: <CircularProgress size={16} /> },
} as const satisfies Record<SupportedStatusValues['AuxiliaryResourceDeploymentStatus'], StatusMeta>

export const DEPLOYMENT_STATUS_MAP = {
  Inactive: { alertLevel: 'None', priority: 0, icon: <Icon data={check} /> },
  Ready: { alertLevel: 'None', priority: 1, icon: <Icon data={check} /> },
  Reconciling: { alertLevel: 'Loading', priority: 2, icon: <CircularProgress size={16} /> },
  Failed: { alertLevel: 'Danger', priority: 3, icon: <Icon data={error_outlined} /> },
} as const satisfies Record<SupportedStatusValues['DeploymentStatus'], StatusMeta>

export const JOB_STATUS_MAP = {
  Succeeded: { alertLevel: 'None', priority: 0, icon: <Icon data={check} /> },
  Running: { alertLevel: 'None', priority: 1, icon: <Icon data={check} /> },
  Stopped: { alertLevel: 'None', priority: 2, icon: <Icon data={stop_circle} /> },
  StoppedNoChanges: { alertLevel: 'None', priority: 3, icon: <Icon data={stop_circle} /> },
  Queued: { alertLevel: 'Loading', priority: 4, icon: <Icon data={warning_outlined} /> },
  Waiting: { alertLevel: 'Loading', priority: 5, icon: <Icon data={warning_outlined} /> },
  Stopping: { alertLevel: 'Loading', priority: 6, icon: <Icon data={warning_outlined} /> },
  Failed: { alertLevel: 'Danger', priority: 7, icon: <Icon data={error_outlined} /> },
} as const satisfies Record<NonNullable<SupportedStatusValues['LatestJobStatus']>, StatusMeta>

export const UNKNOWN_STATUS_META: Readonly<StatusMeta> = {
  alertLevel: 'Warning',
  priority: 999,
  icon: <Icon data={warning_outlined} />,
}

export const NONE_STATUS_META: Readonly<StatusMeta> = { alertLevel: 'None', priority: -1, icon: <Icon data={check} /> }

export const ALERT_LEVEL_SEVERITY_MAP = {
  None: 0,
  Loading: 1,
  Warning: 2,
  Danger: 3,
} as const satisfies Record<AlertLevel, number>
