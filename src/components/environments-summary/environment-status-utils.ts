import { StatusBadgeTemplateType } from '../status-badges/status-badge-template';
import { StatusPopoverType } from '../status-popover/status-popover';
import { StatusTooltipTemplateType } from '../status-tooltips/status-tooltip-template';
import { ComponentModel } from '../../models/radix-api/deployments/component';
import { ComponentStatus } from '../../models/radix-api/deployments/component-status';
import { ReplicaStatus } from '../../models/radix-api/deployments/replica-status';
import { ReplicaSummaryNormalizedModel } from '../../models/radix-api/deployments/replica-summary';
import { EnvironmentVulnerabilities, ImageScan } from '../../store/scan-api';

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

export function aggregateVulnerabilitySummaries(
  summaries: Array<ImageScan['vulnerabilitySummary']>
): ImageScan['vulnerabilitySummary'] {
  return summaries
    .filter((x) => !!x)
    .reduce(
      (o1, x) =>
        Object.keys(x).reduce(
          (o2, xKey) => ({ ...o2, [xKey]: x[xKey] + (o2[xKey] ?? 0) }),
          o1
        ),
      {}
    );
}

export function environmentVulnerabilitySummarizer(
  envScans: EnvironmentVulnerabilities
): ImageScan['vulnerabilitySummary'] {
  return Object.keys(envScans ?? {})
    .filter(
      (x: keyof Omit<EnvironmentVulnerabilities, 'name'>) =>
        x === 'components' || x === 'jobs'
    )
    .reduce<ImageScan['vulnerabilitySummary']>(
      (obj, key1) =>
        aggregateVulnerabilitySummaries([
          obj,
          ...Object.keys(envScans[key1]).map<ImageScan['vulnerabilitySummary']>(
            (key2) => envScans[key1][key2].vulnerabilitySummary
          ),
        ]),
      {}
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
