import { Icon, Popover, Typography } from '@equinor/eds-core-react';
import { desktop_mac } from '@equinor/eds-icons';
import { useMemo, useRef, useState } from 'react';
import type {
  GetEnvironmentResourcesUtilizationApiResponse,
  ReplicaResourcesUtilizationResponse,
  ReplicaUtilization,
} from '../../store/radix-api';
import {
  GetHighestSeverity,
  GetHighestSeverityFns,
  Severity,
  SeverityStatusBadge,
} from '../status-badges/severity-status-badge';

const LowCPUThreshold = 0.2;
const HighCPUThreshold = 0.8;
const MaxCPUThreshold = 1.0;

const LowMemoryThreshold = 0.2;
const HighMemoryThreshold = 0.7;
const MaxMemoryThreshold = 0.9;

const Labels = {
  [Severity.None]: 'Utilization ok',
  [Severity.Information]: 'Utilization Low',
  [Severity.Warning]: 'Utilization High',
  [Severity.Critical]: 'Utilization Critical',
} satisfies Record<Severity, string>;

type Props = {
  path: string;
  showLabel?: boolean;
  utilization?: ReplicaResourcesUtilizationResponse;
};

export const UtilizationPopover = ({ path, showLabel, utilization }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

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
  return (
    <div
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Popover
        placement={'top'}
        anchorEl={ref.current}
        open={open && severity !== Severity.None}
        onClick={(ev) => ev.stopPropagation()}
      >
        <Popover.Header>
          <Popover.Title>Resource Status</Popover.Title>
        </Popover.Header>
        <Popover.Content className={'grid grid--gap-small'}>
          <SeverityStatusBadge severity={highestMemoryAlert}>
            Memory {Labels[highestMemoryAlert]}
          </SeverityStatusBadge>
          <SeverityStatusBadge severity={highestCPUAlert}>
            CPU {Labels[highestCPUAlert]}
          </SeverityStatusBadge>
        </Popover.Content>
        <Popover.Actions>
          <Typography>
            See Monitoring <Icon size={16} data={desktop_mac} /> for more
            details.
          </Typography>
        </Popover.Actions>
      </Popover>

      <SeverityStatusBadge label={Labels[severity]} severity={severity} />
    </div>
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
