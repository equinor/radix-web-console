import React from 'react';
import { Link } from 'react-router-dom';
import { routeWithParams, smallJobName } from '../../utils/string';
import routes from '../../routes';
import RelativeToNow from '../time/relative-to-now';
import deploymentModel from '../../models/deployment';
import PropTypes from 'prop-types';

const DeploymentSummary = ({ appName, deployment }) => {
  return (
    <section>
      <h2 className="o-heading-section">Summary</h2>
      <p>
        {!deployment.activeTo && (
          <React.Fragment>
            <strong>Currently deployed</strong> on environment{' '}
          </React.Fragment>
        )}
        {deployment.activeTo && (
          <React.Fragment>Was deployed to environment </React.Fragment>
        )}
        <Link
          to={routeWithParams(routes.appEnvironment, {
            appName,
            envName: deployment.environment,
          })}
        >
          {deployment.environment}
        </Link>
      </p>
      {deployment.createdByJob && (
        <p>
          Created by pipeline job{' '}
          <Link
            to={routeWithParams(routes.appJob, {
              appName,
              jobName: deployment.createdByJob,
            })}
          >
            {smallJobName(deployment.createdByJob)}
          </Link>
        </p>
      )}
      <p>
        Active from{' '}
        <strong>
          <RelativeToNow time={deployment.activeFrom} />
        </strong>
      </p>
      {deployment.activeTo && (
        <p>
          Active until{' '}
          <strong>
            <RelativeToNow time={deployment.activeTo} />
          </strong>
        </p>
      )}
    </section>
  );
};

DeploymentSummary.propTypes = {
  appName: PropTypes.string.isRequired,
  deployment: PropTypes.exact(deploymentModel),
};

export default DeploymentSummary;
