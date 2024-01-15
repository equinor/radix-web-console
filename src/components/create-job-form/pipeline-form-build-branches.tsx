import {
  Button,
  CircularProgress,
  NativeSelect,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import { ChangeEvent, FormEvent, ReactNode, useState } from 'react';
import { TargetEnvs } from './target-envs';
import { Alert } from '../alert';
import {
  useTriggerPipelineBuildDeployMutation,
  useTriggerPipelineBuildMutation,
} from '../../store/radix-api';
import { getFetchErrorMessage } from '../../store/utils';
import { PipelineNames } from '../../api/jobs';
import { useGetApplicationBranches } from './use-get-application-branches';
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster';

interface Props {
  children: ReactNode;
  onSuccess: (jobName: string) => void;
  appName: string;
  pipelineName: PipelineNames;
}

export const PipelineFormBuildBranches = ({
  children,
  onSuccess,
  appName,
  pipelineName,
}: Props) => {
  const [triggerBuild, buildState] = useTriggerPipelineBuildMutation();
  const [triggerBuildDeploy, buildDeployState] =
    useTriggerPipelineBuildDeployMutation();

  const state = pipelineName === 'build-deploy' ? buildDeployState : buildState;

  const [branch, setBranch] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [branchFullName, setBranchFullName] = useState('');
  const branches = useGetApplicationBranches(appName);

  const handleOnTextChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setBranch(value);
    setBranchFullName(value);
  };
  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    setBranch(value);
    setSelectedBranch(value);
    setBranchFullName(value);
  };

  const handleSubmit = handlePromiseWithToast(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const body = {
        appName,
        pipelineParametersBuild: { branch },
      };
      let jobName = '';
      if (pipelineName === 'build-deploy') {
        jobName = (await triggerBuildDeploy(body).unwrap()).name;
      } else {
        jobName = (await triggerBuild(body).unwrap()).name;
      }
      onSuccess(jobName);
    }
  );
  const isValid = branch !== '';

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
            <option disabled value="">
              — Please select —
            </option>
            {Object.keys(branches ?? {}).map((branch, i) => (
              <option key={i} value={branch}>
                {branch}
              </option>
            ))}
          </NativeSelect>
          {(selectedBranch?.includes('*') || selectedBranch?.includes('?')) && (
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
            <Button disabled={!isValid} type="submit">
              Create job
            </Button>
          </div>
        </div>
      </fieldset>
    </form>
  );
};
