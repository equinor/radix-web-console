import {
  Button,
  Checkbox,
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
  type PipelineParametersBuild,
  useTriggerPipelineBuildDeployMutation,
  useTriggerPipelineBuildMutation,
} from '../../store/radix-api';
import { getFetchErrorMessage } from '../../store/utils/parse-errors';
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
  const [buildBranch, setBuildBranch] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [branchFullName, setBranchFullName] = useState('');
  const [toEnvironment, setToEnvironment] = useState('');
  const branches = useGetApplicationBranches(application);
  const hasBranches = Object.keys(branches).length > 0;
  const [filteredBranches, setFilteredBranches] = useState<string[]>([]);
  const useBuildCache =
    application?.useBuildKit === true &&
    (application?.useBuildCache === undefined ||
      application?.useBuildCache === true);
  const [overrideUseBuildCache, setOverrideUseBuildCache] =
    useState<boolean>(useBuildCache);
  const [refreshBuildCache, setRefreshBuildCache] = useState<boolean>(false);

  const handleOnTextChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setBuildBranch(value);
    setBranchFullName(value);
    setToEnvironment('');
    const cleanRegex = (val: string): string => {
      switch (val) {
        case '*':
          return '.*';
        case '':
          return '^$';
      }
      return val;
    };
    const cleanBranch = (val: string): string => {
      return val.replace(/\*{2,}/g, '*');
    };
    const cleanedBranches = Object.entries(branches).map(([key, value]) => [
      cleanBranch(key),
      value,
    ]);

    const filter = cleanedBranches.filter(([key]) => {
      if (typeof key === 'string') {
        try {
          const regExp = new RegExp(cleanRegex(key));
          return regExp.test(buildBranch);
        } catch (e) {
          console.error(
            `Error processing branch regex template: ${key} for the value: ${buildBranch}`,
            e
          );
          return false;
        }
      }
      return false;
    });

    const values = uniq(filter.flatMap(([, envs]) => envs));
    setFilteredBranches(values);
  };
  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    setBuildBranch(value);
    setSelectedBranch(value);
    setBranchFullName(value);
  };

  const handleSubmit = handlePromiseWithToast(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const pipelineParametersBuild: PipelineParametersBuild = {
        branch: buildBranch,
        toEnvironment,
      };
      if (application.useBuildKit) {
        if (useBuildCache != overrideUseBuildCache) {
          pipelineParametersBuild.overrideUseBuildCache = overrideUseBuildCache;
        }
        pipelineParametersBuild.refreshBuildCache = refreshBuildCache;
      }
      const body = {
        appName: application.name,
        pipelineParametersBuild: pipelineParametersBuild,
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
    const b = pattern.length > 0 && /[\^$.*+?()[\]{}|\\]/.test(pattern);
    return b;
  };
  const isValidBranchName = (branch: string): boolean => {
    const b = branch.length > 0 && !/[\^$*+?()[\]{}|\\]/.test(branch);
    return b;
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
            <NativeSelect id="BranchSelect" label="" onChange={handleChange}>
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
            {!isAnyValidRegex(buildBranch) &&
              buildBranch &&
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
                      All environments build from the branch {buildBranch}
                    </option>
                    {filteredBranches?.map((envName) => (
                      <option key={envName} value={envName}>
                        {envName}
                      </option>
                    ))}
                  </NativeSelect>
                </div>
              )}
            {isBuildDeployPipeline &&
              buildBranch &&
              !isAnyValidRegex(buildBranch) && (
                <TargetEnvs
                  targetEnvs={
                    toEnvironment ? [toEnvironment] : filteredBranches
                  }
                  branch={buildBranch}
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
        {application.useBuildKit && (
          <>
            <Typography
              group="input"
              variant="text"
              token={{ color: 'currentColor' }}
            >
              Build Kit enabled
            </Typography>
            <div>
              <Checkbox
                label="Use Build Cache"
                name="overrideUseBuildCache"
                checked={overrideUseBuildCache}
                onChange={() =>
                  setOverrideUseBuildCache(!overrideUseBuildCache)
                }
              />
            </div>
            <Checkbox
              label="Refresh Build Cache"
              name="refreshBuildCache"
              checked={refreshBuildCache}
              onChange={() => setRefreshBuildCache(!refreshBuildCache)}
            />
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
            <Button type="submit" disabled={!isValidBranchName(buildBranch)}>
              Create job
            </Button>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
