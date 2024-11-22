import { NativeSelect, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import {
  type ComponentProps,
  type FunctionComponent,
  useCallback,
  useMemo,
} from 'react';

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

export interface CreateJobFormProps {
  appName: string;
  onSuccess: (jobName: string) => void;
}

type SupportedPipelineNames =
  | ComponentProps<typeof PipelineFormBuildBranches>['pipelineName']
  | ComponentProps<typeof PipelineFormPromote>['pipelineName']
  | ComponentProps<typeof PipelineFormApplyConfig>['pipelineName'];

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
} satisfies Record<SupportedPipelineNames, FunctionComponent<FormProp>>;

const pipelineSearchParam = 'pipeline';

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
  const setPipelineType = useCallback(
    (pipeline: string) => {
      setSearchParams((prev) => {
        prev.set(pipelineSearchParam, pipeline);
        return prev;
      });
    },
    [setSearchParams]
  );
  const pipeline = useMemo(() => {
    const urlPipeline = searchParams.get(pipelineSearchParam);
    if (Object.keys(Pipelines).includes(urlPipeline)) {
      return urlPipeline;
    }

    return !hasEnvironments
      ? 'apply-config'
      : hasBuildBranches
        ? 'build-deploy'
        : '';
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
        <option disabled value="">
          — Please select —
        </option>
        {Object.keys(Pipelines).map((pipeline) => (
          <option value={pipeline} key={pipeline}>
            {pipeline}
          </option>
        ))}
      </NativeSelect>
      {PipelineForm && (
        <PipelineForm
          onSuccess={onSuccess}
          application={application}
          pipelineName={pipeline}
        />
      )}
    </AsyncResource>
  );
}
CreateJobForm.propTypes = {
  appName: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
