import { NativeSelect, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { ChangeEvent, useCallback } from 'react';

import { PipelineFormChangeEventHandler } from './pipeline-form-types';

import { RelativeToNow } from '../time/relative-to-now';
import { PipelineParametersPromote } from '../../api/jobs';
import {
  DeploymentSummaryModel,
  DeploymentSummaryModelValidationMap,
} from '../../models/radix-api/deployments/deployment-summary';
import {
  EnvironmentSummaryModel,
  EnvironmentSummaryModelValidationMap,
} from '../../models/radix-api/environments/environment-summary';
import { formatDateTime } from '../../utils/datetime';
import { smallDeploymentName, smallGithubCommitHash } from '../../utils/string';

export interface PipelineFormPromoteProps {
  onChange: PipelineFormChangeEventHandler<Partial<PipelineParametersPromote>>;
  deploymentName?: string;
  toEnvironment?: string;
  deployments?: Array<DeploymentSummaryModel>;
  environments?: Array<EnvironmentSummaryModel>;
}

export const PipelineFormPromote: {
  (props: PipelineFormPromoteProps): React.JSX.Element;
  propTypes: PropTypes.ValidationMap<PipelineFormPromoteProps>;
} = ({
  onChange,
  deploymentName,
  toEnvironment,
  deployments,
  environments,
}) => {
  const handleChange = useCallback<
    (ev: ChangeEvent<HTMLSelectElement>) => void
  >(
    ({ target: { value, name } }) => {
      const newState: Partial<PipelineParametersPromote> = { [name]: value };

      let isValid = false;
      if (name === 'toEnvironment') {
        isValid = !!(deploymentName && value);
      } else {
        // When selecting a deployment to promote we need to add its environment
        // to the state that is sent to the API (the "fromEnvironment" argument)
        const selectedDeployment = deployments?.find((x) => x.name === value);
        newState.fromEnvironment = selectedDeployment?.environment;

        // Account for having selected an environment first; if it is the target
        // of the newly-selected deployment then we invalidate the form
        const selectedEnv = environments?.find((x) => x.name === toEnvironment);
        isValid = !!(
          value &&
          selectedEnv?.activeDeployment?.name &&
          selectedEnv.activeDeployment.name !== value &&
          newState.fromEnvironment &&
          toEnvironment
        );
      }

      onChange({ value: newState, isValid: isValid });
    },
    [onChange, deploymentName, deployments, environments, toEnvironment]
  );

  const selectedDeployment =
    deploymentName && deployments?.find((x) => x.name === deploymentName);

  // Show deployments grouped by environment
  const groupedDeployments = (deployments || []).reduce<
    Record<string, Array<DeploymentSummaryModel>>
  >(
    (obj, x) => ({
      ...obj,
      [x.environment]: [...(obj[x.environment] || []), x],
    }),
    {}
  );

  return (
    <>
      <div className="grid grid--gap-small input">
        <Typography
          group="input"
          variant="text"
          token={{ color: 'currentColor' }}
        >
          Deployment to promote
        </Typography>
        <NativeSelect
          id="DeploymentNameSelect"
          label=""
          onChange={handleChange}
          name="deploymentName"
          value={deploymentName}
        >
          <option value="">— Please select —</option>
          {Object.keys(groupedDeployments).map((key, i) => (
            <optgroup key={i} label={key}>
              {groupedDeployments[key].map((x, j) => (
                <option key={j} value={x.name}>
                  {smallDeploymentName(x.name)}{' '}
                  {x.activeTo
                    ? `(${formatDateTime(x.activeFrom)})`
                    : `(currently active)`}
                  {x.gitCommitHash &&
                    ` ${smallGithubCommitHash(x.gitCommitHash)}`}
                  {x.gitTags && `, ${x.gitTags}`}
                </option>
              ))}
            </optgroup>
          ))}
        </NativeSelect>

        {selectedDeployment && (
          <Typography
            className="input input-label"
            as="span"
            group="navigation"
            variant="label"
            token={{ color: 'currentColor' }}
          >
            Active {selectedDeployment.activeTo ? 'from' : 'since'}{' '}
            <RelativeToNow time={selectedDeployment.activeFrom} />{' '}
            {selectedDeployment.activeTo && (
              <>
                to <RelativeToNow time={selectedDeployment.activeTo} />{' '}
              </>
            )}
            on environment {selectedDeployment.environment}
          </Typography>
        )}
      </div>

      <div className="grid grid--gap-small input">
        <Typography
          group="input"
          variant="text"
          token={{ color: 'currentColor' }}
        >
          Target environment
        </Typography>
        <NativeSelect
          id="ToEnvironmentSelect"
          label=""
          name="toEnvironment"
          onChange={handleChange}
          value={toEnvironment}
        >
          <option value="">— Please select —</option>
          {environments?.map(({ name, activeDeployment }, i) => (
            <option
              key={i}
              value={name}
              disabled={
                activeDeployment && activeDeployment.name === deploymentName
              }
            >
              {name}
            </option>
          ))}
        </NativeSelect>
      </div>
    </>
  );
};

PipelineFormPromote.propTypes = {
  onChange: PropTypes.func.isRequired,
  deploymentName: PropTypes.string,
  toEnvironment: PropTypes.string,
  deployments: PropTypes.arrayOf(
    PropTypes.shape(
      DeploymentSummaryModelValidationMap
    ) as PropTypes.Validator<DeploymentSummaryModel>
  ),
  environments: PropTypes.arrayOf(
    PropTypes.shape(
      EnvironmentSummaryModelValidationMap
    ) as PropTypes.Validator<EnvironmentSummaryModel>
  ),
};
