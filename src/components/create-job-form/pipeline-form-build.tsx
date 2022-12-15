import { NativeSelect, TextField, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { ChangeEvent, useCallback } from 'react';

import { PipelineFormChangeEventHandler } from './pipeline-form-types';
import { PipelineParametersBuild } from '../../api/jobs';

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
  const handleOnTextChange = useCallback<
    (ev: ChangeEvent<HTMLInputElement>) => void
  >(
    ({ target: { value } }) => {
      return props.onChange({
        value: {
          branch: value,
          branchFullName: value,
          selectedBranch: props.selectedBranch,
        },
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
        value: {
          branch: value,
          selectedBranch: value,
          branchFullName: props.branchFullName,
        },
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
        value={props.selectedBranch}
        onChange={handleChange}
      >
        <option value="">— Please select —</option>
        {Object.keys(props.branches).map((branch, i) => (
          <option key={i} value={branch}>
            {branch}
          </option>
        ))}
      </NativeSelect>
      {props.selectedBranch?.includes('*') && (
        <fieldset>
          <TextField
            id="custom_branch_field"
            label="Full branch name"
            helperText={`Pattern: ${props.selectedBranch}`}
            name="branchFullName"
            defaultValue={props.selectedBranch}
            value={props.branchFullName}
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
