import type { Application } from '../../store/radix-api'

export type SupportedPipelineNames = 'build' | 'build-deploy' | 'promote' | 'deploy' | 'apply-config'

export type FormProp = {
  application: Application
  onSuccess: (jobName: string) => void
  pipelineName: SupportedPipelineNames
}
