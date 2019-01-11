import {
  faClock,
  faCog,
  faHashtag,
  faQuestionCircle,
  faTruck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JobSummary } from 'radix-web-console-models';
import { Link } from 'react-router-dom';
import distanceInWords from 'date-fns/distance_in_words';
import PropTypes from 'prop-types';
import React from 'react';

import Clickbox from '../clickbox';
import CommitHash from '../commit-hash';
import EmptyState from '../empty-state';

import { routeWithParams, formatDateTime } from '../../utils/string';
import routes from '../../routes';

import './latest-jobs.css';

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

const noJobsIcon = (
  <span className="latest-jobs__no-jobs-icon fa-layers fa-fw fa-5x">
    <FontAwesomeIcon icon={faCog} />
    <FontAwesomeIcon
      icon={faQuestionCircle}
      transform="shrink-10 down-5 right-5"
    />
  </span>
);

export const LatestJobs = ({ appName, jobs }) => (
  <div className="latest-jobs">
    {jobs.length === 0 && (
      <EmptyState title="No jobs yet" icon={noJobsIcon}>
        Push to GitHub to trigger a job
      </EmptyState>
    )}
    {jobs.length > 0 && (
      <React.Fragment>
        <h2 className="o-heading-section">Environments</h2>

        <ul className="o-item-list">
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
                        <div title="Start time">
                          {formatDateTime(job.started)}
                        </div>
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
      </React.Fragment>
    )}
  </div>
);

LatestJobs.propTypes = {
  appName: PropTypes.string.isRequired,
  jobs: PropTypes.arrayOf(PropTypes.shape(JobSummary)).isRequired,
};

export default LatestJobs;
