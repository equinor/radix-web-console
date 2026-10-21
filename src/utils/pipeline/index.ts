import type { Step } from '../../store/radix-api'

// TODO: Remove this enum when radix-api with step type is deployed to all clusters
export enum PipelineStep {
  CloneConfig = 'clone-config',
  CloneRepository = 'clone',
  OrchestratePipeline = 'radix-pipeline',
  BuildComponent = 'build',
  SubPipelineTaskStep = 'sub-pipeline-step',
}

export function getPipelineStepTitle(step: Step): string {
  if (!step.type) {
    return getPipelineStepTitleFromName(step.name ?? '')
  }

  switch (step.type) {
    case 'CloneConfig':
      return 'Cloning Radix Config'
    case 'PipelineRunner':
      return 'Orchestrating Pipeline'
    case 'Clone':
      return 'Cloning Repository'
    case 'Build':
      return 'Building Component'
    default:
      return 'Unknown Step'
  }
}

// Helper function to get the pipeline step title based on the step name when the step type is not defined.
// TODO: Remove this function when radix-api with step type is deployed to all clusters
function getPipelineStepTitleFromName(stepName: string): string {
  switch (stepName) {
    case PipelineStep.CloneConfig:
      return 'Cloning Radix Config'
    case PipelineStep.OrchestratePipeline:
      return 'Orchestrating Pipeline'
  }

  if (stepName.startsWith('build')) {
    return 'Building'
  }

  if (stepName.startsWith('clone')) {
    return 'Cloning Repository'
  }

  return 'Unknown Step'
}
