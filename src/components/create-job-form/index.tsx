import { NativeSelect, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import {
  ComponentProps,
  FunctionComponent,
  PropsWithChildren,
  useState,
} from 'react';

import { PipelineFormPromote } from './pipeline-form-promote';

import './style.css';
import { PipelineFormBuildBranches } from './pipeline-form-build-branches';
import { useSearchParams } from 'react-router-dom';

export interface CreateJobFormProps {
  appName: string;
  onSuccess: (jobbName: string) => void;
}

type SupportedPipelineNames =
  | ComponentProps<typeof PipelineFormBuildBranches>['pipelineName']
  | ComponentProps<typeof PipelineFormPromote>['pipelineName'];

export type FormProp = PropsWithChildren<{
  appName: string;
  onSuccess: (jobName: string) => void;
  pipelineName: string;
}>;

const Pipelines = {
  build: PipelineFormBuildBranches,
  'build-deploy': PipelineFormBuildBranches,
  promote: PipelineFormPromote,
} satisfies Record<SupportedPipelineNames, FunctionComponent<FormProp>>;

export default function CreateJobForm({
  appName,
  onSuccess,
}: CreateJobFormProps) {
  const [searchParams] = useSearchParams();
  const [pipeline, setPipeline] = useState<SupportedPipelineNames>(() => {
    const urlPipeline = searchParams.get('pipeline');
    if (Object.keys(Pipelines).includes(urlPipeline)) {
      return urlPipeline as SupportedPipelineNames;
    }

    return 'build-deploy';
  });

  const PipelineForm = Pipelines[pipeline];

  return (
    <PipelineForm
      onSuccess={onSuccess}
      appName={appName}
      pipelineName={pipeline}
    >
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
        onChange={(e) => setPipeline(e.target.value as SupportedPipelineNames)}
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
    </PipelineForm>
  );
}
CreateJobForm.propTypes = {
  appName: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
