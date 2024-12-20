import {
  Button,
  CircularProgress,
  Icon,
  NativeSelect,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import { uniq } from 'lodash-es';
import { type ChangeEvent, type FormEvent, useState } from 'react';
import {
  useTriggerPipelineBuildDeployMutation,
  useTriggerPipelineBuildMutation,
} from '../../store/radix-api';
import { getFetchErrorMessage } from '../../store/utils';
import { Alert } from '../alert';
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster';
import type { FormProp } from './index';
import { MissingRadixConfigAlert } from './missing-radix-config-alert';
import { TargetEnvs } from './target-envs';
import { useGetApplicationBranches } from './use-get-application-branches';

export function PipelineFormBuildBranches({
  onSuccess,
  application,
  pipelineName,
}: FormProp) {
  const hasEnvironments =
    application.environments && application.environments.length > 0;
  const isBuildDeployPipeline = pipelineName === 'build-deploy';
  const [triggerBuild, buildState] = useTriggerPipelineBuildMutation();
  const [triggerBuildDeploy, buildDeployState] =
    useTriggerPipelineBuildDeployMutation();
  const createJobState = isBuildDeployPipeline ? buildDeployState : buildState;
  const [branch, setBranch] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [branchFullName, setBranchFullName] = useState('');
  const [toEnvironment, setToEnvironment] = useState('');
  const branches = useGetApplicationBranches(application);
  const hasBranches = Object.keys(branches).length > 0;
  const [filteredBranches, setFilteredBranches] = useState<string[]>([]);

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
    const values = uniq(
      Object.entries(branches)
        .filter(([key]) => new RegExp(cleanRegex(key)).test(value))
        .flatMap(([, commits]) => commits)
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
        appName: application.name,
        pipelineParametersBuild: { branch, toEnvironment },
      };
      let jobName: string;
      if (isBuildDeployPipeline) {
        jobName = (await triggerBuildDeploy(body).unwrap()).name;
      } else {
        jobName = (await triggerBuild(body).unwrap()).name;
      }
      onSuccess(jobName);
    },
    `Created ${pipelineName} pipeline job`
  );
  const isAnyValidRegex = (pattern: string): boolean => {
    return pattern.length > 0 && /[\^$.*+?()[\]{}|\\]/.test(pattern);
  };
  const isValidBranchName = (branch: string): boolean => {
    return branch.length > 0 && !/[\^$*+?()[\]{}|\\]/.test(branch);
  };
  return (
    <form onSubmit={handleSubmit}>
      <fieldset
        disabled={createJobState.isLoading}
        className="grid grid--gap-medium"
      >
        {hasEnvironments && hasBranches ? (
          <div className="grid grid--gap-small input">
            <Typography
              className="input-label"
              as="span"
              group="navigation"
              variant="label"
              token={{ color: 'currentColor' }}
            >
              {isBuildDeployPipeline ? (
                <>Build and deploy a git branch</>
              ) : (
                <>Build (but do not deploy) a git branch</>
              )}
            </Typography>
            <Typography
              group="input"
              variant="text"
              token={{ color: 'currentColor' }}
            >
              Git branch to build
            </Typography>
            <NativeSelect
              value={branch}
              id="BranchSelect"
              label=""
              onChange={handleChange}
            >
              <option hidden value="">
                — Please select —
              </option>
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
            {isBuildDeployPipeline && branch && !isAnyValidRegex(branch) && (
              <TargetEnvs
                targetEnvs={toEnvironment ? [toEnvironment] : filteredBranches}
                branch={branch}
              />
            )}
          </div>
        ) : (
          <>
            {!hasEnvironments ? (
              <MissingRadixConfigAlert application={application} />
            ) : (
              <>
                {!hasBranches && (
                  <Alert className="icon">
                    <Icon data={info_circle} color="primary" />
                    <div>
                      <Typography>
                        No environments are configured to be built by Radix.
                      </Typography>
                    </div>
                  </Alert>
                )}
              </>
            )}
          </>
        )}

        <div className="o-action-bar">
          {createJobState.isLoading && (
            <div>
              <CircularProgress size={16} /> Creating…
            </div>
          )}
          {createJobState.isError && (
            <Alert type="danger">
              Failed to create job. {getFetchErrorMessage(createJobState.error)}
            </Alert>
          )}
          <div>
            <Button type="submit" disabled={!isValidBranchName(branch)}>
              Create job
            </Button>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
