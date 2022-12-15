import * as PropTypes from 'prop-types';

import { PipelineFormChangeEventHandler } from './pipeline-form-types';
import { PipelineParametersBuild } from '../../api/jobs';
import { PipelineFormBuildBrunches } from './pipeline-form-build-branches';

export interface PipelineFormBuildProps {
  onChange: PipelineFormChangeEventHandler<Partial<PipelineParametersBuild>>;
  branch?: string;
  selectedBranch?: string;
  branchFullName?: string;
  branches: Record<string, Array<string>>;
}

export const PipelineFormBuild = (
  props: PipelineFormBuildProps
): JSX.Element => {
  return (
    <PipelineFormBuildBrunches
      onChange={props.onChange}
      branches={props.branches}
      selectedBranch={props.selectedBranch}
      branchFullName={props.branchFullName}
      branch={props.branch}
    ></PipelineFormBuildBrunches>
  );
};

PipelineFormBuild.propTypes = {
  onChange: PropTypes.func.isRequired,
  branch: PropTypes.string,
  branches: PropTypes.object.isRequired,
} as PropTypes.ValidationMap<PipelineFormBuildProps>;
