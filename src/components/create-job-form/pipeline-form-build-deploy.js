import { NativeSelect } from '@equinor/eds-core-react';
import PropTypes from 'prop-types';
import React from 'react';

import FormField from '../form-field';

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
    <FormField label="Git branch to build">
      <NativeSelect value={branch} onChange={handleChange}>
        <option value="">— Please select —</option>
        {Object.keys(branches).map((branch) => (
          <option key={branch} value={branch}>
            {branch}
          </option>
        ))}
      </NativeSelect>
      {branch && (
        <p>
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
