import {
  Button,
  CircularProgress,
  NativeSelect,
  TextField,
  Typography,
} from '@equinor/eds-core-react'
import { type ChangeEvent, type FormEvent, useState } from 'react'
import {
  useTriggerPipelineBuildDeployMutation,
  useTriggerPipelineBuildMutation,
} from '../../store/radix-api'
import { getFetchErrorMessage } from '../../store/utils'
import { Alert } from '../alert'
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster'
import type { FormProp } from './index'
import { TargetEnvs } from './target-envs'
import { useGetApplicationBranches } from './use-get-application-branches'

export function PipelineFormBuildBranches({
  children,
  onSuccess,
  appName,
  pipelineName,
}: FormProp) {
  const [triggerBuild, buildState] = useTriggerPipelineBuildMutation()
  const [triggerBuildDeploy, buildDeployState] =
    useTriggerPipelineBuildDeployMutation()

  const state = pipelineName === 'build-deploy' ? buildDeployState : buildState

  const [branch, setBranch] = useState('')
  const [selectedBranch, setSelectedBranch] = useState('')
  const [branchFullName, setBranchFullName] = useState('')
  const branches = useGetApplicationBranches(appName)

  const handleOnTextChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setBranch(value)
    setBranchFullName(value)
  }
  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    setBranch(value)
    setSelectedBranch(value)
    setBranchFullName(value)
  }

  const handleSubmit = handlePromiseWithToast(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const body = {
        appName,
        pipelineParametersBuild: { branch },
      }
      let jobName = ''
      if (pipelineName === 'build-deploy') {
        jobName = (await triggerBuildDeploy(body).unwrap()).name
      } else {
        jobName = (await triggerBuild(body).unwrap()).name
      }
      onSuccess(jobName)
    },
    `Created ${pipelineName} pipeline job`
  )
  const isAnyValidRegex = (pattern: string): boolean => {
    return pattern && /[\^$.*+?()[\]{}|\\]/.test(pattern)
  }
  const isValidBranchName = (branch: string): boolean => {
    return branch && !/[\^$*+?()[\]{}|\\]/.test(branch)
  }
  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={state.isLoading} className="grid grid--gap-medium">
        <div className="grid grid--gap-small input">
          {children}
          <Typography
            className="input-label"
            as="span"
            group="navigation"
            variant="label"
            token={{ color: 'currentColor' }}
          >
            Build (but do not deploy) a git branch
          </Typography>
          <Typography
            group="input"
            variant="text"
            token={{ color: 'currentColor' }}
          >
            Git branch to build
          </Typography>
          <NativeSelect id="BranchSelect" label="" onChange={handleChange}>
            <option value="">— Please select —</option>
            {Object.keys(branches ?? {}).map((branch, i) => (
              <option key={i} value={branch}>
                {branch}
              </option>
            ))}
          </NativeSelect>
          {isAnyValidRegex(selectedBranch) && (
            <fieldset>
              <TextField
                id="branch_full_name_field"
                label="Branch full name"
                helperText={`Pattern: ${selectedBranch}`}
                name="branchFullName"
                value={branchFullName}
                onChange={handleOnTextChange}
              />
            </fieldset>
          )}
          {pipelineName === 'build-deploy' && (
            <TargetEnvs
              branches={branches}
              branch={branch}
              selectedBranch={selectedBranch}
            />
          )}
        </div>

        <div className="o-action-bar">
          {state.isLoading && (
            <div>
              <CircularProgress size={16} /> Creating…
            </div>
          )}
          {state.isError && (
            <Alert type="danger">
              Failed to create job. {getFetchErrorMessage(state.error)}
            </Alert>
          )}
          <div>
            <Button disabled={!isValidBranchName(branch)} type="submit">
              Create job
            </Button>
          </div>
        </div>
      </fieldset>
    </form>
  )
}
