import type { Step } from '../../../../../store/radix-api'
import { getPipelineStepTitle } from '../../../../../utils/pipeline'

function getComponentWithEnvironment(step: PipelineJobStepTitleProps['step']): string {
  const components = step.components ?? []
  const environments = step.environments ?? []

  if (environments.length > 0) {
    return components.map((component) => `${component} (${environments.join(', ')})`).join(', ')
  }

  if (step.type === 'Build') {
    const suffix = /^build-(.+)$/.exec(step.name)?.[1]
    return suffix ?? components.join(', ')
  }

  return components.join(', ')
}

const getExtendedTitleInfo = (step: PipelineJobStepTitleProps['step']) => {
  return {
    preposition: step.type == 'Clone' ? 'for ' : '',
    componentWithEnvironment: getComponentWithEnvironment(step),
  }
}

const resolveIsBuildOrCloneStep = (step: PipelineJobStepTitleProps['step']) => {
  return step.type === 'Build' || step.type === 'Clone'
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
