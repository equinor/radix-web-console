import type { Component } from '../../store/radix-api';
import type {
  EnvironmentVulnerabilities,
  ImageScan,
} from '../../store/scan-api';
import type { StatusBadgeTemplateType } from '../status-badges/status-badge-template';
import type { StatusPopoverType } from '../status-popover/status-popover';
import type { StatusTooltipTemplateType } from '../status-tooltips/status-tooltip-template';

export type VulnerabilitySummary = Required<ImageScan>['vulnerabilitySummary'];
export enum EnvironmentStatus {
  Consistent = 0,
  Running = 1,
  Starting = 2,
  Stopped = 3,
  Warning = 4,
  Danger = 5,
}

type EnvironmentStatusType = StatusBadgeTemplateType &
  StatusPopoverType &
  StatusTooltipTemplateType;

const ComponentStatusMap = {
  Stopped: EnvironmentStatus.Stopped,
  Consistent: EnvironmentStatus.Consistent,
} as const;

const AuxiliaryResourceDeploymentStatusMap = {
  Stopped: EnvironmentStatus.Stopped,
  Consistent: EnvironmentStatus.Consistent,
} as const;

const ReplicaStatusMap = {
  Running: EnvironmentStatus.Running,
  Starting: EnvironmentStatus.Starting,
} as const;

export function aggregateComponentEnvironmentStatus(
  components: Component[]
): EnvironmentStatus {
  return components.reduce<EnvironmentStatus>(
    (obj, { status, oauth2 }) =>
      Math.max(
        ComponentStatusMap[status ?? 'unknown'] ?? EnvironmentStatus.Warning,
        AuxiliaryResourceDeploymentStatusMap[
          oauth2?.deployment.status ?? 'Consistent'
        ] ?? EnvironmentStatus.Warning,
        obj
      ),
    EnvironmentStatus.Consistent
  );
}

export function aggregateComponentReplicaEnvironmentStatus(
  components: Component[]
): EnvironmentStatus {
  const replicas = components
    .flatMap((c) => c.replicaList)
    .concat(components?.flatMap((c) => c.oauth2?.deployment.replicaList ?? []))
    .filter((x) => !!x);

  return replicas.reduce(
    (obj, { replicaStatus }) =>
      Math.max(
        ReplicaStatusMap[replicaStatus?.status ?? 'unknown'] ??
          EnvironmentStatus.Warning,
        obj
      ),
    EnvironmentStatus.Consistent
  );
}

export function aggregateVulnerabilitySummaries(
  summaries: VulnerabilitySummary[]
): VulnerabilitySummary {
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
  envScans?: EnvironmentVulnerabilities
): VulnerabilitySummary {
  const componentSummaries = Object.values(envScans?.components ?? {})
    .map((c) => c.vulnerabilitySummary)
    .filter((c) => !!c);

  const jobSummaries = Object.values(envScans?.jobs ?? {})
    .map((c) => c.vulnerabilitySummary)
    .filter((c) => !!c);

  return aggregateVulnerabilitySummaries([
    ...componentSummaries,
    ...jobSummaries,
  ]);
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
