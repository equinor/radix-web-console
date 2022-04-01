import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { RelativeToNow } from '../time/relative-to-now';
import { DeploymentModelValidationMap } from '../../models/deployment';
import { routes } from '../../routes';
import { routeWithParams, smallJobName } from '../../utils/string';

export const DeploymentSummary = ({ appName, deployment }) => {
  return (
    <div className="grid grid--gap-medium">
      <Typography variant="h4">Overview</Typography>
      <div className="grid grid--gap-medium grid--overview-columns">
        <div className="grid grid--gap-medium">
          <Typography>
            {deployment.activeTo ? (
              <>This deployment was deployed to environment </>
            ) : (
              <>
                <strong>Currently deployed</strong> on environment{' '}
              </>
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
          <Typography>
            Active from{' '}
            <strong>
              <RelativeToNow time={deployment.activeFrom} />
            </strong>
          </Typography>
          {deployment.activeTo && (
            <Typography>
              Active until{' '}
              <strong>
                <RelativeToNow time={deployment.activeTo} />
              </strong>
            </Typography>
          )}
        </div>
        <div className="grid grid--gap-medium">
          {deployment.createdByJob && (
            <Typography>
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
  deployment: PropTypes.shape(DeploymentModelValidationMap),
};

export default DeploymentSummary;
