import { StatusBadgeTemplateType } from '../status-badges/status-badge-template';
import { StatusPopoverType } from '../status-popover/status-popover';
import { StatusTooltipTemplateType } from '../status-tooltips/status-tooltip-template';
import { ComponentModel } from '../../models/component';
import { ComponentStatus } from '../../models/component-status';
import { ReplicaStatus } from '../../models/replica-status';
import { ReplicaSummaryNormalizedModel } from '../../models/replica-summary';

export enum EnvironmentStatus {
  Consistent = 0,
  Running,
  Starting,
  Stopped,
  Warning,
  Danger,
}

export type EnvironmentStatusType = StatusBadgeTemplateType &
  StatusPopoverType &
  StatusTooltipTemplateType;

export const ComponentStatusMap = Object.freeze<
  Partial<Record<ComponentStatus, EnvironmentStatus>>
>({
  [ComponentStatus.StoppedComponent]: EnvironmentStatus.Stopped,
  [ComponentStatus.ConsistentComponent]: EnvironmentStatus.Consistent,
});

export const ReplicaStatusMap = Object.freeze<
  Partial<Record<ReplicaStatus, EnvironmentStatus>>
>({
  [ReplicaStatus.Running]: EnvironmentStatus.Running,
  [ReplicaStatus.Starting]: EnvironmentStatus.Starting,
  [ReplicaStatus.Succeeded]: EnvironmentStatus.Consistent,
});

export function aggregateComponentEnvironmentStatus(
  components: Array<ComponentModel>
): EnvironmentStatus {
  return (components ?? []).reduce<EnvironmentStatus>(
    (obj, { status }) =>
      Math.max(ComponentStatusMap[status] ?? EnvironmentStatus.Warning, obj),
    EnvironmentStatus.Consistent
  );
}

export function aggregateReplicaEnvironmentStatus(
  replicas: Array<ReplicaSummaryNormalizedModel>
): EnvironmentStatus {
  return (replicas ?? []).reduce<EnvironmentStatus>(
    (obj, { status }) =>
      Math.max(ReplicaStatusMap[status] ?? EnvironmentStatus.Warning, obj),
    EnvironmentStatus.Consistent
  );
}

export function getEnvironmentStatusType(
  status: EnvironmentStatus,
  defaultType: EnvironmentStatusType = 'default'
): EnvironmentStatusType {
  switch (status) {
    case EnvironmentStatus.Warning:
      return 'warning';
    case EnvironmentStatus.Danger:
      return 'danger';
    default:
      return defaultType;
  }
}
