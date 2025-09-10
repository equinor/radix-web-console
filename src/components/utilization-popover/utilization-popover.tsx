import { Icon, Typography } from '@equinor/eds-core-react'
import { desktop_mac, pressure } from '@equinor/eds-icons'
import { useMemo } from 'react'
import type {
  GetEnvironmentResourcesUtilizationApiResponse,
  ReplicaResourcesUtilizationResponse,
  ReplicaUtilization,
} from '../../store/radix-api'
import { StatusBadgeTemplate } from '../status-badges/status-badge-template'
import { StatusPopover, type StatusPopoverType } from '../status-popover/status-popover'

const LowCPUThreshold = 0.2
const HighCPUThreshold = 0.8
const MaxCPUThreshold = 1.0

const LowMemoryThreshold = 0.2
const HighMemoryThreshold = 0.7
const MaxMemoryThreshold = 0.9

type SeverityWithReason = {
  severity: Severity
  reason: string
  value: number
}

export enum Severity {
  None = 0,
  Information = 1,
  Warning = 2,
  Critical = 3,
}

const SeverityMap = {
  [Severity.None]: { label: 'Normal Utilization', type: 'default' },
  [Severity.Information]: { label: 'Low Utilization', type: 'default' },
  [Severity.Warning]: { label: 'High Utilization', type: 'warning' },
  [Severity.Critical]: { label: 'Critical Utilization', type: 'danger' },
} satisfies Record<Severity, { label: string; type: StatusPopoverType }>

type Props = {
  path: string
  showLabel?: boolean
  minimumSeverity?: Severity
  utilization?: ReplicaResourcesUtilizationResponse
}

export const UtilizationPopover = ({ path, showLabel, utilization, minimumSeverity }: Props) => {
  const { highestMemoryAlert, highestCPUAlert } = useMemo(() => {
    let highestMemoryAlert = createSeverityWithReason(0, Severity.None)
    let highestCPUAlert = createSeverityWithReason(0, Severity.None)

    flattenAndFilterResults(utilization, path).forEach((replica) => {
      const cpuAlert = GetHighestSeverityFns(replica, [
        HasMaxCPUtilizationPercentage,
        HasHighCPUtilizationPercentage,
        HasLowCPUtilizationPercentage,
      ])

      const memoryAlert = GetHighestSeverityFns(replica, [
        HasMaxMemorytilizationPercentage,
        HasHighMemorytilizationPercentage,
        HasLowMemorytilizationPercentage,
      ])

      highestCPUAlert = GetHighestSeverity(cpuAlert, highestCPUAlert)
      highestMemoryAlert = GetHighestSeverity(memoryAlert, highestMemoryAlert)
    })

    return { highestMemoryAlert, highestCPUAlert }
  }, [utilization, path])

  const severity = GetHighestSeverity(highestMemoryAlert, highestCPUAlert)

  if (minimumSeverity !== undefined && severity.severity < minimumSeverity) {
    return null
  }

  return (
    <StatusPopover
      icon={<Icon data={pressure} />}
      title="Resource Utilization Status"
      label={showLabel ? SeverityMap[severity.severity].label : undefined}
      type={SeverityMap[severity.severity].type}
      disablePopover={severity.severity === Severity.None}
    >
      <div className={'grid grid--gap-small'}>
        <StatusBadgeTemplate type={SeverityMap[highestMemoryAlert.severity].type}>
          Memory {highestMemoryAlert.reason}
        </StatusBadgeTemplate>
        <StatusBadgeTemplate type={SeverityMap[highestCPUAlert.severity].type}>
          CPU {highestCPUAlert.reason}
        </StatusBadgeTemplate>

        <Typography variant={'h6'}>
          See Monitoring <Icon size={16} data={desktop_mac} /> for more details.
        </Typography>

        <br />

        <Typography variant={'h6'}>CPU Limits are based on average usage over the last 24 hours.</Typography>
        <Typography>
          The thresholds are: Critical: {(MaxCPUThreshold * 100).toFixed()}%, High: {(HighCPUThreshold * 100).toFixed()}
          % and Low: {(LowCPUThreshold * 100).toFixed()}%.
        </Typography>
        <Typography variant={'h6'}>Memory Limits are based on maximum usage over the last 24 hours.</Typography>
        <Typography>
          The thresholds are: Critical: {(MaxMemoryThreshold * 100).toFixed()}%, High:{' '}
          {(HighMemoryThreshold * 100).toFixed()}% and Low: {(LowMemoryThreshold * 100).toFixed()}%.
        </Typography>
      </div>
    </StatusPopover>
  )
}

const flattenAndFilterResults = (
  data: GetEnvironmentResourcesUtilizationApiResponse | undefined,
  path: string
): ReplicaUtilization[] => {
  if (!data || !data.environments) return []

  const results: ReplicaUtilization[] = []

  Object.keys(data.environments).forEach((envName) => {
    const components = data.environments?.[envName].components
    if (!components) return

    Object.keys(components).forEach((compName) => {
      const replicas = components[compName].replicas
      if (!replicas) return

      Object.keys(replicas).forEach((replicaName) => {
        const key = `${envName}.${compName}.${replicaName}`
        if (!key.startsWith(path)) return

        results.push(replicas[replicaName])
      })
    })
  })

  return results
}

const GetHighestSeverity = (a: SeverityWithReason, b: SeverityWithReason): SeverityWithReason => {
  if (a.severity > b.severity) return a
  return b
}

const GetHighestSeverityFns = <TArgs,>(
  data: TArgs,
  fns: ((data: TArgs) => SeverityWithReason)[]
): SeverityWithReason => {
  let highest = createSeverityWithReason(0, Severity.None)

  fns.forEach((fn) => {
    const res = fn(data)
    highest = GetHighestSeverity(res, highest)
  })

  return highest
}

const HasLowCPUtilizationPercentage = (data: ReplicaUtilization): SeverityWithReason => {
  const utilization = data.cpuAverage / data.cpuRequests
  return utilization < LowCPUThreshold
    ? createSeverityWithReason(utilization, Severity.Information)
    : createSeverityWithReason(utilization, Severity.None)
}

const HasHighCPUtilizationPercentage = (data: ReplicaUtilization): SeverityWithReason => {
  const utilization = data.cpuAverage / data.cpuRequests
  return utilization > HighCPUThreshold
    ? createSeverityWithReason(utilization, Severity.Warning)
    : createSeverityWithReason(utilization, Severity.None)
}
const HasMaxCPUtilizationPercentage = (data: ReplicaUtilization): SeverityWithReason => {
  const utilization = data.cpuAverage / data.cpuRequests
  return utilization > MaxCPUThreshold
    ? createSeverityWithReason(utilization, Severity.Critical)
    : createSeverityWithReason(utilization, Severity.None)
}

const HasLowMemorytilizationPercentage = (data: ReplicaUtilization): SeverityWithReason => {
  const utilization = data.memoryMaximum / data.memoryRequests
  return utilization < LowMemoryThreshold
    ? createSeverityWithReason(utilization, Severity.Information)
    : createSeverityWithReason(utilization, Severity.None)
}

const HasHighMemorytilizationPercentage = (data: ReplicaUtilization): SeverityWithReason => {
  const utilization = data.memoryMaximum / data.memoryRequests
  return utilization > HighMemoryThreshold
    ? createSeverityWithReason(utilization, Severity.Warning)
    : createSeverityWithReason(utilization, Severity.None)
}

const HasMaxMemorytilizationPercentage = (data: ReplicaUtilization): SeverityWithReason => {
  const utilization = data.memoryMaximum / data.memoryRequests
  return utilization > MaxMemoryThreshold
    ? createSeverityWithReason(utilization, Severity.Critical)
    : createSeverityWithReason(utilization, Severity.None)
}

function createSeverityWithReason(value: number, severity: Severity): SeverityWithReason {
  const utilPercentage = (value * 100).toFixed()
  let reason = SeverityMap[severity].label

  if (severity > Severity.None) {
    reason = `${SeverityMap[severity].label}: ${utilPercentage}% of requested`
  }

  return { severity, reason, value }
}
