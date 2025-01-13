import { Icon, Popover, Typography } from '@equinor/eds-core-react';
import { desktop_mac } from '@equinor/eds-icons';
import { useMemo, useRef, useState } from 'react';
import { pollingInterval } from '../../store/defaults';
import {
  type GetEnvironmentResourcesUtilizationApiResponse,
  type ReplicaUtilization,
  useGetApplicationResourcesUtilizationQuery,
} from '../../store/radix-api';
import {
  GetHighestSeverity,
  GetHighestSeverityFns,
  Severity,
  SeverityStatusBadge,
} from '../status-badges/severity-status-badge';
import './style.css';

const LowCPUThreshold = 0.2;
const HighCPUThreshold = 0.8;
const MaxCPUThreshold = 1.0;

const LowMemoryThreshold = 0.2;
const HighMemoryThreshold = 0.7;
const MaxMemoryThreshold = 0.9;

const CPULabels = {
  [Severity.None]: 'CPU utilization OK',
  [Severity.Information]: 'CPU utilization Low',
  [Severity.Warning]: 'CPU utilization High',
  [Severity.Critical]: 'CPU utilization Critical',
} satisfies Record<Severity, string>;

const MemoryLabels = {
  [Severity.None]: 'Memory utilization OK',
  [Severity.Information]: 'Memory utilization Low',
  [Severity.Warning]: 'Memory utilization High',
  [Severity.Critical]: 'Memory utilization Critical',
} satisfies Record<Severity, string>;

type Props = {
  appName: string;
  path: string;
  style?: 'icon' | 'chip';
};

export const UtilizationPopover = ({ appName, path }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { data } = useGetApplicationResourcesUtilizationQuery(
    { appName },
    { pollingInterval }
  );

  const { highestMemoryAlert, highestCPUAlert } = useMemo(() => {
    let highestMemoryAlert = Severity.None;
    let highestCPUAlert = Severity.None;
    flattenAndFilterResults(data, path).forEach((replica) => {
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
  }, [data, path]);

  console.log('rendered');

  const severity = GetHighestSeverity(highestMemoryAlert, highestCPUAlert);
  return (
    <>
      <Popover
        placement={'top'}
        anchorEl={ref.current}
        open={open && severity !== Severity.None}
        onClick={(ev) => ev.stopPropagation()}
      >
        <Popover.Header>
          <Popover.Title>Resource Status</Popover.Title>
        </Popover.Header>
        <Popover.Content className={'utilization_popover__content'}>
          <SeverityStatusBadge severity={highestMemoryAlert}>
            {MemoryLabels[highestMemoryAlert]}
          </SeverityStatusBadge>
          <SeverityStatusBadge severity={highestCPUAlert}>
            {CPULabels[highestCPUAlert]}
          </SeverityStatusBadge>
        </Popover.Content>
        <Popover.Actions>
          <Typography>
            See Monitoring <Icon size={16} data={desktop_mac} /> for more
            details.
          </Typography>
        </Popover.Actions>
      </Popover>

      <SeverityStatusBadge
        severity={severity}
        ref={ref}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      />
    </>
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
