import { NativeSelect, TextField, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { ChangeEvent, useCallback } from 'react';

import { PipelineFormChangeEventHandler } from './pipeline-form-types';

import { PipelineParametersBuild } from '../../api/jobs';

export interface PipelineFormBuildProps {
  onChange: PipelineFormChangeEventHandler<Partial<PipelineParametersBuild>>;
  branch?: string;
  branchFullName?: string;
  branches: Record<string, Array<string>>;
}

export const PipelineFormBuild = (
  props: PipelineFormBuildProps
): JSX.Element => {
  const handleOnTextChange = useCallback<
    (ev: ChangeEvent<HTMLInputElement>) => void
  >(
    ({ target: { value } }) => {
      // props.branch = value;
      return props.onChange({
        value: { branch: value, branchFullName: props.branchFullName },
        isValid: value !== '',
      });
    },
    [props, props.onChange]
  );

  const handleChange = useCallback<
    (ev: ChangeEvent<HTMLSelectElement>) => void
  >(
    ({ target: { value } }) => {
      return props.onChange({
        value: { branch: props.branch, branchFullName: value },
        isValid: props.branch !== '',
      });
    },
    [props, props.onChange]
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
        value={props.branch}
        onChange={handleChange}
      >
        <option value="">— Please select —</option>
        {Object.keys(props.branches).map((branch, i) => (
          <option key={i} value={branch}>
            {branch}
          </option>
        ))}
      </NativeSelect>
      {props.branch && props.branch.includes('*') && (
        <fieldset>
          <TextField
            id="custom_branch_field"
            label="Full branch name"
            helperText={props.branch}
            name="branchFullName"
            defaultValue={props.branchFullName}
            onChange={handleOnTextChange}
          />
        </fieldset>
      )}
    </div>
  );
};

PipelineFormBuild.propTypes = {
  onChange: PropTypes.func.isRequired,
  branch: PropTypes.string,
  branchFullName: PropTypes.string,
  branches: PropTypes.object.isRequired,
} as PropTypes.ValidationMap<PipelineFormBuildProps>;
