import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Fragment } from 'react';

import { PipelineFormChangeEventHandler } from './pipeline-form-types';
import { PipelineParametersBuild } from '../../api/jobs';
import { PipelineFormBuildBrunches } from './pipeline-form-build-branches';

export interface PipelineFormBuildDeployProps {
  onChange: PipelineFormChangeEventHandler<Partial<PipelineParametersBuild>>;
  branch?: string;
  selectedBranch?: string;
  branchFullName?: string;
  branches: Record<string, Array<string>>;
}

const TargetEnvs = ({
  selectedBranch,
  branch,
  branches,
}: {
  selectedBranch?: string;
  branch?: string;
  branches: Record<string, Array<string>>;
}): JSX.Element => {
  const targetEnvs = branches[selectedBranch];
  const penultimateId = (targetEnvs?.length ?? 0) - 2;
  return targetEnvs?.length > 0 ? (
    <Typography>
      Branch <code>{branch}</code> will be deployed to{' '}
      {targetEnvs.length === 1 ? (
        <>
          <code>{targetEnvs[0]}</code> environment
        </>
      ) : (
        <>
          {targetEnvs.map((env, i) => (
            <Fragment key={i}>
              <code>{env}</code>
              {i < penultimateId ? ', ' : ''}
              {i === penultimateId ? ' and ' : ''}
            </Fragment>
          ))}
          environments
        </>
      )}
    </Typography>
  ) : !!branch ? (
    <Typography>
      radixconfig.yaml file will be read and deployed from branch{' '}
      <code>{branch}</code> to any environment <code>{branch}</code> is mapped
      to
    </Typography>
  ) : null;
};

export const PipelineFormBuildDeploy = (
  props: PipelineFormBuildDeployProps
): JSX.Element => {
  return (
    <>
      <PipelineFormBuildBrunches
        onChange={props.onChange}
        branches={props.branches}
        selectedBranch={props.selectedBranch}
        branchFullName={props.branchFullName}
        branch={props.branch}
      ></PipelineFormBuildBrunches>
      {props.selectedBranch && (
        <TargetEnvs
          branch={props.branch}
          selectedBranch={props.selectedBranch}
          branches={props.branches}
        />
      )}
    </>
  );
};

PipelineFormBuildDeploy.propTypes = {
  onChange: PropTypes.func.isRequired,
  branch: PropTypes.string,
  branches: PropTypes.object.isRequired,
} as PropTypes.ValidationMap<PipelineFormBuildDeployProps>;
