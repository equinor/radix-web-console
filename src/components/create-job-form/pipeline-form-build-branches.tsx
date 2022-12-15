import { NativeSelect, TextField, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { ChangeEvent, useCallback } from 'react';

import { PipelineFormChangeEventHandler } from './pipeline-form-types';
import { PipelineParametersBuild } from '../../api/jobs';
import { PipelineFormBuildDeployProps } from './pipeline-form-build-deploy';
import { PipelineFormBuildProps } from './pipeline-form-build';

export interface PipelineFormBuildBrunchesProps {
  onChange: PipelineFormChangeEventHandler<Partial<PipelineParametersBuild>>;
  branch?: string;
  selectedBranch?: string;
  branchFullName?: string;
  branches: Record<string, Array<string>>;
}

export const PipelineFormBuildBrunches = (
  props: PipelineFormBuildProps | PipelineFormBuildDeployProps
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
    [props]
  );
  const handleChange = useCallback<
    (ev: ChangeEvent<HTMLSelectElement>) => void
  >(
    ({ target: { value } }) => {
      return props.onChange({
        value: {
          branch: value,
          selectedBranch: value,
          branchFullName: value,
        },
        isValid: value !== '',
      });
    },
    [props]
  );

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
        <NativeSelect id="BranchSelect" label="" onChange={handleChange}>
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
              defaultValue={props.branchFullName}
              onChange={handleOnTextChange}
            />
          </fieldset>
        )}
      </div>
    </>
  );
};

PipelineFormBuildBrunches.propTypes = {
  onChange: PropTypes.func.isRequired,
  branch: PropTypes.string,
  selectedBranch: PropTypes.string,
  branchFullName: PropTypes.string,
  branches: PropTypes.object.isRequired,
} as PropTypes.ValidationMap<PipelineFormBuildBrunchesProps>;
