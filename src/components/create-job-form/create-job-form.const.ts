import type { ReactNode } from 'react'
import type { FormProp, SupportedPipelineNames } from './create-job-form.types'
import { PipelineFormApplyConfig } from './pipeline-form-apply-config'
import { PipelineFormBuildBranches } from './pipeline-form-build-branches'
import { PipelineFormDeploy } from './pipeline-form-deploy'
import { PipelineFormPromote } from './pipeline-form-promote'

export const PIPELINE_SEARCH_PARAM = 'pipeline'

export const PIPELINE_FORMS = {
  build: PipelineFormBuildBranches,
  'build-deploy': PipelineFormBuildBranches,
  promote: PipelineFormPromote,
  deploy: PipelineFormDeploy,
  'apply-config': PipelineFormApplyConfig,
} as const satisfies Record<SupportedPipelineNames, (props: FormProp) => ReactNode>
