import { StatusBadgeTemplateType } from '../status-badges/status-badge-template';
import { StatusPopoverType } from '../status-popover/status-popover';
import { StatusTooltipTemplateType } from '../status-tooltips/status-tooltip-template';
import { ComponentModel } from '../../models/component';
import { ComponentStatus } from '../../models/component-status';
import { EnvironmentScanSummaryModel } from '../../models/environment-scan-summary';
import { ReplicaStatus } from '../../models/replica-status';
import { ReplicaSummaryNormalizedModel } from '../../models/replica-summary';
import { VulnerabilitySummaryModel } from '../../models/vulnerability-summary';

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

export function aggregateVulnerabilityEnvironmentStatus(
  vulnerabilities: Array<VulnerabilitySummaryModel>
): EnvironmentStatus {
  return (vulnerabilities ?? []).reduce<EnvironmentStatus>(
    (obj, { critical, high }) =>
      Math.max(
        critical
          ? EnvironmentStatus.Danger
          : high
          ? EnvironmentStatus.Warning
          : EnvironmentStatus.Consistent,
        obj
      ),
    EnvironmentStatus.Consistent
  );
}

export function aggregateVulnerabilitySummaries(
  summaries: Array<VulnerabilitySummaryModel>
): VulnerabilitySummaryModel {
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
  envScans: EnvironmentScanSummaryModel
): VulnerabilitySummaryModel {
  return Object.keys(envScans ?? {})
    .filter(
      (x: keyof EnvironmentScanSummaryModel) =>
        x === 'components' || x === 'jobs'
    )
    .reduce<VulnerabilitySummaryModel>(
      (obj, key1) =>
        aggregateVulnerabilitySummaries([
          obj,
          ...Object.keys(envScans[key1]).map<VulnerabilitySummaryModel>(
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
