import { PIPELINE_FORMS } from './create-job-form.const'
import type { SupportedPipelineNames } from './create-job-form.types'

export const isSupportedPipelineName = (value: string | null | undefined): value is SupportedPipelineNames =>
  value != null && Object.hasOwn(PIPELINE_FORMS, value)

export const getSelectedPipelineName = (
  urlPipelineName: string | null,
  hasBuildBranches: boolean
): SupportedPipelineNames | undefined => {
  if (isSupportedPipelineName(urlPipelineName)) {
    return urlPipelineName
  }

  return hasBuildBranches ? 'build-deploy' : undefined
}
