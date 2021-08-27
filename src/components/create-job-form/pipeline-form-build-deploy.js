import { NativeSelect, Typography } from '@equinor/eds-core-react';
import PropTypes from 'prop-types';
import React from 'react';

const TargetEnvs = ({ branch, branches }) => {
  if (!branch) {
    return null;
  }

  const targetEnvs = branches[branch];

  if (targetEnvs) {
    const penultimateIdx = targetEnvs.length - 2;
    const environments =
      targetEnvs.length === 1 ? (
        <React.Fragment>
          <code>{targetEnvs[0]}</code> environment
        </React.Fragment>
      ) : (
        <React.Fragment>
          {targetEnvs.map((env, idx) => (
            <React.Fragment key={env}>
              <code>{env}</code>
              {idx < penultimateIdx ? ', ' : ''}
              {idx === penultimateIdx ? ' and ' : ''}
            </React.Fragment>
          ))}
          environments
        </React.Fragment>
      );
    return (
      <React.Fragment>
        Branch <code>{branch}</code> will be deployed to {environments}
      </React.Fragment>
    );
  } else if (targetEnvs === '' && branch !== '') {
    return (
      <React.Fragment>
        radixconfig.yaml file will be read and deployed from branch{' '}
        <code>{branch}</code> to any environment <code>{branch}</code> is mapped
        to
      </React.Fragment>
    );
  }
};

export const PipelineFormBuildDeploy = ({ onChange, branch, branches }) => {
  const handleChange = (ev) => {
    onChange({ branch: ev.target.value }, ev.target.value !== '');
  };

  return (
    <>
      <div className="grid grid--gap-small input">
        <Typography
          group="input"
          variant="text"
          token={{ color: 'currentColor' }}
        >
          Git branch to build
        </Typography>
        <NativeSelect value={branch} onChange={handleChange}>
          <option value="">— Please select —</option>
          {Object.keys(branches).map((branch) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </NativeSelect>
      </div>
      {branch && (
        <Typography>
          <TargetEnvs branch={branch} branches={branches} />
        </Typography>
      )}
    </>
  );
};

PipelineFormBuildDeploy.propTypes = {
  onChange: PropTypes.func.isRequired,
  branch: PropTypes.string,
  branches: PropTypes.object.isRequired,
};

export default PipelineFormBuildDeploy;
