import { Popover } from '@equinor/eds-core-react';
import { useEffect, useMemo, useRef, useState } from 'react';
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

const LowCPUThreshold = 0.2;
const HighCPUThreshold = 0.8;
const MaxCPUThreshold = 1.0;

const LowMemoryThreshold = 0.2;
const HighMemoryThreshold = 0.7;
const MaxMemoryThreshold = 0.9;

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

  useEffect(() => {
    const handleBodyClick = () => setOpen(false);
    document.body.addEventListener('click', handleBodyClick);
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []);

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
        <Popover.Content>hello world {appName}</Popover.Content>
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
