export type Severity = 'None' | 'Information' | 'Warning' | 'Critical'
export type Thresholds = { low: number; high: number; max: number }

export type SeverityWithReason = {
  severity: Severity
  reason: string
  value: number
}
