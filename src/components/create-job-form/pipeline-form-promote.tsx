import { Button, CircularProgress, NativeSelect, Typography } from '@equinor/eds-core-react'
import { type FormEvent, useId, useState } from 'react'
import { useSearchParams } from 'react-router'

import { pollingInterval } from '../../store/defaults'
import {
  type DeploymentSummary,
  useGetDeploymentsQuery,
  useTriggerPipelinePromoteMutation,
} from '../../store/radix-api'
import { getFetchErrorMessage } from '../../store/utils/parse-errors'
import { Alert } from '../alert'
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster'
import { RelativeToNow } from '../time/relative-to-now'
import type { FormProp } from './index'
import { MissingRadixConfigAlert } from './missing-radix-config-alert'
import { getDeploymentOptionLabel, groupDeploymentsByEnvironment } from './pipeline-form-promote.utils'

const DeploymentActiveStatus = (props: { deployment: DeploymentSummary }) => {
  const { deployment } = props

  return (
    <Typography
      className="input input-label"
      as="span"
      group="navigation"
      variant="label"
      token={{ color: 'currentColor' }}
    >
      Active {deployment.activeTo ? 'from' : 'since'} <RelativeToNow time={deployment.activeFrom} />{' '}
      {deployment.activeTo && (
        <>
          to <RelativeToNow time={deployment.activeTo} />{' '}
        </>
      )}
      on environment {deployment.environment}
    </Typography>
  )
}

export const PipelineFormPromote = (props: FormProp) => {
  const { application, onSuccess } = props
  const [searchParams] = useSearchParams()
  const [trigger, state] = useTriggerPipelinePromoteMutation()
  const { data: deployments } = useGetDeploymentsQuery({ appName: application.name }, { pollingInterval })
  const [toEnvironment, setToEnvironment] = useState('')
  const [deploymentName, setDeploymentName] = useState(searchParams.get('deploymentName') ?? '')
  const deploymentNameSelectId = useId()
  const toEnvironmentSelectId = useId()

  const hasEnvironments = !!application.environments && application.environments.length > 0
  const selectedDeployment = deployments?.find((deployment) => deployment.name === deploymentName)
  const fromEnvironment = selectedDeployment?.environment
  const deploymentsByEnvironment = groupDeploymentsByEnvironment(deployments ?? [])
  const isValid = !!(toEnvironment && deploymentName && fromEnvironment)

  const handleSubmit = handlePromiseWithToast(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const response = await trigger({
      appName: application.name,
      pipelineParametersPromote: { toEnvironment, deploymentName, fromEnvironment },
    }).unwrap()
    onSuccess(response.name)
  })

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={state.isLoading} className="grid grid--gap-medium">
        {hasEnvironments ? (
          <div className="grid grid--gap-small input">
            <Typography
              className="input-label"
              as="span"
              group="navigation"
              variant="label"
              token={{ color: 'currentColor' }}
            >
              Promote an existing deployment to an environment
            </Typography>
            <Typography group="input" variant="text" token={{ color: 'currentColor' }}>
              Deployment to promote
            </Typography>
            <NativeSelect
              id={deploymentNameSelectId}
              label=""
              onChange={(event) => setDeploymentName(event.target.value)}
              name="deploymentName"
              value={deploymentName}
            >
              <option hidden value="">
                — Please select —
              </option>
              {Object.entries(deploymentsByEnvironment).map(([environment, environmentDeployments]) => (
                <optgroup key={environment} label={environment}>
                  {environmentDeployments.map((deployment) => (
                    <option key={deployment.name} value={deployment.name}>
                      {getDeploymentOptionLabel(deployment)}
                    </option>
                  ))}
                </optgroup>
              ))}
            </NativeSelect>

            {selectedDeployment && <DeploymentActiveStatus deployment={selectedDeployment} />}

            <Typography group="input" variant="text" token={{ color: 'currentColor' }}>
              Target environment
            </Typography>
            <NativeSelect
              id={toEnvironmentSelectId}
              label=""
              name="toEnvironment"
              onChange={(event) => setToEnvironment(event.target.value)}
              value={toEnvironment}
            >
              <option hidden value="">
                — Please select —
              </option>
              {application.environments?.map((environment) => (
                <option
                  key={environment.name}
                  value={environment.name}
                  disabled={environment.activeDeployment?.name === deploymentName}
                >
                  {environment.name}
                </option>
              ))}
            </NativeSelect>
          </div>
        ) : (
          <MissingRadixConfigAlert application={application} />
        )}
        <div className="o-action-bar">
          {state.isLoading && (
            <div>
              <CircularProgress size={16} /> Creating…
            </div>
          )}
          {state.isError && <Alert type="danger">Failed to create job. {getFetchErrorMessage(state.error)}</Alert>}
          <div>
            <Button disabled={!isValid} type="submit">
              Create job
            </Button>
          </div>
        </div>
      </fieldset>
    </form>
  )
}
