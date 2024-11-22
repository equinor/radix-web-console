import {
  Button,
  CircularProgress,
  NativeSelect,
  Typography,
} from '@equinor/eds-core-react';
import { type FormEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { pollingInterval } from '../../store/defaults';
import {
  type DeploymentSummary,
  useGetDeploymentsQuery,
  useTriggerPipelinePromoteMutation,
} from '../../store/radix-api';
import { formatDateTime } from '../../utils/datetime';
import { smallDeploymentName, smallGithubCommitHash } from '../../utils/string';
import { RelativeToNow } from '../time/relative-to-now';

import { getFetchErrorMessage } from '../../store/utils';
import { Alert } from '../alert';
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster';
import type { FormProp } from './index';

export function PipelineFormPromote({ application, onSuccess }: FormProp) {
  const [searchParams] = useSearchParams();
  const [trigger, state] = useTriggerPipelinePromoteMutation();
  const { data: deployments } = useGetDeploymentsQuery(
    { appName: application.name },
    { pollingInterval }
  );
  const [toEnvironment, setToEnvironment] = useState('');
  const [deploymentName, setDeploymentName] = useState(
    searchParams.get('deploymentName') ?? ''
  );

  const selectedDeployment = deployments?.find(
    (x) => x.name === deploymentName
  );
  const fromEnvironment = selectedDeployment?.environment;

  const handleSubmit = handlePromiseWithToast(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const response = await trigger({
        appName: application.name,
        pipelineParametersPromote: {
          toEnvironment,
          deploymentName,
          fromEnvironment,
        },
      }).unwrap();
      onSuccess(response.name);
    }
  );

  // Show deployments grouped by environment
  const groupedDeployments = (deployments || []).reduce<
    Record<string, Array<DeploymentSummary>>
  >(
    (obj, x) => ({
      ...obj,
      [x.environment]: [...(obj[x.environment] || []), x],
    }),
    {}
  );

  const isValid = !!(toEnvironment && deploymentName && fromEnvironment);

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={state.isLoading} className="grid grid--gap-medium">
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
          <Typography
            group="input"
            variant="text"
            token={{ color: 'currentColor' }}
          >
            Deployment to promote
          </Typography>
          <NativeSelect
            id="DeploymentNameSelect"
            label=""
            onChange={(e) => setDeploymentName(e.target.value)}
            name="deploymentName"
            value={deploymentName}
          >
            <option hidden value="">
              — Please select —
            </option>
            {Object.keys(groupedDeployments).map((key, i) => (
              <optgroup key={i} label={key}>
                {groupedDeployments[key].map((x, j) => (
                  <option key={j} value={x.name}>
                    {smallDeploymentName(x.name)}{' '}
                    {x.activeTo
                      ? `(${formatDateTime(x.activeFrom)})`
                      : '(currently active)'}
                    {x.gitCommitHash &&
                      ` ${smallGithubCommitHash(x.gitCommitHash)}`}
                    {x.gitTags && `, ${x.gitTags}`}
                  </option>
                ))}
              </optgroup>
            ))}
          </NativeSelect>

          {selectedDeployment && (
            <Typography
              className="input input-label"
              as="span"
              group="navigation"
              variant="label"
              token={{ color: 'currentColor' }}
            >
              Active {selectedDeployment.activeTo ? 'from' : 'since'}{' '}
              <RelativeToNow time={selectedDeployment.activeFrom} />{' '}
              {selectedDeployment.activeTo && (
                <>
                  to <RelativeToNow time={selectedDeployment.activeTo} />{' '}
                </>
              )}
              on environment {selectedDeployment.environment}
            </Typography>
          )}
        </div>

        <div className="grid grid--gap-small input">
          <Typography
            group="input"
            variant="text"
            token={{ color: 'currentColor' }}
          >
            Target environment
          </Typography>
          <NativeSelect
            id="ToEnvironmentSelect"
            label=""
            name="toEnvironment"
            onChange={(e) => setToEnvironment(e.target.value)}
            value={toEnvironment}
          >
            <option hidden value="">
              — Please select —
            </option>
            {application.environments?.map(({ name, activeDeployment }, i) => (
              <option
                key={i}
                value={name}
                disabled={
                  activeDeployment && activeDeployment.name === deploymentName
                }
              >
                {name}
              </option>
            ))}
          </NativeSelect>
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
            <Button disabled={!isValid} type="submit">
              Create job
            </Button>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
