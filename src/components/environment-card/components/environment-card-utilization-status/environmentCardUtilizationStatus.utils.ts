import { CpuThresholds, MemoryThresholds, SeverityMap } from './environmentCardUtilizationStatus.const'
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

export const getHighestSeverity = (a: SeverityWithReason, b: SeverityWithReason): SeverityWithReason =>
  a.severity > b.severity ? a : b

const severityForRatio = (ratio: number, { low, high, max }: Thresholds): Severity => {
  if (ratio > max) return 'Critical'
  if (ratio > high) return 'Warning'
  if (ratio < low) return 'Information'
  return 'None'
}

const createSeverityWithReason = (value: number, severity: Severity): SeverityWithReason => ({
  severity,
  value,
  reason:
    severity !== 'None'
      ? `${SeverityMap[severity].label}: ${(value * 100).toFixed()}% of requested`
      : SeverityMap[severity].label,
})

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
  getHighestAlert(replicas, (replica) => replica.cpuAverage / replica.cpuRequests, CpuThresholds)

export const getHighestMemoryAlert = (replicas: ReplicaUtilization[]): SeverityWithReason =>
  getHighestAlert(replicas, (replica) => replica.memoryMaximum / replica.memoryRequests, MemoryThresholds)
