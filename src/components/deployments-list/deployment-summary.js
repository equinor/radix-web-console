import { faClock, faGlobeAfrica } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DeploymentSummary as DeploymentSummaryModel } from 'radix-web-console-models';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import Chip from '../chip';
import Clickbox from '../clickbox';
import RelativeToNow from '../time/relative-to-now';

import {
  routeWithParams,
  smallDeploymentName,
  themedColor,
} from '../../utils/string';
import routes from '../../routes';

const EnvData = ({ appName, envName }) => {
  if (!envName) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="deployment-summary__icon">
        <FontAwesomeIcon
          color={themedColor(envName)}
          icon={faGlobeAfrica}
          size="lg"
        />
      </div>
      <Link to={routeWithParams(routes.appEnvironment, { appName, envName })}>
        {envName}
      </Link>
    </React.Fragment>
  );
};

const DeploymentSummary = ({ appName, deployment, inEnv = false }) => {
  const deploymentLink = routeWithParams(routes.appDeployment, {
    appName,
    deploymentName: deployment.name,
  });

  return (
    <Clickbox to={deploymentLink}>
      <div className="deployment-summary">
        <ul className="deployment-summary__data">
          <li className="deployment-summary__data-section">
            <div className="deployment-summary__icon">
              <FontAwesomeIcon icon={faClock} size="lg" />
            </div>
            <div className="deployment-summary__data-list">
              <RelativeToNow time={deployment.activeFrom} titlePrefix="Start" />
            </div>
          </li>
          {!inEnv && (
            <React.Fragment>
              <li className="deployment-summary__data-section">
                <EnvData appName={appName} envName={deployment.environment} />
              </li>
              <li className="deployment-summary__data-section">
                {deployment.activeTo && (
                  <Chip title={`Stopped ${deployment.activeTo}`}>Inactive</Chip>
                )}
                {!deployment.activeTo && <Chip type="info">Active</Chip>}
              </li>
            </React.Fragment>
          )}
          <li className="deployment-summary__data-section">
            <div className="deployment-summary__data-list">
              <Link className="deployment-summary__link" to={deploymentLink}>
                {smallDeploymentName(deployment.name)}
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </Clickbox>
  );
};

DeploymentSummary.propTypes = {
  appName: PropTypes.string.isRequired,
  deployment: PropTypes.shape(DeploymentSummaryModel).isRequired,
};

export default DeploymentSummary;
