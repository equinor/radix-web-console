import { NativeSelect, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { ChangeEvent, useCallback } from 'react';

import { PipelineFormChangeEventHandler } from './pipeline-form-types';

import { RelativeToNow } from '../time/relative-to-now';
import { PipelineParametersPromote } from '../../api/jobs';
import {
  DeploymentSummaryModel,
  DeploymentSummaryModelValidationMap,
} from '../../models/deployment-summary';
import {
  EnvironmentSummaryModel,
  EnvironmentSummaryModelValidationMap,
} from '../../models/environment-summary';
import { formatDateTime } from '../../utils/datetime';
import { smallDeploymentName } from '../../utils/string';

export interface PipelineFormPromoteProps {
  onChange: PipelineFormChangeEventHandler<Partial<PipelineParametersPromote>>;
  deploymentName?: string;
  toEnvironment?: string;
  deployments?: Array<DeploymentSummaryModel>;
  environments: Array<EnvironmentSummaryModel>;
}

export const PipelineFormPromote = ({
  onChange,
  deploymentName,
  toEnvironment,
  deployments,
  environments,
}: PipelineFormPromoteProps): JSX.Element => {
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
        const selectedDeployment = deployments.find((x) => x.name === value);
        newState.fromEnvironment = selectedDeployment?.environment;

        // Account for having selected an environment first; if it is the target
        // of the newly-selected deployment then we invalidate the form
        const selectedEnv = environments.find((x) => x.name === toEnvironment);
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
    deploymentName && deployments.find((x) => x.name === deploymentName);

  // Show deployments grouped by environment
  const groupedDeployments = deployments.reduce<
    Record<string, Array<DeploymentSummaryModel>>
  >(
    (obj, x) => ({
      ...obj,
      [x.environment]: [...(obj[x.environment] ?? []), x],
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
          {Object.keys(groupedDeployments).map((group, i) => (
            <optgroup label={group} key={i}>
              {groupedDeployments[group].map((x, i) => (
                <option key={i} value={x.name}>
                  {smallDeploymentName(x.name)}{' '}
                  {x.activeTo
                    ? `(${formatDateTime(x.activeFrom)})`
                    : `(currently active)`}
                  {x.gitCommitHash && ` ${x.gitCommitHash.substring(0, 7)}`}
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
            <>
              Active {selectedDeployment.activeTo ? 'from' : 'since'}{' '}
              <RelativeToNow time={selectedDeployment.activeFrom} />{' '}
              {selectedDeployment.activeTo && (
                <>
                  to <RelativeToNow time={selectedDeployment.activeTo} />{' '}
                </>
              )}
              on environment {selectedDeployment.environment}
            </>
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
          {environments.map((x, i) => (
            <option
              key={i}
              value={x.name}
              disabled={
                x.activeDeployment && x.activeDeployment.name === deploymentName
              }
            >
              {x.name}
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
    PropTypes.exact(DeploymentSummaryModelValidationMap)
  ),
  environments: PropTypes.arrayOf(
    PropTypes.exact(EnvironmentSummaryModelValidationMap)
  ).isRequired,
} as PropTypes.ValidationMap<PipelineFormPromoteProps>;
