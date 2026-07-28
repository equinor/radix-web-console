export type Severity = 'None' | 'Information' | 'Warning' | 'Critical'

export type Thresholds = { low: number; high: number; max: number }

export type SeverityWithReason = {
  severity: Severity
  reason: string
  value: number
}

export type ReplicaUtilization = {
  cpuAverage: number
  cpuRequests: number
  memoryMaximum: number
  memoryRequests: number
}

export type ReplicaUtilizationResponse = {
  environments?: Record<string, { components?: Record<string, { replicas?: Record<string, ReplicaUtilization> }> }>
}
