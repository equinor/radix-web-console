import type { Step } from '../../../../../store/radix-api'
import { getPipelineStepDescription, PipelineStep } from '../../../../../utils/pipeline'

const MAX_ENUMERATED_COMPONENTS = 3

const formatComponents = (name: string, components: string[]): string => {
  if (components?.length > 1) {
    return components.length > MAX_ENUMERATED_COMPONENTS
      ? `${components.slice(0, MAX_ENUMERATED_COMPONENTS - 1).join(',')}…`
      : `${components.slice(0, -1).join(',')} and ${components.slice(-1)}`
  }

  return name
}

interface PipelineJobStepDescriptionProps {
  readonly name?: string
  readonly components: Step['components']
}

export const PipelineJobStepDescription = (props: PipelineJobStepDescriptionProps) => {
  const { name, components } = props

  const stepDescription = getPipelineStepDescription(name)
  if (stepDescription) {
    return <>{stepDescription}</>
  }

  if (name === PipelineStep.CloneRepository) {
    return (
      <>
        Cloning repository
        {components?.length === 1 && (
          <>
            {' for '} <strong>{components[0]}</strong>
            {' component'}
          </>
        )}
      </>
    )
  }

  const buildComponent = /^build-(.+)$/.exec(name ?? '')
  if (buildComponent) {
    return (
      <>
        Building <strong>{formatComponents(buildComponent[1], components ?? [])}</strong> component
      </>
    )
  }

  const scanComponent = /^scan-(.+)$/.exec(name ?? '')
  if (scanComponent) {
    return (
      <>
        Scanning <strong>{formatComponents(scanComponent[1], components ?? [])}</strong> component
      </>
    )
  }

  return <>Unknown step</>
}
