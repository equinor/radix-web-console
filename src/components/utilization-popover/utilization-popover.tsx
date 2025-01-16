import { Icon, Typography } from '@equinor/eds-core-react';
import { desktop_mac, pressure } from '@equinor/eds-icons';
import { useMemo } from 'react';
import type {
  GetEnvironmentResourcesUtilizationApiResponse,
  ReplicaResourcesUtilizationResponse,
  ReplicaUtilization,
} from '../../store/radix-api';
import { StatusBadgeTemplate } from '../status-badges/status-badge-template';
import {
  StatusPopover,
  type StatusPopoverType,
} from '../status-popover/status-popover';

const LowCPUThreshold = 0.2;
const HighCPUThreshold = 0.8;
const MaxCPUThreshold = 1.0;

const LowMemoryThreshold = 0.2;
const HighMemoryThreshold = 0.7;
const MaxMemoryThreshold = 0.9;

export enum Severity {
  None = 0,
  Information = 1,
  Warning = 2,
  Critical = 3,
}

const SeverityMap = {
  [Severity.None]: { label: 'Normal', type: 'default' },
  [Severity.Information]: { label: 'Low', type: 'default' },
  [Severity.Warning]: { label: 'High', type: 'warning' },
  [Severity.Critical]: { label: 'Critical', type: 'danger' },
} satisfies Record<Severity, { label: string; type: StatusPopoverType }>;

type Props = {
  path: string;
  showLabel?: boolean;
  minimumSeverity?: Severity;
  utilization?: ReplicaResourcesUtilizationResponse;
};

export const UtilizationPopover = ({
  path,
  showLabel,
  utilization,
  minimumSeverity,
}: Props) => {
  const { highestMemoryAlert, highestCPUAlert } = useMemo(() => {
    let highestMemoryAlert = Severity.None;
    let highestCPUAlert = Severity.None;
    flattenAndFilterResults(utilization, path).forEach((replica) => {
      const cpuAlert = GetHighestSeverityFns(replica, [
        HasMaxCPUtilizationPercentage,
        HasHighCPUtilizationPercentage,
        HasLowCPUtilizationPercentage,
      ]);

      const memoryAlert = GetHighestSeverityFns(replica, [
        HasMaxMemorytilizationPercentage,
        HasHighMemorytilizationPercentage,
        HasLowMemorytilizationPercentage,
      ]);

      highestCPUAlert = GetHighestSeverity(cpuAlert, highestCPUAlert);
      highestMemoryAlert = GetHighestSeverity(memoryAlert, highestMemoryAlert);
    });

    return { highestMemoryAlert, highestCPUAlert };
  }, [utilization, path]);

  const severity = GetHighestSeverity(highestMemoryAlert, highestCPUAlert);

  if (minimumSeverity !== undefined && severity < minimumSeverity) {
    return null;
  }

  return (
    <StatusPopover
      icon={<Icon data={pressure} />}
      title="Resource Status"
      label={showLabel ? SeverityMap[severity].label : undefined}
      type={SeverityMap[severity].type}
      disablePopover={severity === Severity.None}
    >
      <div className={'grid grid--gap-small'}>
        <StatusBadgeTemplate type={SeverityMap[highestMemoryAlert].type}>
          Memory {SeverityMap[highestMemoryAlert].label}
        </StatusBadgeTemplate>
        <StatusBadgeTemplate type={SeverityMap[highestCPUAlert].type}>
          CPU {SeverityMap[highestCPUAlert].label}
        </StatusBadgeTemplate>
        <Typography>
          See Monitoring <Icon size={16} data={desktop_mac} /> for more details.
        </Typography>
      </div>
    </StatusPopover>
  );
};

const flattenAndFilterResults = (
  data: GetEnvironmentResourcesUtilizationApiResponse | undefined,
  path: string
): ReplicaUtilization[] => {
  if (!data || !data.environments) return [];

  const results: ReplicaUtilization[] = [];

  Object.keys(data.environments).forEach((envName) => {
    const components = data.environments?.[envName].components;
    if (!components) return;

    Object.keys(components).forEach((compName) => {
      const replicas = components[compName].replicas;
      if (!replicas) return;

      Object.keys(replicas).forEach((replicaName) => {
        const key = `${envName}.${compName}.${replicaName}`;
        if (!key.startsWith(path)) return;

        results.push(replicas[replicaName]);
      });
    });
  });

  return results;
};

const GetHighestSeverity = (a: Severity, b: Severity): Severity => {
  if (a > b) return a;
  return b;
};

const GetHighestSeverityFns = <TArgs,>(
  data: TArgs,
  fns: ((data: TArgs) => Severity)[]
): Severity => {
  let highest = Severity.None;

  fns.forEach((fn) => {
    const res = fn(data);
    highest = GetHighestSeverity(res, highest);
  });

  return highest;
};

const HasLowCPUtilizationPercentage = (data: ReplicaUtilization): Severity => {
  return data.cpuAverage / data.cpuRequests < LowCPUThreshold
    ? Severity.Information
    : Severity.None;
};

const HasHighCPUtilizationPercentage = (data: ReplicaUtilization): Severity => {
  return data.cpuAverage / data.cpuRequests > HighCPUThreshold
    ? Severity.Warning
    : Severity.None;
};
const HasMaxCPUtilizationPercentage = (data: ReplicaUtilization): Severity => {
  return data.cpuAverage / data.cpuRequests > MaxCPUThreshold
    ? Severity.Critical
    : Severity.None;
};

const HasLowMemorytilizationPercentage = (
  data: ReplicaUtilization
): Severity => {
  return data.memoryMaximum / data.memoryRequests < LowMemoryThreshold
    ? Severity.Information
    : Severity.None;
};

const HasHighMemorytilizationPercentage = (
  data: ReplicaUtilization
): Severity => {
  return data.memoryMaximum / data.memoryRequests > HighMemoryThreshold
    ? Severity.Warning
    : Severity.None;
};
const HasMaxMemorytilizationPercentage = (
  data: ReplicaUtilization
): Severity => {
  return data.memoryMaximum / data.memoryRequests > MaxMemoryThreshold
    ? Severity.Critical
    : Severity.None;
};
