import type { Application } from '../../../../store/radix-api'
import { getLatestPipelineJob } from '../../../../utils/pipeline'
import { useApplyRadixConfig } from '../../hooks/use-apply-radix-config'
import { ApplyConfigPromptPanel } from './ApplyConfigPromptPanel'

interface ApplyConfigPromptPanelContainerProps {
  readonly application: Pick<Application, 'name' | 'registration' | 'jobs'>
}

/** Wires the presentational ApplyConfigPromptPanel to the apply-config mutation and the application's job history. */
export const ApplyConfigPromptPanelContainer = (props: ApplyConfigPromptPanelContainerProps) => {
  const { application } = props
  const { applyConfig, isApplying, applyErrorMessage } = useApplyRadixConfig(application.name)

  return (
    <ApplyConfigPromptPanel
      application={application}
      latestJob={getLatestPipelineJob(application.jobs)}
      onApplyConfig={applyConfig}
      isApplying={isApplying}
      applyErrorMessage={applyErrorMessage}
    />
  )
}
