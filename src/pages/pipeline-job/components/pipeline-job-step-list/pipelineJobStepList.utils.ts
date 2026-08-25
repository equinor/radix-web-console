import {
  build_wrench,
  github,
  type IconData,
  lightbulb,
  pressure,
  radio_button_unselected,
  record,
} from '@equinor/eds-icons'
import type { Step } from '../../../../store/radix-api'
import { PipelineStep } from '../../../../utils/pipeline'
import { sortCompareDate } from '../../../../utils/sort-utils'

const ORCHESTRATION_STEP_NAME = 'radix-pipeline'
const SUB_PIPELINE_STEP_NAME = 'sub-pipeline-step'
const UNSTARTED_STEP_SORT_DATE = new Date('9999-01-01T00:00:00Z')

interface GroupedSubPipelineSteps {
  readonly pipelineName: string
  readonly environment: string
  readonly steps: ReadonlyArray<Step>
}

export const getStepIcon = (name: string): IconData => {
  switch (name) {
    case PipelineStep.CloneConfig:
    case PipelineStep.CloneRepository:
      return github
    case PipelineStep.OrchestratePipeline:
      return pressure
    case PipelineStep.BuildComponent:
      return build_wrench
    case PipelineStep.SubPipelineTaskStep:
      return lightbulb
    default:
      if (name.startsWith('scan-')) {
        return record
      }
      if (name.startsWith('build-')) {
        return build_wrench
      }
      return radio_button_unselected
  }
}

// Orchestration step first, then by start date. sortCompareDate always returns a number.
const compareSteps = (first: Step, second: Step): number => {
  if (first.name === ORCHESTRATION_STEP_NAME) {
    return -1
  }
  if (second.name === ORCHESTRATION_STEP_NAME) {
    return 1
  }
  return sortCompareDate(first.started ?? UNSTARTED_STEP_SORT_DATE, second.started ?? UNSTARTED_STEP_SORT_DATE)
}

export const getNamedSteps = (steps: ReadonlyArray<Step>): ReadonlyArray<Step> => {
  return steps.filter((step) => !!step.name && step.name !== SUB_PIPELINE_STEP_NAME).sort(compareSteps)
}

export const getSubPipelineSteps = (steps: ReadonlyArray<Step>): ReadonlyArray<GroupedSubPipelineSteps> => {
  const groups: Record<string, { pipelineName: string; environment: string; steps: Step[] }> = {}

  for (const step of steps.filter((step) => step.name === SUB_PIPELINE_STEP_NAME)) {
    const sub = step.subPipelineTaskStep
    if (!sub) {
      continue
    }

    const key = `${sub.pipelineName}||${sub.environment}`
    if (!groups[key]) {
      groups[key] = { pipelineName: sub.pipelineName, environment: sub.environment, steps: [] }
    }
    groups[key].steps.push(step)
  }

  for (const key in groups) {
    groups[key].steps.sort((firstStep, secondStep) => {
      const firstStart = firstStep.started ? new Date(firstStep.started).getTime() : 0
      const secondStart = secondStep.started ? new Date(secondStep.started).getTime() : 0
      return firstStart - secondStart
    })
  }

  return Object.values(groups).sort((firstGroup, secondGroup) => {
    const byPipelineName = firstGroup.pipelineName.localeCompare(secondGroup.pipelineName)
    return byPipelineName !== 0 ? byPipelineName : firstGroup.environment.localeCompare(secondGroup.environment)
  })
}

export const getStepKey = (step: Step): string => {
  let key = `${step.name}`
  if (step.components) {
    key += `-${step.components.join('-')}`
  }

  const sub = step.subPipelineTaskStep
  if (sub) {
    key += `-${sub.pipelineName}-${sub.environment}-${sub.taskName}-${sub.name}`
  }
  return key
}
