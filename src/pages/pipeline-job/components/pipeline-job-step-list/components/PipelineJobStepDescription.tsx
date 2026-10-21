import type { Step } from '../../../../../store/radix-api'
import { getPipelineStepTitle, PipelineStep } from '../../../../../utils/pipeline'

type StepKind = 'build' | 'clone'

function getStepKind(step: Step): StepKind | undefined {
  return step.type ? getStepKindFromType(step.type) : getStepKindFromName(step.name)
}

function getStepKindFromType(type: NonNullable<Step['type']>): StepKind | undefined {
  switch (type) {
    case 'Build':
      return 'build'
    case 'Clone':
      return 'clone'
    default:
      return undefined
  }
}

// TODO: Remove this function when radix-api with step type is deployed to all clusters
function getStepKindFromName(name: string | undefined): StepKind | undefined {
  if (!name || name === PipelineStep.CloneConfig) {
    return undefined
  }
  if (name.startsWith('build')) {
    return 'build'
  }
  if (name.startsWith('clone')) {
    return 'clone'
  }
  return undefined
}

function getComponentInfo(step: Step, kind: StepKind): string {
  const components = step.components ?? []
  const environments = step.environments ?? []

  if (environments.length > 0) {
    return components.map((component) => `${component} (${environments.join(', ')})`).join(', ')
  }

  if (kind === 'build') {
    const suffix = /^build-(.+)$/.exec(step.name ?? '')?.[1]
    return suffix ?? components.join(', ')
  }

  return components.join(', ')
}

interface PipelineJobStepDescriptionProps {
  readonly step: Step
  readonly components: Step['components']
}

export const PipelineJobStepDescription = ({ step }: PipelineJobStepDescriptionProps) => {
  const stepTitle = getPipelineStepTitle(step)

  const kind = getStepKind(step)
  const info = kind ? getComponentInfo(step, kind) : ''
  if (!info) {
    return <>{stepTitle}</>
  }

  return (
    <>
      {stepTitle} {kind === 'clone' && 'for '}
      <strong>{info}</strong>
    </>
  )
}
