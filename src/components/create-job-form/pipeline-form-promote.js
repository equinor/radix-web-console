import { NativeSelect, Typography } from '@equinor/eds-core-react';
import PropTypes from 'prop-types';
import React from 'react';

import RelativeToNow from '../time/relative-to-now';
import DeploymentSummaryModel from '../../models/deployment-summary';
import EnvironmentSummaryModel from '../../models/environment-summary';
import { formatDateTime } from '../../utils/datetime';
import { smallDeploymentName } from '../../utils/string';

export const PipelineFormPromote = ({
  onChange,
  deploymentName,
  toEnvironment,
  deployments,
  environments,
}) => {
  const handleChange = (ev) => {
    const newValue = ev.target.value;
    const newState = { [ev.target.name]: newValue };
    let isValid;

    if (ev.target.name === 'toEnvironment') {
      isValid = deploymentName && newValue;
    } else {
      // Account for having selected an environment first; if it is the target
      // of the newly-selected deployment then we invalidate the form
      const selectedEnv = environments.find((e) => e.name === toEnvironment);
      isValid =
        selectedEnv &&
        selectedEnv.activeDeployment &&
        selectedEnv.activeDeployment.name === newValue
          ? false
          : toEnvironment && newValue;

      // When selecting a deployment to promote we need to add its environment
      // to the state that is sent to the API (the "fromEnvironment" argument)
      const selectedDeployment = deployments.find((d) => d.name === newValue);
      newState.fromEnvironment = selectedDeployment.environment;
    }

    onChange(newState, isValid);
  };

  const getDeploymentHelp = () => {
    if (!deploymentName) {
      return null;
    }

    const selectedDeployment = deployments.find(
      (d) => d.name === deploymentName
    );

    if (!selectedDeployment) {
      return null;
    }

    return (
      <React.Fragment>
        Active {selectedDeployment.activeTo ? 'from' : 'since'}{' '}
        <RelativeToNow time={selectedDeployment.activeFrom} />{' '}
        {selectedDeployment.activeTo && (
          <React.Fragment>
            to <RelativeToNow time={selectedDeployment.activeTo} />{' '}
          </React.Fragment>
        )}
        on environment {selectedDeployment.environment}
      </React.Fragment>
    );
  };

  // Show deployments grouped by environment
  const groupedDeployments = deployments.reduce((groups, dep) => {
    if (!groups[dep.environment]) {
      groups[dep.environment] = [];
    }
    groups[dep.environment].push(dep);
    return groups;
  }, []);

  return (
    <React.Fragment>
      <div className="grid grid--gap-small input">
        <Typography
          group="input"
          variant="text"
          token={{ color: 'currentColor' }}
        >
          Deployment to promote
        </Typography>
        <NativeSelect
          onChange={handleChange}
          name="deploymentName"
          value={deploymentName}
        >
          <option value="">— Please select —</option>
          {Object.keys(groupedDeployments).map((group) => (
            <optgroup label={group} key={group}>
              {groupedDeployments[group].map((dep) => (
                <option key={dep.name} value={dep.name}>
                  {smallDeploymentName(dep.name)}{' '}
                  {dep.activeTo
                    ? `(${formatDateTime(dep.activeFrom)})`
                    : `(currently active)`}
                </option>
              ))}
            </optgroup>
          ))}
        </NativeSelect>
        <Typography
          group="navigation"
          variant="label"
          as="span"
          token={{ color: 'currentColor' }}
          className="input input-label"
        >
          {getDeploymentHelp()}
        </Typography>
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
          name="toEnvironment"
          onChange={handleChange}
          value={toEnvironment}
        >
          <option value="">— Please select —</option>
          {environments.map((env) => (
            <option
              key={env.name}
              value={env.name}
              disabled={
                env.activeDeployment &&
                env.activeDeployment.name === deploymentName
              }
            >
              {env.name}
            </option>
          ))}
        </NativeSelect>
      </div>
    </React.Fragment>
  );
};

PipelineFormPromote.propTypes = {
  onChange: PropTypes.func.isRequired,
  deployment: PropTypes.string,
  environment: PropTypes.string,
  deployments: PropTypes.arrayOf(PropTypes.exact(DeploymentSummaryModel)),
  environments: PropTypes.arrayOf(PropTypes.exact(EnvironmentSummaryModel))
    .isRequired,
};

export default PipelineFormPromote;
