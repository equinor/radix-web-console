import type { Step } from '../../store/radix-api'

export function getPipelineStepTitle(step: Step): string {
  switch (step.type) {
    case 'CloneConfig':
      return 'Cloning Radix Config'
    case 'PipelineRunner':
      return 'Orchestrating Pipeline'
    case 'Clone':
      return 'Cloning Repository'
    case 'Build':
      return 'Building'
    default:
      return 'Unknown Step'
  }
}
