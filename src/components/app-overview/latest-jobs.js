import { JobSummary } from 'radix-web-console-models';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import { routeWithParams } from '../../utils/string';
import routes from '../../routes';

export const LatestJobs = ({ appName, jobs }) => (
  <ul>
    {jobs.slice(0, 5).map(job => (
      <li key={job.name}>
        <Link
          to={routeWithParams(routes.appJob, {
            appName,
            jobName: job.name,
          })}
        >
          {job.name}
        </Link>
      </li>
    ))}
  </ul>
);

LatestJobs.propTypes = {
  appName: PropTypes.string.isRequired,
  jobs: PropTypes.arrayOf(PropTypes.shape(JobSummary)).isRequired,
};

export default LatestJobs;
