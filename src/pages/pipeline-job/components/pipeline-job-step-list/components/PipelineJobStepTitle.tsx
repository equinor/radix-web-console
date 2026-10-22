import type { Step } from '../../../../../store/radix-api'
import { getPipelineStepTitle, PipelineStep } from '../../../../../utils/pipeline'

type StepType = Step['type']

function resolveStepType(step: Step): StepType | undefined {
  return step.type ? step.type : getStepTypeFromName(step.name)
}

// TODO: Remove this function when radix-api with step type is deployed to all clusters, ref https://github.com/equinor/radix-operator/issues/2033
function getStepTypeFromName(name: string): StepType | undefined {
  if (name === PipelineStep.CloneConfig) {
    return undefined
  }
  if (name.startsWith('build')) {
    return 'Build'
  }
  if (name.startsWith('clone')) {
    return 'Clone'
  }
  return undefined
}

function getComponentWithEnvironment(step: Step, kind: StepType): string {
  const components = step.components ?? []
  const environments = step.environments ?? []

  if (environments.length > 0) {
    return components.map((component) => `${component} (${environments.join(', ')})`).join(', ')
  }

  if (kind === 'Build') {
    const suffix = /^build-(.+)$/.exec(step.name)?.[1]
    return suffix ?? components.join(', ')
  }

  return components.join(', ')
}

const getExtendedTitleInfo = (step: Step) => {
  const type = resolveStepType(step)

  return {
    preposition: Type == 'Clone' ? 'for ' : '',
    componentWithEnvironment: Type ? getComponentWithEnvironment(step, Type) : '',
  }
}

const resolveIsBuildOrCloneStep = (step: Step) => {
  const type = resolveStepType(step)
  return Type === 'Build' || Type === 'Clone'
}

interface PipelineJobStepTitleProps {
  readonly step: Pick<Step, 'type' | 'name' | 'components' | 'environments'>
}

export const PipelineJobStepTitle = ({ step }: PipelineJobStepTitleProps) => {
  const stepTitle = getPipelineStepTitle(step)

  const isBuildOrCloneStep = resolveIsBuildOrCloneStep(step)

  if (!isBuildOrCloneStep) {
    return <>{stepTitle}</>
  }

  const extendedTitleInfo = getExtendedTitleInfo(step)

  return (
    <>
      {stepTitle} {extendedTitleInfo.preposition}
      <strong>{extendedTitleInfo.componentWithEnvironment}</strong>
    </>
  )
}
