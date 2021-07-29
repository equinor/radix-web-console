import React from 'react';
import { Link } from 'react-router-dom';
import { routeWithParams, smallJobName } from '../../utils/string';
import routes from '../../routes';
import RelativeToNow from '../time/relative-to-now';
import deploymentModel from '../../models/deployment';
import PropTypes from 'prop-types';
import { Typography } from '@equinor/eds-core-react';

const DeploymentSummary = ({ appName, deployment }) => {
  return (
    <section>
      <div className="component__overview">
        <Typography variant="h4">Overview</Typography>
        <div>
          <div>
            <Typography variant="body_short">
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
            </Typography>
            <div>
              <Typography variant="body_short">
                Active from{' '}
                <strong>
                  <RelativeToNow time={deployment.activeFrom} />
                </strong>
              </Typography>
              {deployment.activeTo && (
                <Typography variant="body_short">
                  Active until{' '}
                  <strong>
                    <RelativeToNow time={deployment.activeTo} />
                  </strong>
                </Typography>
              )}
            </div>
          </div>
          <div>
            {deployment.createdByJob && (
              <Typography variant="body_short">
                Created by pipeline job{' '}
                <Link
                  to={routeWithParams(routes.appJob, {
                    appName,
                    jobName: deployment.createdByJob,
                  })}
                >
                  {smallJobName(deployment.createdByJob)}
                </Link>
              </Typography>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

DeploymentSummary.propTypes = {
  appName: PropTypes.string.isRequired,
  deployment: PropTypes.exact(deploymentModel),
};

export default DeploymentSummary;
