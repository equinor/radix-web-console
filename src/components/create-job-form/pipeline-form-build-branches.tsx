import { NativeSelect, TextField, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { ChangeEvent, useCallback } from 'react';

import { PipelineFormChangeEventHandler } from './pipeline-form-types';
import { PipelineParametersBuild } from '../../api/jobs';

export interface PipelineFormBuildBranchesProps {
  onChange: PipelineFormChangeEventHandler<Partial<PipelineParametersBuild>>;
  selectedBranch?: string;
  branchFullName?: string;
  branches: Record<string, Array<string>>;
}

export const PipelineFormBuildBranches = ({
  onChange,
  selectedBranch,
  branchFullName,
  branches,
}: PipelineFormBuildBranchesProps): JSX.Element => {
  const handleOnTextChange = useCallback<
    (ev: ChangeEvent<HTMLInputElement>) => void
  >(
    ({ target: { value } }) => {
      return onChange({
        value: {
          branch: value,
          branchFullName: value,
          selectedBranch: selectedBranch,
        },
        isValid: value !== '',
      });
    },
    [onChange, selectedBranch]
  );
  const handleChange = useCallback<
    (ev: ChangeEvent<HTMLSelectElement>) => void
  >(
    ({ target: { value } }) => {
      return onChange({
        value: {
          branch: value,
          selectedBranch: value,
          branchFullName: value,
        },
        isValid: value !== '',
      });
    },
    [onChange]
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
          {Object.keys(branches).map((branch, i) => (
            <option key={i} value={branch}>
              {branch}
            </option>
          ))}
        </NativeSelect>
        {selectedBranch?.includes('*') && (
          <fieldset>
            <TextField
              id="branch_full_name_field"
              label="Branch full name"
              helperText={`Pattern: ${selectedBranch}`}
              name="branchFullName"
              defaultValue={branchFullName}
              onChange={handleOnTextChange}
            />
          </fieldset>
        )}
      </div>
    </>
  );
};

PipelineFormBuildBranches.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedBranch: PropTypes.string,
  branchFullName: PropTypes.string,
  branches: PropTypes.object.isRequired,
} as PropTypes.ValidationMap<PipelineFormBuildBranchesProps>;