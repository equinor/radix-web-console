import { faTruck, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import DeploymentSummary from './deployment-summary';
import EmptyState from '../empty-state';

import deploymentSummaryModel from '../../models/deployment-summary';

import './style.css';

const noDeploymentsIcon = (
  <span className="deployments-list__no-deployments-icon fa-layers fa-fw fa-5x">
    <FontAwesomeIcon icon={faTruck} />
    <FontAwesomeIcon
      icon={faQuestionCircle}
      transform="shrink-10 down-5 right-7"
    />
  </span>
);

export const DeploymentsList = ({
  appName,
  deployments,
  limit,
  inEnv = false,
}) => (
  <div className="deployments-list">
    {deployments.length === 0 && (
      <EmptyState title="No deployments" icon={noDeploymentsIcon}>
        No deployments… yet
      </EmptyState>
    )}
    {deployments.length > 0 && (
      <ul className="o-item-list">
        {deployments.slice(0, limit || deployments.length).map((deployment) => (
          <li key={deployment.name}>
            <DeploymentSummary
              appName={appName}
              deployment={deployment}
              inEnv={inEnv}
            />
          </li>
        ))}
      </ul>
    )}
  </div>
);

DeploymentsList.propTypes = {
  appName: PropTypes.string.isRequired,
  deployments: PropTypes.arrayOf(PropTypes.shape(deploymentSummaryModel))
    .isRequired,
  limit: PropTypes.number,
  inEnv: PropTypes.bool,
};

export default DeploymentsList;
