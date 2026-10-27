import { NativeSelect, Typography } from '@equinor/eds-core-react'
import { type FunctionComponent, useId, useMemo } from 'react'

import { Navigate, useSearchParams } from 'react-router'
import { hasAppliedRadixConfig } from '../../domain/radix-config/radixConfig.utils'
import { routes } from '../../router/routes'
import { pollingInterval } from '../../store/defaults'
import { type Application, useGetApplicationQuery } from '../../store/radix-api'
import { routeWithParams } from '../../utils/string'
import { PipelineFormApplyConfig } from './pipeline-form-apply-config'
import { PipelineFormBuildBranches } from './pipeline-form-build-branches'
import { PipelineFormDeploy } from './pipeline-form-deploy'
import { PipelineFormPromote } from './pipeline-form-promote'
import { useGetApplicationBranches } from './use-get-application-branches'
import './style.css'
import AsyncResource from '../async-resource/async-resource'

export type FormProp = {
  application: Application
  onSuccess: (jobName: string) => void
  pipelineName: string
}

const Pipelines = {
  build: PipelineFormBuildBranches,
  'build-deploy': PipelineFormBuildBranches,
  promote: PipelineFormPromote,
  deploy: PipelineFormDeploy,
  'apply-config': PipelineFormApplyConfig,
} satisfies Record<string, FunctionComponent<FormProp>>

type SupportedPipelineNames = keyof typeof Pipelines

const pipelineSearchParam = 'pipeline'

export interface CreateJobFormProps {
  appName: string
  onSuccess: (jobName: string) => void
}
export default function CreateJobForm({ appName, onSuccess }: CreateJobFormProps) {
  const { data: application, ...appState } = useGetApplicationQuery({ appName }, { pollingInterval })

  const isRadixConfigApplied = application ? hasAppliedRadixConfig(application) : false
  const buildBranches = useGetApplicationBranches(application)
  const hasBuildBranches = Object.keys(buildBranches).length > 0
  const [searchParams, setSearchParams] = useSearchParams()
  const pipelineNameSelectId = useId()

  const setPipelineType = (pipeline: string) =>
    setSearchParams((prev) => {
      prev.set(pipelineSearchParam, pipeline)
      return prev
    })

  const selectedPipelineName = useMemo(() => {
    const urlPipeline = searchParams.get(pipelineSearchParam)
    if (urlPipeline && Object.keys(Pipelines).includes(urlPipeline)) {
      return urlPipeline as SupportedPipelineNames
    }

    if (hasBuildBranches) {
      return 'build-deploy'
    }

    return '' as SupportedPipelineNames
  }, [searchParams, hasBuildBranches])

  const PipelineForm = Pipelines[selectedPipelineName]

  return (
    <AsyncResource asyncState={appState}>
      {application &&
        (isRadixConfigApplied ? (
          <>
            <Typography group="input" variant="text" token={{ color: 'currentColor' }}>
              Pipeline
            </Typography>
            <NativeSelect
              id={pipelineNameSelectId}
              label=""
              value={selectedPipelineName}
              onChange={(e) => setPipelineType(e.target.value)}
            >
              <option hidden value="">
                — Please select —
              </option>
              {Object.keys(Pipelines).map((pipelineName) => (
                <option value={pipelineName} key={pipelineName}>
                  {pipelineName}
                </option>
              ))}
            </NativeSelect>
            {PipelineForm && (
              <PipelineForm onSuccess={onSuccess} application={application} pipelineName={selectedPipelineName} />
            )}
          </>
        ) : (
          <Navigate to={routeWithParams(routes.appJobs, { appName })} replace />
        ))}
    </AsyncResource>
  )
}
