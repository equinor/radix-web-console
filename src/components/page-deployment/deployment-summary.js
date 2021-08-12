import React from 'react';
import { routeWithParams, smallJobName } from '../../utils/string';
import routes from '../../routes';
import RelativeToNow from '../time/relative-to-now';
import deploymentModel from '../../models/deployment';
import PropTypes from 'prop-types';
import { Typography } from '@equinor/eds-core-react';
import { NavLink } from 'react-router-dom';

const DeploymentSummary = ({ appName, deployment }) => {
  return (
    <div className="grid--component-overview">
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
              <React.Fragment>
                This deployment was deployed to environment{' '}
              </React.Fragment>
            )}
            <NavLink
              to={routeWithParams(routes.appEnvironment, {
                appName,
                envName: deployment.environment,
              })}
            >
              <Typography link as="span">
                {deployment.environment}
              </Typography>
            </NavLink>
          </Typography>
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
        <div>
          {deployment.createdByJob && (
            <Typography variant="body_short">
              Created by pipeline job{' '}
              <NavLink
                to={routeWithParams(routes.appJob, {
                  appName,
                  jobName: deployment.createdByJob,
                })}
              >
                <Typography link as="span">
                  {smallJobName(deployment.createdByJob)}
                </Typography>
              </NavLink>
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

DeploymentSummary.propTypes = {
  appName: PropTypes.string.isRequired,
  deployment: PropTypes.exact(deploymentModel),
};

export default DeploymentSummary;
