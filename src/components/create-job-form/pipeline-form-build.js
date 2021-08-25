import { NativeSelect, Typography } from '@equinor/eds-core-react';
import PropTypes from 'prop-types';
import React from 'react';

export const PipelineFormBuild = ({ onChange, branch, branches }) => {
  const handleChange = (ev) =>
    onChange({ branch: ev.target.value }, ev.target.value !== '');

  return (
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
  );
};

PipelineFormBuild.propTypes = {
  onChange: PropTypes.func.isRequired,
  branches: PropTypes.object.isRequired,
};

export default PipelineFormBuild;
