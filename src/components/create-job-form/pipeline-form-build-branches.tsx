import {
  Button,
  CircularProgress,
  NativeSelect,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import { type ChangeEvent, type FormEvent, useState } from 'react';
import {
  useTriggerPipelineBuildDeployMutation,
  useTriggerPipelineBuildMutation,
} from '../../store/radix-api';
import { getFetchErrorMessage } from '../../store/utils';
import { Alert } from '../alert';
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster';
import type { FormProp } from './index';
import { TargetEnvs } from './target-envs';
import { useGetApplicationBranches } from './use-get-application-branches';

export function PipelineFormBuildBranches({
  children,
  onSuccess,
  appName,
  pipelineName,
}: FormProp) {
  const [triggerBuild, buildState] = useTriggerPipelineBuildMutation();
  const [triggerBuildDeploy, buildDeployState] =
    useTriggerPipelineBuildDeployMutation();

  const state = pipelineName === 'build-deploy' ? buildDeployState : buildState;

  const [branch, setBranch] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [branchFullName, setBranchFullName] = useState('');
  const [toEnvironment, setToEnvironment] = useState('');
  const branches = useGetApplicationBranches(appName);
  const [filteredBranches, setFilteredBranches] = useState([]);

  const handleOnTextChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setBranch(value);
    setBranchFullName(value);
    setToEnvironment('');
    const cleanRegex = (val: string): string => {
      switch (val) {
        case '*':
          return '.+';
        case '':
          return '^$';
      }
      return val;
    };
    const values = Array.from(
      new Set(
        Object.entries(branches)
          .filter(([key]) => new RegExp(cleanRegex(key)).test(value))
          .flatMap(([, commits]) => commits)
      )
    );
    setFilteredBranches(values);
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
        pipelineParametersBuild: { branch, toEnvironment },
      };
      let jobName: string;
      if (pipelineName === 'build-deploy') {
        jobName = (await triggerBuildDeploy(body).unwrap()).name;
      } else {
        jobName = (await triggerBuild(body).unwrap()).name;
      }
      onSuccess(jobName);
    },
    `Created ${pipelineName} pipeline job`
  );
  const isAnyValidRegex = (pattern: string): boolean => {
    return pattern && /[\^$.*+?()[\]{}|\\]/.test(pattern);
  };
  const isValidBranchName = (branch: string): boolean => {
    return branch && !/[\^$*+?()[\]{}|\\]/.test(branch);
  };
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
            <>
              <Typography
                group="input"
                variant="text"
                token={{ color: 'currentColor' }}
              >
                Git branch full name
              </Typography>
              <fieldset>
                <TextField
                  id="branch_full_name_field"
                  helperText={`Pattern: ${selectedBranch}`}
                  name="branchFullName"
                  value={branchFullName}
                  onChange={handleOnTextChange}
                />
              </fieldset>
            </>
          )}
          {!isAnyValidRegex(branch) &&
            branch &&
            filteredBranches?.length > 0 && (
              <div className="grid grid--gap-small input">
                <Typography
                  group="input"
                  variant="text"
                  token={{ color: 'currentColor' }}
                >
                  Environment (optional)
                </Typography>
                <NativeSelect
                  id="ToEnvironmentSelect"
                  label=""
                  name="toEnvironment"
                  onChange={(e) => setToEnvironment(e.target.value)}
                  value={toEnvironment}
                >
                  <option value="">
                    All environments build from the branch {branch}
                  </option>
                  {filteredBranches?.map((envName) => (
                    <option key={envName} value={envName}>
                      {envName}
                    </option>
                  ))}
                </NativeSelect>
              </div>
            )}
          {pipelineName === 'build-deploy' &&
            branch &&
            !isAnyValidRegex(branch) && (
              <TargetEnvs
                targetEnvs={toEnvironment ? [toEnvironment] : filteredBranches}
                branch={branch}
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
  );
}
