export enum PipelineStep {
  CloneConfig = 'clone-config',
  CloneRepository = 'clone',
  OrchestratePipeline = 'radix-pipeline',
  BuildComponent = 'build',
  SubPipelineTaskStep = 'sub-pipeline-step',
}

export function getPipelineStepDescription(stepName?: string): string | null {
  switch (stepName) {
    case PipelineStep.CloneConfig:
      return 'Cloning Radix config from config branch'
    case PipelineStep.OrchestratePipeline:
      return 'Orchestrating pipeline'
    case PipelineStep.BuildComponent:
      return 'Building component'
    default:
      return null
  }
}

export function getPipelineStepTitle(stepName?: string): string | null {
  switch (stepName) {
    case PipelineStep.CloneConfig:
      return 'Cloning Radix config'
    case PipelineStep.CloneRepository:
      return 'Cloning repository'
    case PipelineStep.OrchestratePipeline:
      return 'Orchestrating pipeline'
    default:
      return null
  }
}
