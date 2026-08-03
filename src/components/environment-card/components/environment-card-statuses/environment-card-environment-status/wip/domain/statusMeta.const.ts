import { check, error_outlined, stop_circle, warning_outlined } from '@equinor/eds-icons'
import type { StatusMeta, SupportedStatusValues } from './statusMeta.types'

// Each map gives every one of its own status values a StatusMeta. The `weight` breaks ties when
// several values collapse to the same alert level (e.g. many 'Warning'): higher weight wins, so
// the most noteworthy value (and its icon) is the one shown. Weights and icons are scoped to
// their own map — they are never compared against another map's.
export const ReplicaStatusMap: Record<SupportedStatusValues['ReplicaStatus'], StatusMeta> = {
  Running: { alertLevel: 'Good', weight: 0, icon: check },
  Succeeded: { alertLevel: 'Warning', weight: 1, icon: check },
  Starting: { alertLevel: 'Warning', weight: 2, icon: warning_outlined },
  Stopped: { alertLevel: 'Warning', weight: 3, icon: check },
  Pending: { alertLevel: 'Warning', weight: 4, icon: warning_outlined },
  Terminated: { alertLevel: 'Warning', weight: 5, icon: warning_outlined },
  Failing: { alertLevel: 'Warning', weight: 6, icon: warning_outlined },
  Failed: { alertLevel: 'Danger', weight: 7, icon: error_outlined },
}

export const ComponentStatusMap: Record<Exclude<SupportedStatusValues['ComponentStatus'], undefined>, StatusMeta> = {
  Consistent: { alertLevel: 'Good', weight: 0, icon: check },
  Stopped: { alertLevel: 'Good', weight: 1, icon: stop_circle },
  Outdated: { alertLevel: 'Warning', weight: 2, icon: warning_outlined },
  Reconciling: { alertLevel: 'Warning', weight: 3, icon: warning_outlined },
  Restarting: { alertLevel: 'Warning', weight: 4, icon: warning_outlined },
}

export const AuxiliaryResourceDeploymentStatusMap: Record<
  SupportedStatusValues['AuxiliaryResourceDeploymentStatus'],
  StatusMeta
> = {
  Consistent: { alertLevel: 'Good', weight: 0, icon: check },
  Stopped: { alertLevel: 'Good', weight: 1, icon: stop_circle },
  Reconciling: { alertLevel: 'Warning', weight: 2, icon: warning_outlined },
}

export const DeploymentStatusMap: Record<SupportedStatusValues['DeploymentStatus'], StatusMeta> = {
  Inactive: { alertLevel: 'Good', weight: 0, icon: check },
  Ready: { alertLevel: 'Good', weight: 1, icon: check },
  Reconciling: { alertLevel: 'Warning', weight: 2, icon: warning_outlined },
  Failed: { alertLevel: 'Danger', weight: 3, icon: error_outlined },
}

export const JobStatusMap: Record<NonNullable<SupportedStatusValues['LatestJobStatus']>, StatusMeta> = {
  Succeeded: { alertLevel: 'Good', weight: 0, icon: check },
  Running: { alertLevel: 'Good', weight: 1, icon: check },
  Stopped: { alertLevel: 'Good', weight: 2, icon: stop_circle },
  StoppedNoChanges: { alertLevel: 'Good', weight: 3, icon: stop_circle },
  Queued: { alertLevel: 'Warning', weight: 4, icon: warning_outlined },
  Waiting: { alertLevel: 'Warning', weight: 5, icon: warning_outlined },
  Stopping: { alertLevel: 'Warning', weight: 6, icon: warning_outlined },
  Failed: { alertLevel: 'Danger', weight: 7, icon: error_outlined },
}
