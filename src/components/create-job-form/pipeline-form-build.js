import { NativeSelect } from '@equinor/eds-core-react';
import PropTypes from 'prop-types';
import React from 'react';

import FormField from '../form-field';

export const PipelineFormBuild = ({ onChange, branch, branches }) => {
  const handleChange = (ev) =>
    onChange({ branch: ev.target.value }, ev.target.value !== '');

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
    </FormField>
  );
};

PipelineFormBuild.propTypes = {
  onChange: PropTypes.func.isRequired,
  branches: PropTypes.object.isRequired,
};

export default PipelineFormBuild;
