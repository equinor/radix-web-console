import type { JobSummary, Step } from '../../store/radix-api'
import { dataSorter, sortCompareDate } from '../sort-utils'

// TODO: Remove this enum when radix-api with step type is deployed to all clusters, https://github.com/equinor/radix-operator/issues/2033
export enum PipelineStep {
  CloneConfig = 'clone-config',
  CloneRepository = 'clone',
  OrchestratePipeline = 'radix-pipeline',
  BuildComponent = 'build',
  SubPipelineTaskStep = 'sub-pipeline-step',
}

export function getPipelineStepTitle(step: Step): string {
  if (!step.type) {
    return getPipelineStepTitleFromName(step.name)
  }

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

// Helper function to get the pipeline step title based on the step name when the step type is not defined.
// TODO: Remove this function when radix-api with step type is deployed to all clusters, ref https://github.com/equinor/radix-operator/issues/2033
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

/** The most recently created pipeline job, or undefined when there are none. Does not mutate the input. */
export function getLatestPipelineJob(jobs?: ReadonlyArray<JobSummary>): JobSummary | undefined {
  return dataSorter(jobs, [(left, right) => sortCompareDate(left.created, right.created, 'descending')])[0]
}
