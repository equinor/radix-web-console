import { NativeSelect, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { ChangeEvent, useCallback } from 'react';

import { PipelineFormChangeEventHandler } from './pipeline-form-types';

import { PipelineParametersBuild } from '../../api/jobs';

export interface PipelineFormBuildProps {
  onChange: PipelineFormChangeEventHandler<Partial<PipelineParametersBuild>>;
  branch?: string;
  branches: Record<string, Array<string>>;
}

export const PipelineFormBuild = ({
  onChange,
  branch,
  branches,
}: PipelineFormBuildProps): JSX.Element => {
  const handleChange = useCallback<
    (ev: ChangeEvent<HTMLSelectElement>) => void
  >(
    ({ target: { value } }) =>
      onChange({ value: { branch: value }, isValid: value !== '' }),
    [onChange]
  );

  return (
    <div className="grid grid--gap-small input">
      <Typography
        group="input"
        variant="text"
        token={{ color: 'currentColor' }}
      >
        Git branch to build
      </Typography>
      <NativeSelect
        id="BranchSelect"
        label=""
        value={branch}
        onChange={handleChange}
      >
        <option value="">— Please select —</option>
        {Object.keys(branches).map((branch, i) => (
          <option key={i} value={branch}>
            {branch}
          </option>
        ))}
      </NativeSelect>
    </div>
  );
};

PipelineFormBuild.propTypes = {
  onChange: PropTypes.func.isRequired,
  branch: PropTypes.string,
  branches: PropTypes.object.isRequired,
} as PropTypes.ValidationMap<PipelineFormBuildProps>;
