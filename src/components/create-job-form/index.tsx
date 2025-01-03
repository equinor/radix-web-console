import { NativeSelect, Typography } from '@equinor/eds-core-react';
import { type FunctionComponent, useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';
import { pollingInterval } from '../../store/defaults';
import {
  type Application,
  useGetApplicationQuery,
} from '../../store/radix-api';
import { PipelineFormApplyConfig } from './pipeline-form-apply-config';
import { PipelineFormBuildBranches } from './pipeline-form-build-branches';
import { PipelineFormDeploy } from './pipeline-form-deploy';
import { PipelineFormPromote } from './pipeline-form-promote';
import { useGetApplicationBranches } from './use-get-application-branches';
import './style.css';
import AsyncResource from '../async-resource/async-resource';

export type FormProp = {
  application: Application;
  onSuccess: (jobName: string) => void;
  pipelineName: string;
};

const Pipelines = {
  build: PipelineFormBuildBranches,
  'build-deploy': PipelineFormBuildBranches,
  promote: PipelineFormPromote,
  deploy: PipelineFormDeploy,
  'apply-config': PipelineFormApplyConfig,
} satisfies Record<string, FunctionComponent<FormProp>>;

type SupportedPipelineNames = keyof typeof Pipelines;

const pipelineSearchParam = 'pipeline';

export interface CreateJobFormProps {
  appName: string;
  onSuccess: (jobName: string) => void;
}
export default function CreateJobForm({
  appName,
  onSuccess,
}: CreateJobFormProps) {
  const { data: application, ...appState } = useGetApplicationQuery(
    { appName },
    { pollingInterval }
  );
  const hasEnvironments = application?.environments?.length;
  const buildBranches = useGetApplicationBranches(application);
  const hasBuildBranches = Object.keys(buildBranches).length > 0;
  const [searchParams, setSearchParams] = useSearchParams();
  const setPipelineType = (pipeline: string) =>
    setSearchParams((prev) => {
      prev.set(pipelineSearchParam, pipeline);
      return prev;
    });

  const pipeline = useMemo(() => {
    const urlPipeline = searchParams.get(pipelineSearchParam);
    if (urlPipeline && Object.keys(Pipelines).includes(urlPipeline)) {
      return urlPipeline as SupportedPipelineNames;
    }

    return (
      !hasEnvironments ? 'apply-config' : hasBuildBranches ? 'build-deploy' : ''
    ) as SupportedPipelineNames;
  }, [searchParams, hasEnvironments, hasBuildBranches]);

  const PipelineForm = Pipelines[pipeline];

  return (
    <AsyncResource asyncState={appState}>
      <Typography
        group="input"
        variant="text"
        token={{ color: 'currentColor' }}
      >
        Pipeline
      </Typography>
      <NativeSelect
        id="PipelineNameSelect"
        label=""
        value={pipeline}
        onChange={(e) => setPipelineType(e.target.value)}
      >
        <option hidden value="">
          — Please select —
        </option>
        {Object.keys(Pipelines).map((pipeline) => (
          <option value={pipeline} key={pipeline}>
            {pipeline}
          </option>
        ))}
      </NativeSelect>
      {PipelineForm && application && (
        <PipelineForm
          onSuccess={onSuccess}
          application={application}
          pipelineName={pipeline}
        />
      )}
    </AsyncResource>
  );
}
