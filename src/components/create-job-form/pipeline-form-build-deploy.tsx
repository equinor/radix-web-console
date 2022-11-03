import { NativeSelect, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { ChangeEvent, Fragment, useCallback } from 'react';

import { PipelineFormChangeEventHandler } from './pipeline-form-types';

import { PipelineParametersBuild } from '../../api/jobs';

export interface PipelineFormBuildDeployProps {
  onChange: PipelineFormChangeEventHandler<Partial<PipelineParametersBuild>>;
  branch?: string;
  branches: Record<string, Array<string>>;
}

const TargetEnvs = ({
  branch,
  branches,
}: {
  branch: string;
  branches: Record<string, Array<string>>;
}): JSX.Element => {
  const targetEnvs = branches[branch];
  const penultimateId = (targetEnvs?.length ?? 0) - 2;
  return targetEnvs?.length > 0 ? (
    <Typography>
      Branch <code>{branch}</code> will be deployed to{' '}
      {targetEnvs.length === 1 ? (
        <>
          <code>{targetEnvs[0]}</code> environment
        </>
      ) : (
        <>
          {targetEnvs.map((env, i) => (
            <Fragment key={i}>
              <code>{env}</code>
              {i < penultimateId ? ', ' : ''}
              {i === penultimateId ? ' and ' : ''}
            </Fragment>
          ))}
          environments
        </>
      )}
    </Typography>
  ) : !!branch ? (
    <Typography>
      radixconfig.yaml file will be read and deployed from branch{' '}
      <code>{branch}</code> to any environment <code>{branch}</code> is mapped
      to
    </Typography>
  ) : null;
};

export const PipelineFormBuildDeploy = ({
  onChange,
  branch,
  branches,
}: PipelineFormBuildDeployProps): JSX.Element => {
  const handleChange = useCallback<
    (ev: ChangeEvent<HTMLSelectElement>) => void
  >(
    ({ target: { value } }) =>
      onChange({ value: { branch: value }, isValid: value !== '' }),
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
        <NativeSelect
          id="BranchSelect"
          label=""
          value={branch}
          onChange={handleChange}
        >
          <option value="">— Please select —</option>
          {Object.keys(branches).map((branch) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </NativeSelect>
      </div>
      {branch && <TargetEnvs branch={branch} branches={branches} />}
    </>
  );
};

PipelineFormBuildDeploy.propTypes = {
  onChange: PropTypes.func.isRequired,
  branch: PropTypes.string,
  branches: PropTypes.object.isRequired,
} as PropTypes.ValidationMap<PipelineFormBuildDeployProps>;
