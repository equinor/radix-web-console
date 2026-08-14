import type { ReplicaResourcesUtilizationResponse, ReplicaUtilization } from '../../../../store/radix-api'
import { CPU_THRESHOLDS, MEMORY_THRESHOLDS, UTILIZATION_SEVERITY_MAP } from './utilizationStatusPopover.const'
import type { Severity, SeverityWithReason, Thresholds } from './utilizationStatusPopover.types'

type KeyedReplicaUtilization = { key: string; replica: ReplicaUtilization }

/** Flattens the nested environment/component/replica response into a keyed list of replicas. */
const flattenReplicaUtilizations = (data: ReplicaResourcesUtilizationResponse | undefined): KeyedReplicaUtilization[] =>
  Object.entries(data?.environments ?? {}).flatMap(([envName, environment]) =>
    Object.entries(environment.components ?? {}).flatMap(([compName, component]) =>
      Object.entries(component.replicas ?? {}).map(([replicaName, replica]) => ({
        key: `${envName}.${compName}.${replicaName}`,
        replica,
      }))
    )
  )

/** Returns every replica utilization across the whole application. */
export const getApplicationReplicaUtilizations = (
  data: ReplicaResourcesUtilizationResponse | undefined
): ReplicaUtilization[] => flattenReplicaUtilizations(data).map(({ replica }) => replica)

/** Returns the replica utilizations belonging to a single environment. */
export const getEnvironmentReplicaUtilizations = (
  data: ReplicaResourcesUtilizationResponse | undefined,
  environmentName: string
): ReplicaUtilization[] =>
  flattenReplicaUtilizations(data)
    .filter(({ key }) => key.startsWith(`${environmentName}.`))
    .map(({ replica }) => replica)

export const getHighestSeverity = (a: SeverityWithReason, b: SeverityWithReason): SeverityWithReason =>
  UTILIZATION_SEVERITY_MAP[a.severity].rank > UTILIZATION_SEVERITY_MAP[b.severity].rank ? a : b

export const isSeverityAtLeast = (severity: Severity, minimum: Severity): boolean =>
  UTILIZATION_SEVERITY_MAP[severity].rank >= UTILIZATION_SEVERITY_MAP[minimum].rank

const severityForRatio = (ratio: number, { low, high, max }: Thresholds): Severity => {
  if (ratio > max) return 'Critical'
  if (ratio > high) return 'Warning'
  if (ratio < low) return 'Information'
  return 'None'
}

const createSeverityWithReason = (value: number, severity: Severity): SeverityWithReason => {
  const label = UTILIZATION_SEVERITY_MAP[severity].label

  if (severity === 'None') {
    return { severity, value, reason: label }
  }

  const percentOfRequested = `${(value * 100).toFixed()}% of requested`
  return { severity, value, reason: `${label}: ${percentOfRequested}` }
}

const noAlert = createSeverityWithReason(0, 'None')

const getHighestAlert = (
  replicas: ReadonlyArray<ReplicaUtilization>,
  toRatio: (replica: ReplicaUtilization) => number,
  thresholds: Thresholds
): SeverityWithReason =>
  replicas.reduce((highest, replica) => {
    const ratio = toRatio(replica)
    return getHighestSeverity(createSeverityWithReason(ratio, severityForRatio(ratio, thresholds)), highest)
  }, noAlert)

export const getHighestCPUAlert = (replicas: ReadonlyArray<ReplicaUtilization>): SeverityWithReason =>
  getHighestAlert(replicas, (replica) => replica.cpuAverage / replica.cpuRequests, CPU_THRESHOLDS)

export const getHighestMemoryAlert = (replicas: ReadonlyArray<ReplicaUtilization>): SeverityWithReason =>
  getHighestAlert(replicas, (replica) => replica.memoryMaximum / replica.memoryRequests, MEMORY_THRESHOLDS)
