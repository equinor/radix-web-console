import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Fragment, FunctionComponent } from 'react';

import { PipelineFormBuildBranches } from './pipeline-form-build-branches';
import { PipelineFormChangeEventHandler } from './pipeline-form-types';

import { PipelineParametersBuild } from '../../api/jobs';

export interface PipelineFormBuildDeployProps {
  onChange: PipelineFormChangeEventHandler<Partial<PipelineParametersBuild>>;
  selectedBranch?: string;
  branchFullName?: string;
  branches: Record<string, Array<string>>;
  branch?: string;
}

const TargetEnvs: FunctionComponent<{
  selectedBranch?: string;
  branches: Record<string, Array<string>>;
  branch?: string;
}> = ({ selectedBranch, branches, branch }) => {
  const targetEnvs = branches[selectedBranch] || [];
  const penultimateId = targetEnvs.length - 2;

  return targetEnvs.length > 0 ? (
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
  ) : branch ? (
    <Typography>
      radixconfig.yaml file will be read and deployed from branch{' '}
      <code>{branch}</code> to any environment <code>{branch}</code> is mapped
      to
    </Typography>
  ) : null;
};

export const PipelineFormBuildDeploy: FunctionComponent<
  PipelineFormBuildDeployProps
> = ({ onChange, branchFullName, branch, ...rest }) => (
  <>
    <PipelineFormBuildBranches {...{ onChange, branchFullName, ...rest }} />
    {rest.selectedBranch && <TargetEnvs {...{ branch, ...rest }} />}
  </>
);

PipelineFormBuildDeploy.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedBranch: PropTypes.string,
  branchFullName: PropTypes.string,
  branches: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  branch: PropTypes.string,
};
