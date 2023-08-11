import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import { PipelineFormBuildBranches } from './pipeline-form-build-branches';
import { PipelineFormChangeEventHandler } from './pipeline-form-types';

import { PipelineParametersBuild } from '../../api/jobs';

export interface PipelineFormBuildProps {
  onChange: PipelineFormChangeEventHandler<Partial<PipelineParametersBuild>>;
  selectedBranch?: string;
  branchFullName?: string;
  branches: Record<string, Array<string>>;
}

export const PipelineFormBuild: FunctionComponent<PipelineFormBuildProps> = ({
  onChange,
  selectedBranch,
  branchFullName,
  branches,
}) => (
  <PipelineFormBuildBranches
    {...{ onChange, selectedBranch, branchFullName, branches }}
  />
);

PipelineFormBuild.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedBranch: PropTypes.string,
  branchFullName: PropTypes.string,
  branches: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};
