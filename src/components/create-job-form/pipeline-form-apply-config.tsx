import {
  Button,
  Checkbox,
  CircularProgress,
  List,
  Typography,
} from '@equinor/eds-core-react';
import { type FormEvent, useState } from 'react';
import { useTriggerPipelineApplyConfigMutation } from '../../store/radix-api';
import { getFetchErrorMessage } from '../../store/utils';
import { Alert } from '../alert';
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster';
import type { FormProp } from './index';

export function PipelineFormApplyConfig({ application, onSuccess }: FormProp) {
  const [trigger, state] = useTriggerPipelineApplyConfigMutation();
  const [deployExternalDNS, setDeployExternalDNS] = useState(false);

  const handleSubmit = handlePromiseWithToast(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const response = await trigger({
        appName: application.name,
        pipelineParametersApplyConfig: {
          deployExternalDNS: deployExternalDNS,
        },
      }).unwrap();
      onSuccess(response.name);
    }
  );

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
            Apply Radix config
          </Typography>
          <List className="grid grid--gap-x-small">
            <List.Item>
              Apply changes in DNS alias, build secrets, environments (create
              new or soft-delete existing)
            </List.Item>
            <List.Item>
              <Checkbox
                label="Deploy External DNS-es"
                name="deployExternalDNS"
                checked={deployExternalDNS}
                onChange={() => setDeployExternalDNS(!deployExternalDNS)}
              />
            </List.Item>
          </List>
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
            <Button type="submit">Create job</Button>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
