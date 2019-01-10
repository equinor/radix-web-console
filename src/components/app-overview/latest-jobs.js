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

const Duration = ({ job }) => {
  if (!job.ended) {
    return null;
  }

  return (
    <span title="Job duration">
      {distanceInWords(new Date(job.started), new Date(job.ended))}
    </span>
  );
};

export const LatestJobs = ({ appName, jobs }) => (
  <ul className="item-list">
    {jobs.slice(0, 5).map(job => (
      <li key={job.name}>
        <Clickbox>
          <div
            className={`job-summary job-summary--${job.status.toLowerCase()}`}
          >
            <ul className="job-summary__data">
              <li className="job-summary__data-section">
                <div className="job-summary__icon">
                  <FontAwesomeIcon icon={faHashtag} size="lg" />
                </div>
                <div className="job-summary__data-list">
                  <strong>User Name</strong>
                  <CommitHash commit={job.commitID} />
                </div>
              </li>
              <li className="job-summary__data-section">
                <div className="job-summary__icon">
                  <FontAwesomeIcon icon={faClock} size="lg" />
                </div>
                <div className="job-summary__data-list">
                  <div title="Start time">{formatDateTime(job.started)}</div>
                  <Duration job={job} />
                </div>
              </li>
              <li className="job-summary__data-section">
                {job.environments &&
                  job.environments.length && (
                    <>
                      <div className="job-summary__icon">
                        <FontAwesomeIcon icon={faTruck} size="lg" />
                      </div>
                      <div>{job.environments.join(', ')}</div>
                    </>
                  )}
              </li>
              <li className="job-summary__data-section">
                <span className="job-summary__status">{job.status}</span>
              </li>
              <li className="job-summary__data-section">
                <div className="job-summary__data-list">
                  <Link
                    className="job-summary__link"
                    to={routeWithParams(routes.appJob, {
                      appName,
                      jobName: job.name,
                    })}
                  >
                    {job.name.slice(-5)}
                  </Link>
                  <div>{job.pipeline}</div>
                </div>
              </li>
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
