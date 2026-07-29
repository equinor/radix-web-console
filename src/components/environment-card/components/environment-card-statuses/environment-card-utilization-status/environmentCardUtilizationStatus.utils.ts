import { CPU_THRESHOLDS, MEMORY_THRESHOLDS, SEVERITY_MAP } from './environmentCardUtilizationStatus.const'
import type {
  ReplicaUtilization,
  ReplicaUtilizationResponse,
  Severity,
  SeverityWithReason,
  Thresholds,
} from './environmentCardUtilizationStatus.types'

/** Walks the nested utilization response once into a flat, path-keyed list. */
export const flattenReplicaUtilization = (
  data: ReplicaUtilizationResponse | undefined
): Array<{ key: string; replica: ReplicaUtilization }> =>
  Object.entries(data?.environments ?? {}).flatMap(([envName, environment]) =>
    Object.entries(environment.components ?? {}).flatMap(([compName, component]) =>
      Object.entries(component.replicas ?? {}).map(([replicaName, replica]) => ({
        key: `${envName}.${compName}.${replicaName}`,
        replica,
      }))
    )
  )

/** Extracts the replica utilizations belonging to a single environment. */
export const getEnvironmentReplicas = (
  data: ReplicaUtilizationResponse | undefined,
  environmentName: string
): ReplicaUtilization[] =>
  flattenReplicaUtilization(data)
    .filter(({ key }) => key.startsWith(`${environmentName}.`))
    .map(({ replica }) => replica)

export const getHighestSeverity = (a: SeverityWithReason, b: SeverityWithReason): SeverityWithReason =>
  SEVERITY_MAP[a.severity].rank > SEVERITY_MAP[b.severity].rank ? a : b

export const isSeverityAtLeast = (severity: Severity, minimum: Severity): boolean =>
  SEVERITY_MAP[severity].rank >= SEVERITY_MAP[minimum].rank

const severityForRatio = (ratio: number, { low, high, max }: Thresholds): Severity => {
  if (ratio > max) return 'Critical'
  if (ratio > high) return 'Warning'
  if (ratio < low) return 'Information'
  return 'None'
}

const createSeverityWithReason = (value: number, severity: Severity): SeverityWithReason => {
  const label = SEVERITY_MAP[severity].label

  if (severity === 'None') {
    return { severity, value, reason: label }
  }

  const percentOfRequested = `${(value * 100).toFixed()}% of requested`
  return { severity, value, reason: `${label}: ${percentOfRequested}` }
}

const noAlert = createSeverityWithReason(0, 'None')

const getHighestAlert = (
  replicas: ReplicaUtilization[],
  toRatio: (replica: ReplicaUtilization) => number,
  thresholds: Thresholds
): SeverityWithReason =>
  replicas.reduce((highest, replica) => {
    const ratio = toRatio(replica)
    return getHighestSeverity(createSeverityWithReason(ratio, severityForRatio(ratio, thresholds)), highest)
  }, noAlert)

export const getHighestCPUAlert = (replicas: ReplicaUtilization[]): SeverityWithReason =>
  getHighestAlert(replicas, (replica) => replica.cpuAverage / replica.cpuRequests, CPU_THRESHOLDS)

export const getHighestMemoryAlert = (replicas: ReplicaUtilization[]): SeverityWithReason =>
  getHighestAlert(replicas, (replica) => replica.memoryMaximum / replica.memoryRequests, MEMORY_THRESHOLDS)
