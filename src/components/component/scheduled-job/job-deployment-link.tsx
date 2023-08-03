import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { routes } from '../../../routes';
import { getAppDeploymentUrl } from '../../../utils/routing';
import { routeWithParams } from '../../../utils/string';

export interface ScheduledJobListProps {
  appName: string;
  jobComponentName: string;
  deploymentName: string;
}

export const JobDeploymentLink = ({
  appName,
  jobComponentName,
  deploymentName,
}: ScheduledJobListProps): React.JSX.Element => (
  <Typography>
    Job{' '}
    <Link
      to={routeWithParams(routes.appJobComponent, {
        appName: appName,
        deploymentName: deploymentName,
        jobComponentName: jobComponentName,
      })}
    >
      <Typography link as="span">
        {jobComponentName}
      </Typography>
    </Link>{' '}
    in deployment{' '}
    <Link to={getAppDeploymentUrl(appName, deploymentName)}>
      <Typography link as="span">
        {deploymentName}
      </Typography>
    </Link>
  </Typography>
);

JobDeploymentLink.propTypes = {
  appName: PropTypes.string.isRequired,
  jobComponentName: PropTypes.string.isRequired,
  deploymentName: PropTypes.string.isRequired,
} as PropTypes.ValidationMap<ScheduledJobListProps>;
