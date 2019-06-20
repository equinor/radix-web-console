import PropTypes from 'prop-types';
import React from 'react';

import FormField from '../form-field';

const TargetEnvs = ({ branch, branches }) => {
  if (!branch) {
    return null;
  }

  const targetEnvs = branches[branch];

  if (targetEnvs.length === 1) {
    return (
      <React.Fragment>
        <code>{targetEnvs[0]}</code> environment
      </React.Fragment>
    );
  }

  const penultimateIdx = targetEnvs.length - 2;

  return (
    <React.Fragment>
      {targetEnvs.map((env, idx) => (
        <React.Fragment key={env}>
          <code>{env}</code>
          {idx < penultimateIdx ? ', ' : ''}
          {idx === penultimateIdx ? ' and ' : ''}
        </React.Fragment>
      ))}{' '}
      environments
    </React.Fragment>
  );
};

export const PipelineFormBuildDeploy = ({ onChange, branch, branches }) => {
  const handleChange = ev => {
    onChange({ branch: ev.target.value }, ev.target.value !== '');
  };
  return (
    <FormField label="Git branch to build">
      <select value={branch} onChange={handleChange}>
        <option value="">— Please select —</option>
        {Object.keys(branches).map(branch => (
          <option key={branch} value={branch}>
            {branch}
          </option>
        ))}
      </select>
      {branch && (
        <p>
          Branch <code>{branch}</code> will be deployed to{' '}
          <TargetEnvs branch={branch} branches={branches} />
        </p>
      )}
    </FormField>
  );
};

PipelineFormBuildDeploy.propTypes = {
  onChange: PropTypes.func.isRequired,
  branch: PropTypes.string,
  branches: PropTypes.object.isRequired,
};

export default PipelineFormBuildDeploy;
