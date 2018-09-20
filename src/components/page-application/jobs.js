import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import React from 'react';

import Chip from '../chip';

import { getAppJobs } from '../../state/applications';
import jobStatuses from '../../state/applications/job-statuses';

import { routeWithParams } from '../../utils/string';
import routes from '../../routes';

const getJobStatus = job => {
  const status = job.status;

  if (!status.completionTime) {
    return jobStatuses.BUILDING;
  } else if (status.failed) {
    return jobStatuses.FAILURE;
  } else if (status.succeeded) {
    return jobStatuses.SUCCESS;
  }

  return jobStatuses.IDLE;
};

const getJobDate = job =>
  distanceInWordsToNow(new Date(job.metadata.creationTimestamp));

const getJobLabel = job => `${getJobDate(job)} - ${getJobStatus(job)}`;

const Jobs = ({ appName, jobs }) => {
  if (!jobs) {
    return 'Loading jobs…';
  }
  if (jobs && jobs.length === 0) {
    return 'No jobs yet 😕';
  }

  return (
    <ul className="o-inline-list o-inline-list--spacing">
      {jobs.map(job => (
        <li key={job.metadata.name}>
          <Chip>
            <Link
              to={routeWithParams(routes.appJob, {
                appName,
                jobName: job.metadata.name,
              })}
            >
              {getJobLabel(job)}
            </Link>
          </Chip>
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = (state, ownProps) => ({
  jobs: getAppJobs(state, ownProps.appName).slice(0, 5),
});

export default connect(mapStateToProps)(Jobs);
