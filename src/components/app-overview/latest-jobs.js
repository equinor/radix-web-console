import { faHashtag, faClock, faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JobSummary } from 'radix-web-console-models';
import { Link } from 'react-router-dom';
import distanceInWords from 'date-fns/distance_in_words';
import PropTypes from 'prop-types';
import React from 'react';

import Clickbox from '../clickbox';
import CommitHash from '../commit-hash';

import { routeWithParams, formatDateTime } from '../../utils/string';
import routes from '../../routes';

export const LatestJobs = ({ appName, jobs }) => (
  <ul className="item-list">
    {jobs.slice(0, 5).map(job => (
      <li key={job.name}>
        <Clickbox>
          <div
            className={`job-summary job-summary--${job.status.toLowerCase()}`}
          >
            <h2>
              <Link
                to={routeWithParams(routes.appJob, {
                  appName,
                  jobName: job.name,
                })}
              >
                {job.name}
              </Link>
            </h2>
            <ul className="job-summary__data">
              <li>
                <FontAwesomeIcon icon={faHashtag} />
                Commit <CommitHash commit={job.commitID} />
              </li>
              <li>
                <FontAwesomeIcon icon={faClock} />
                {formatDateTime(job.started)}
                {job.ended && (
                  <>
                    {' '}
                    ({distanceInWords(new Date(job.started), new Date(job.ended))})
                  </>
                )}
              </li>
              <li>
                <FontAwesomeIcon icon={faTruck} />
                Deploy to
                {(job.environments && job.environments.join(', ')) || '—'}
              </li>
              <li>{job.status}</li>
              <li>{job.pipeline}</li>
            </ul>
          </div>
        </Clickbox>
      </li>
    ))}
  </ul>
);

LatestJobs.propTypes = {
  appName: PropTypes.string.isRequired,
  jobs: PropTypes.arrayOf(PropTypes.shape(JobSummary)).isRequired,
};

export default LatestJobs;
