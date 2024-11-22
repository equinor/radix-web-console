import {
  Button,
  CircularProgress,
  NativeSelect,
  Typography,
} from '@equinor/eds-core-react';
import { type FormEvent, useState } from 'react';
import { useTriggerPipelineDeployMutation } from '../../store/radix-api';

import { getFetchErrorMessage } from '../../store/utils';
import { Alert } from '../alert';
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster';
import type { FormProp } from './index';

export function PipelineFormDeploy({ application, onSuccess }: FormProp) {
  const [trigger, state] = useTriggerPipelineDeployMutation();
  const [toEnvironment, setToEnvironment] = useState('');
  const handleSubmit = handlePromiseWithToast(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const response = await trigger({
        appName: application.name,
        pipelineParametersDeploy: {
          toEnvironment,
        },
      }).unwrap();
      onSuccess(response.name);
    }
  );

  // Show deployments grouped by environment
  const isValid = !!toEnvironment;

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
            Deploy an application
          </Typography>
          <div className="grid grid--gap-small input">
            <Typography
              group="input"
              variant="text"
              token={{ color: 'currentColor' }}
            >
              Environment
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
              {application.environments?.map(({ name }, i) => (
                <option key={i} value={name}>
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
        </div>
      </fieldset>
    </form>
  );
}
