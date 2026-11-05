import { NativeSelect, Typography } from '@equinor/eds-core-react'
import { useId } from 'react'
import { useSearchParams } from 'react-router'
import type { Application } from '../../store/radix-api'
import { PIPELINE_FORMS, PIPELINE_SEARCH_PARAM } from './create-job-form.const'
import { getSelectedPipelineName, isSupportedPipelineName } from './create-job-form.utils'
import { useGetApplicationBranches } from './use-get-application-branches'

export interface CreateJobFormProps {
  readonly onSuccess: (jobName: string) => void
  readonly application: Application
}

export const CreateJobForm = (props: CreateJobFormProps) => {
  const { onSuccess, application } = props

  const buildBranches = useGetApplicationBranches(application)
  const hasBuildBranches = Object.keys(buildBranches).length > 0
  const [searchParams, setSearchParams] = useSearchParams()
  const pipelineNameSelectId = useId()

  const selectedPipelineName = getSelectedPipelineName(searchParams.get(PIPELINE_SEARCH_PARAM), hasBuildBranches)
  const PipelineForm = selectedPipelineName ? PIPELINE_FORMS[selectedPipelineName] : undefined

  const handlePipelineChange = (value: string) => {
    if (!isSupportedPipelineName(value)) {
      return
    }

    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set(PIPELINE_SEARCH_PARAM, value)
      return next
    })
  }

  return (
    <>
      <Typography group="input" variant="text" token={{ color: 'currentColor' }}>
        Pipeline
      </Typography>
      <NativeSelect
        id={pipelineNameSelectId}
        label=""
        value={selectedPipelineName ?? ''}
        onChange={(event) => handlePipelineChange(event.target.value)}
      >
        <option hidden value="">
          — Please select —
        </option>
        {Object.keys(PIPELINE_FORMS).map((pipelineName) => (
          <option value={pipelineName} key={pipelineName}>
            {pipelineName}
          </option>
        ))}
      </NativeSelect>
      {PipelineForm && selectedPipelineName && (
        <PipelineForm onSuccess={onSuccess} application={application} pipelineName={selectedPipelineName} />
      )}
    </>
  )
}
