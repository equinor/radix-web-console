export type EnvironmentStatus = 'Consistent' | 'Running' | 'Starting' | 'Stopped' | 'Warning' | 'Danger'

export interface EnvironmentStatusElements {
  deployment?: EnvironmentStatus
  components?: EnvironmentStatus
  replicas?: EnvironmentStatus
}
