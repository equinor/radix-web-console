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

type SeverityWithReason = {
  severity: Severity;
  reason: string;
  value: number;
};

export enum Severity {
  None = 0,
  Information = 1,
  Warning = 2,
  Critical = 3,
}

const NoneSeverity = {
  severity: Severity.None,
  reason: '',
  value: 0,
};

const SeverityMap = {
  [Severity.None]: { label: 'Normal Utilization', type: 'default' },
  [Severity.Information]: { label: 'Low Utilization', type: 'default' },
  [Severity.Warning]: { label: 'High Utilization', type: 'warning' },
  [Severity.Critical]: { label: 'Critical Utilization', type: 'danger' },
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
    let highestMemoryAlert: SeverityWithReason = NoneSeverity;
    let highestCPUAlert: SeverityWithReason = NoneSeverity;
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

  if (minimumSeverity !== undefined && severity.severity < minimumSeverity) {
    return null;
  }

  return (
    <StatusPopover
      icon={<Icon data={pressure} />}
      title="Resource Status"
      label={showLabel ? SeverityMap[severity.severity].label : undefined}
      type={SeverityMap[severity.severity].type}
      disablePopover={severity.severity === Severity.None}
    >
      <div className={'grid grid--gap-small'}>
        <StatusBadgeTemplate
          type={SeverityMap[highestMemoryAlert.severity].type}
        >
          Memory: {SeverityMap[highestMemoryAlert.severity].label} (
          {highestMemoryAlert.reason})
        </StatusBadgeTemplate>
        <StatusBadgeTemplate type={SeverityMap[highestCPUAlert.severity].type}>
          CPU: {SeverityMap[highestCPUAlert.severity].label} (
          {highestCPUAlert.reason})
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

const GetHighestSeverity = (
  a: SeverityWithReason,
  b: SeverityWithReason
): SeverityWithReason => {
  if (a.severity > b.severity) return a;
  return b;
};

const GetHighestSeverityFns = <TArgs,>(
  data: TArgs,
  fns: ((data: TArgs) => SeverityWithReason)[]
): SeverityWithReason => {
  let highest: SeverityWithReason = NoneSeverity;

  fns.forEach((fn) => {
    const res = fn(data);
    highest = GetHighestSeverity(res, highest);
  });

  return highest;
};

const HasLowCPUtilizationPercentage = (
  data: ReplicaUtilization
): SeverityWithReason => {
  const utilization = data.cpuAverage / data.cpuRequests;
  return utilization < LowCPUThreshold
    ? createSeverityWithReason(
        utilization,
        'less than',
        LowCPUThreshold,
        Severity.Information
      )
    : NoneSeverity;
};

const HasHighCPUtilizationPercentage = (
  data: ReplicaUtilization
): SeverityWithReason => {
  const utilization = data.cpuAverage / data.cpuRequests;
  return utilization > HighCPUThreshold
    ? createSeverityWithReason(
        utilization,
        'more than',
        HighCPUThreshold,
        Severity.Warning
      )
    : NoneSeverity;
};
const HasMaxCPUtilizationPercentage = (
  data: ReplicaUtilization
): SeverityWithReason => {
  const utilization = data.cpuAverage / data.cpuRequests;
  return utilization > MaxCPUThreshold
    ? createSeverityWithReason(
        utilization,
        'more than',
        MaxCPUThreshold,
        Severity.Critical
      )
    : NoneSeverity;
};

const HasLowMemorytilizationPercentage = (
  data: ReplicaUtilization
): SeverityWithReason => {
  const utilization = data.memoryMaximum / data.memoryRequests;
  return utilization < LowMemoryThreshold
    ? createSeverityWithReason(
        utilization,
        'less than',
        LowMemoryThreshold,
        Severity.Information
      )
    : NoneSeverity;
};

const HasHighMemorytilizationPercentage = (
  data: ReplicaUtilization
): SeverityWithReason => {
  const utilization = data.memoryMaximum / data.memoryRequests;
  return utilization > HighMemoryThreshold
    ? createSeverityWithReason(
        utilization,
        'more than',
        HighMemoryThreshold,
        Severity.Warning
      )
    : NoneSeverity;
};

const HasMaxMemorytilizationPercentage = (
  data: ReplicaUtilization
): SeverityWithReason => {
  const utilization = data.memoryMaximum / data.memoryRequests;
  return utilization > MaxMemoryThreshold
    ? createSeverityWithReason(
        utilization,
        'more than',
        MaxMemoryThreshold,
        Severity.Critical
      )
    : NoneSeverity;
};

function createSeverityWithReason(
  utilization: number,
  operator: string,
  threshold: number,
  severity: Severity
): SeverityWithReason {
  const utilPercentage = (utilization * 100).toFixed();
  const thresholdPercentage = (threshold * 100).toFixed();
  return {
    severity,
    reason: `utilization ${utilPercentage}% ${operator} threshold ${thresholdPercentage}%`,
    value: utilization,
  };
}
