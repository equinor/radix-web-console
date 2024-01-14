import { NativeSelect, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent, ReactNode, useState } from 'react';

import { PipelineFormPromote } from './pipeline-form-promote';

import './style.css';
import { PipelineFormBuildBranches } from './pipeline-form-build-branches';

export interface CreateJobFormProps {
  appName: string;
  onSuccess: (jobbName: string) => void;
}

type PipelineNames = 'build' | 'build-deploy' | 'promote';
type FormProp = {
  appName: string;
  onSuccess: (jobName: string) => void;
  children: ReactNode;
};

const SupportedPipelineNames = {
  build: PipelineFormBuildBranches,
  'build-deploy': PipelineFormBuildBranches,
  promote: PipelineFormPromote,
} satisfies Record<PipelineNames, FunctionComponent<FormProp>>;

export default function CreateJobForm({
  appName,
  onSuccess,
}: CreateJobFormProps) {
  const [pipeline, setPipeline] = useState<PipelineNames>(() => {
    const url = new URL(document.location.href);
    if (url.searchParams.has('pipeline')) {
      const urlPipeline = url.searchParams.get('pipeline');
      if (Object.keys(SupportedPipelineNames).includes(urlPipeline)) {
        return urlPipeline as PipelineNames;
      }
    }

    return 'build-deploy';
  });

  const PipelineForm = SupportedPipelineNames[pipeline];

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
        onChange={(e) => setPipeline(e.target.value as PipelineNames)}
      >
        <option disabled value="">
          — Please select —
        </option>
        {Object.keys(SupportedPipelineNames).map((pipeline) => (
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
