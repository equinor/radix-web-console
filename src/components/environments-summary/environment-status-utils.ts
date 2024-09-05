import type { StatusBadgeTemplateType } from '../status-badges/status-badge-template';
import type { StatusPopoverType } from '../status-popover/status-popover';
import type { StatusTooltipTemplateType } from '../status-tooltips/status-tooltip-template';
import type {
  AuxiliaryResourceDeployment,
  Component,
  ReplicaStatus,
} from '../../store/radix-api';
import type {
  EnvironmentVulnerabilities,
  ImageScan,
} from '../../store/scan-api';

export enum EnvironmentStatus {
  Consistent = 0,
  Running,
  Starting,
  Stopped,
  Warning,
  Danger,
}

type EnvironmentStatusType = StatusBadgeTemplateType &
  StatusPopoverType &
  StatusTooltipTemplateType;

const ComponentStatusMap = Object.freeze<
  Partial<Record<Component['status'], EnvironmentStatus>>
>({
  Stopped: EnvironmentStatus.Stopped,
  Consistent: EnvironmentStatus.Consistent,
});

const AuxiliaryResourceDeploymentStatusMap = Object.freeze<
  Partial<Record<AuxiliaryResourceDeployment['status'], EnvironmentStatus>>
>({
  Stopped: EnvironmentStatus.Stopped,
  Consistent: EnvironmentStatus.Consistent,
});

const ReplicaStatusMap = Object.freeze<
  Partial<Record<ReplicaStatus['status'], EnvironmentStatus>>
>({
  Running: EnvironmentStatus.Running,
  Starting: EnvironmentStatus.Starting,
});

export function aggregateComponentEnvironmentStatus(
  components: Readonly<Array<Component>>
): EnvironmentStatus {
  return (components ?? []).reduce<EnvironmentStatus>(
    (obj, { status, oauth2 }) =>
      Math.max(
        ComponentStatusMap[status] ?? EnvironmentStatus.Warning,
        AuxiliaryResourceDeploymentStatusMap[
          oauth2?.deployment.status ?? 'Consistent'
        ] ?? EnvironmentStatus.Warning,
        obj
      ),
    EnvironmentStatus.Consistent
  );
}

export function aggregateComponentReplicaEnvironmentStatus(
  components: Readonly<Array<Component>>
): EnvironmentStatus {
  const replicas = (components ?? [])
    .flatMap((c) => c.replicaList)
    .concat(components.flatMap((c) => c.oauth2?.deployment.replicaList ?? []));

  return replicas.reduce<EnvironmentStatus>(
    (obj, { replicaStatus }) =>
      Math.max(
        ReplicaStatusMap[replicaStatus?.status] ?? EnvironmentStatus.Warning,
        obj
      ),
    EnvironmentStatus.Consistent
  );
}

export function aggregateVulnerabilitySummaries(
  summaries: Readonly<Array<ImageScan['vulnerabilitySummary']>>
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
  envScans: Readonly<EnvironmentVulnerabilities>
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
